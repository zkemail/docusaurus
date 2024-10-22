# Interacting with the Relayer API

## Prepare the API Call Payload

Construct the payload for the `/api/submit` endpoint of the relayer. Replace placeholders with actual values.

**Example for the "Emit string \{string\}" command:**

```json
{
  "contractAddress": "0xYourEmitEmailCommandContractAddress",
  "dkimContractAddress": "0xDKIMRegistryAddress",
  "accountCode": "0xEmailAuthBytecode", // Bytecode of the EmailAuth implementation contract
  "codeExistsInEmail": true,
  "functionAbi": {
    "name": "emitEmailCommand",
    "type": "function",
    "inputs": [
      {
        "name": "emailAuthMsg",
        "type": "tuple",
        "components": [
          { "name": "templateId", "type": "uint256" },
          { "name": "commandParams", "type": "bytes[]" },
          { "name": "skippedCommandPrefix", "type": "uint256" },
          {
            "name": "proof",
            "type": "tuple",
            "components": [
              { "name": "domainName", "type": "string" },
              { "name": "publicKeyHash", "type": "bytes32" },
              { "name": "emailNullifier", "type": "bytes32" },
              { "name": "accountSalt", "type": "bytes32" },
              { "name": "isCodeExist", "type": "bool" },
              { "name": "timestamp", "type": "uint256" },
              { "name": "maskedCommand", "type": "string" },
              { "name": "proof", "type": "bytes" }
            ]
          }
        ]
      },
      { "name": "owner", "type": "address" },
      { "name": "templateIdx", "type": "uint256" }
    ]
  },
  "commandTemplate": "Emit string {string}",
  "commandParams": ["Hello, world!"],
  "templateId": "Computed_Template_ID", // Compute using computeTemplateId(0)
  "remainingArgs": [
    { "Address": "0xYourOwnerAddress" },
    { "Uint": "0" } // Template index for "Emit string {string}"
  ],
  "emailAddress": "user@example.com",
  "subject": "Execute Command",
  "body": "Please confirm the command execution.",
  "chain": "sepolia"
}
```

**Notes:**

- **`contractAddress`**: The address of your deployed `EmitEmailCommand` contract.
- **`dkimContractAddress`**: The address of the deployed `DKIMRegistry` contract.
- **`accountCode`**: The bytecode of the `EmailAuth` implementation contract. You can obtain it by compiling the contract and extracting the bytecode.
- **`Computed_Template_ID`**: The result of calling `computeTemplateId(0)` for the first template.
- **`functionAbi`**: The ABI of the `emitEmailCommand` function, including all nested components.
- **`remainingArgs`**:
  - **`owner`**: Your address (the deployer or owner of the contracts).
  - **`templateIdx`**: The index of the command template (e.g., `0` for `"Emit string {string}"`).

## Compute the Template ID

You can compute the template ID using a small JavaScript script with ethers.js:

```javascript
const { ethers } = require("ethers");

function computeTemplateId(templateIdx) {
  return ethers.BigNumber.from(
    ethers.utils.keccak256(
      ethers.utils.defaultAbiCoder.encode(["string", "uint256"], ["EXAMPLE", templateIdx])
    )
  ).toString();
}

console.log("Template ID for index 0:", computeTemplateId(0));
```

## Get the EmailAuth Contract Bytecode

You can get the bytecode of the `EmailAuth` implementation contract from the build artifacts.

Example:

```bash
cat out/EmailAuth.sol/EmailAuth.json | jq -r '.bytecode.object'
```

Ensure you have `jq` installed to parse JSON.

## Send the API Request

Use `curl` or any HTTP client to send the request:

```bash
curl -X POST https://relayer.example.com/api/submit \
  -H "Content-Type: application/json" \
  -d '{
    "contractAddress": "0xYourEmitEmailCommandContractAddress",
    "dkimContractAddress": "0xDKIMRegistryAddress",
    "accountCode": "0xEmailAuthBytecode",
    "codeExistsInEmail": true,
    "functionAbi": {
      // ... function ABI as above ...
    },
    "commandTemplate": "Emit string {string}",
    "commandParams": ["Hello, world!"],
    "templateId": "Computed_Template_ID",
    "remainingArgs": [
      { "Address": "0xYourOwnerAddress" },
      { "Uint": "0" }
    ],
    "emailAddress": "user@example.com",
    "subject": "Execute Command",
    "body": "Please confirm the command execution.",
    "chain": "sepolia"
  }'
```

Replace `https://relayer.example.com` with the actual URL of the Generic Relayer service you are using.

## User Interaction

- The user (email recipient) will receive an email with the command.
- They should reply to the email to authorize the action.

## Relayer Processing

- The relayer receives the email reply.
- It verifies the email using DKIM and zero-knowledge proofs.
- It executes the command on-chain by calling `emitEmailCommand`.


## Monitor and Verify

### Check Request Status

Use the `requestId` returned by the relayer to check the status:

```bash
curl https://relayer.example.com/api/status/{requestId}
```

### Verify On-Chain Execution

Use a blockchain explorer (e.g., Etherscan for Sepolia) to verify that the events have been emitted.

- Look for the `StringCommand` event emitted by your contract.
- Ensure that the event contains the expected data (e.g., `"Hello, world!"`).