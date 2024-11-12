# Setup

ZK Email Recovery enables account recovery through email guardians. The recovery process involves:

1. Guardian setup and acceptance
2. Recovery initiation by guardians
3. Timelock delay period
4. Recovery completion and ownership transfer

## Implementing the Universal Module

The Universal Email Recovery Module allows you to add an email-based recovery mechanism to your Safe 1.4 account. This guide walks you through the process of setting up the module, configuring recovery options, and handling the recovery process in case you need to regain access to your account.

<details>
<summary>Prerequisites</summary>

**Pimlico API Key**: Required for interacting with the Pimlico bundler. Get your API key [here](https://dashboard.pimlico.io/).

</details>

### Setting Up the Environment

First, install the necessary packages by running:

```bash
npm install permissionless viem wagmi axios circomlibjs
```

Import the required modules in your script:

```typescript
import { createSmartAccountClient } from "permissionless";
import { entryPoint07Address } from "viem/account-abstraction";
import { toSafeSmartAccount } from "permissionless/accounts";
import { erc7579Actions } from "permissionless/actions/erc7579";
import {
  createPublicClient,
  encodeAbiParameters,
  encodeFunctionData,
  http,
  keccak256,
  parseAbiParameters,
} from "viem";
import { baseSepolia } from "viem/chains";
import { readContract } from "wagmi/actions";
import axios from "axios";
import { buildPoseidon } from "circomlibjs";
```

### Configuring the Clients

Set up your API keys and URLs:

```typescript
const owner = "YOUR_OWNER_ADDRESS";
const apiKey = "YOUR_PIMLICO_API_KEY";
const rpcApiKey = "YOUR_ALCHEMY_RPC_API_KEY";
const bundlerUrl = `https://api.pimlico.io/v2/basesepolia/rpc?apikey=${apiKey}`;
const rpcUrl = `https://base-sepolia.g.alchemy.com/v2/${rpcApiKey}`;
```

Create the public client and the Pimlico client:

```typescript
const publicClient = createPublicClient({
  transport: http(rpcUrl),
});

const pimlicoClient = createSmartAccountClient({
  transport: http(bundlerUrl),
  entryPoint: {
    address: entryPoint07Address,
    version: "0.7",
  },
});
```

### Setting Up the Safe Account

Initialize your Safe account with the necessary parameters:

```typescript
const safeAccount = await toSafeSmartAccount({
  client: publicClient,
  owners: [owner],
  version: "1.4.1",
  entryPoint: {
    address: entryPoint07Address,
    version: "0.7",
  },
  safe4337ModuleAddress: "0x7579EE8307284F293B1927136486880611F20002",
  erc7579LaunchpadAddress: "0x7579011aB74c46090561ea277Ba79D510c6C00ff",
  attesters: ["0x000000333034E9f539ce08819E12c1b8Cb29084d"], // Rhinestone's attester address
  attestersThreshold: 1,
});

const safeWalletAddress = "YOUR_SAFE_WALLET_ADDRESS";
```

Extend the smart account client with ERC-7579 actions:

```typescript
const smartAccountClient = createSmartAccountClient({
  account: safeAccount,
  chain: baseSepolia,
  bundlerTransport: http(bundlerUrl),
  paymaster: pimlicoClient,
  userOperation: {
    estimateFeesPerGas: async () => {
      return (await pimlicoClient.getUserOperationGasPrice()).fast;
    },
  },
}).extend(erc7579Actions());
```

### Installing the Module and Configuring Recovery

Set up the Universal Email Recovery Module:

```typescript
const universalEmailRecoveryModuleAddress = "0x36A470159F8170ad262B9518095a9FeD0824e7dD";
const guardianEmail = "guardian@gmail.com";
```

Generate a random account code using Poseidon:

```typescript
function bytesToHex(bytes: Uint8Array): string {
  return [...bytes]
    .reverse()
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");
}

const poseidon = await buildPoseidon();
const accountCodeBytes: Uint8Array = poseidon.F.random();
const accountCode = bytesToHex(accountCodeBytes);
```

Fetch the guardian salt by sending a POST request:

```typescript
const { guardianSalt } = await axios.post(`${relayerApiUrl}/getAccountSalt`, {
  account_code: accountCode,
  email_addr: guardianEmail,
});
```

Compute the guardian address:

```typescript
const guardianAddr = await readContract({
  abi: universalEmailRecoveryModuleAbi,
  address: universalEmailRecoveryModuleAddress,
  functionName: "computeEmailAuthAddress",
  args: [safeWalletAddress, guardianSalt],
});
```

Prepare the module data for installation:

```typescript
const account: `0x${string}` = safeWalletAddress as `0x${string}`;
const isInstalledContext = new Uint8Array([0]);
const functionSelector = keccak256(
  new TextEncoder().encode("swapOwner(address,address,address)")
).slice(0, 10);
const guardians = [guardianAddr];
const guardianWeights = [1n];
const threshold = 1n;
const delay = 0n; // No delay
const expiry = 2n * 7n * 24n * 60n * 60n; // 2 weeks in seconds

const moduleData = encodeAbiParameters(
  parseAbiParameters(
    "address, bytes, bytes4, address[], uint256[], uint256, uint256, uint256"
  ),
  [
    account,
    `0x${toHexString(isInstalledContext)}`,
    functionSelector as `0x${string}`,
    guardians as `0x${string}`[],
    guardianWeights,
    threshold,
    delay,
    expiry,
  ]
);
```

Install the module:

```typescript
const userOpHash = await smartAccountClient.installModule({
  type: "executor",
  address: universalEmailRecoveryModuleAddress,
  context: moduleData,
});

const receipt = await pimlicoClient.waitForUserOperationReceipt({
  hash: userOpHash,
});
```

### Handling Acceptance

Fetch the acceptance command template:

```typescript
const subject = await readContract({
  abi: universalEmailRecoveryModuleAbi,
  address: universalEmailRecoveryModuleAddress,
  functionName: "acceptanceCommandTemplates",
  args: [],
});

const templateIdx = 1;
const handleAcceptanceCommand = subject[0]
  .join(" ")
  .replace("{ethAddr}", safeWalletAddress);
```

Send the acceptance request:

```typescript
const { data: handleAcceptanceData } = await axios.post(
  `${relayerApiUrl}/acceptanceRequest`,
  {
    controller_eth_addr: universalEmailRecoveryModuleAddress,
    guardian_email_addr: guardianEmail,
    account_code: accountCode,
    template_idx: templateIdx,
    command: handleAcceptanceCommand,
  }
);

const { request_id: requestId } = handleAcceptanceData;
```

### Handling Recovery

Fetch the recovery command template:

```typescript
const processRecoveryCommand = await readContract({
  abi: universalEmailRecoveryModuleAbi,
  address: universalEmailRecoveryModuleAddress,
  functionName: "recoveryCommandTemplates",
  args: [],
});
```

Send the recovery request:

```typescript
const { data: processRecoveryData } = await axios.post(
  `${relayerApiUrl}/recoveryRequest`,
  {
    controller_eth_addr: universalEmailRecoveryModuleAddress,
    guardian_email_addr: guardianEmail,
    template_idx: templateIdx,
    command: processRecoveryCommand,
  }
);

const { request_id: processRecoveryDataRequestId } = processRecoveryData;
```

### Completing the Recovery

Set up the parameters for owner swapping:

```typescript
const previousOwnerInLinkedList = "PREVIOUS_OWNER_IN_LINKED_LIST";
const oldOwner = "OLD_OWNER_ADDRESS";
const newOwner = "NEW_OWNER_ADDRESS";

const recoveryCallData = encodeFunctionData({
  abi: safeAbi,
  functionName: "swapOwner",
  args: [previousOwnerInLinkedList, oldOwner, newOwner],
});

const recoveryData = encodeAbiParameters(
  parseAbiParameters("address, bytes"),
  [safeWalletAddress, recoveryCallData]
);
```

Complete the recovery process:

```typescript
const { data } = await axios.post(`${relayerApiUrl}/completeRequest`, {
  controller_eth_addr: universalEmailRecoveryModuleAddress,
  account_eth_addr: safeWalletAddress,
  complete_calldata: recoveryData,
});
```

## 7579 Compatible Accounts

7579 compatible accounts introduce the modules. Modules allows you to add functionality to your account. To implement account recovery, you can do the following:

```solidity:contracts/Account.sol
// Install module with configuration
account.installModule({
    moduleTypeId: MODULE_TYPE_EXECUTOR,
    module: emailRecoveryModuleAddress,
    data: abi.encode(
        isInstalledContext,
        guardians,
        guardianWeights, 
        threshold,
        delay,
        expiry
    )
});
```