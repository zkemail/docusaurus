# Using existing modules

<div style={{fontSize: '1.2em'}}>
Learn how to create a wallet with email-based account recovery using existing ERC-7579 modules.
</div>

## 1. Set up a new project

<details>
<summary>Prerequisites</summary>

Ensure you have the following installed on your machine:

- **Foundry**: Check the installation instructions [here](https://book.getfoundry.sh/getting-started/installation.html).

</details>

Create a new directory and navigate into it:

```bash
mkdir account-recovery-wallet && cd account-recovery-wallet
```

Using the `forge` CLI, create a new project:

```bash
forge init
```

## 2. Install dependencies

Install the required dependencies:

```bash
forge install erc7579/erc7579-implementation
forge install erc7579/account-recovery-module
```

## 3. Create the wallet contract

Create a new file `src/RecoverableWallet.sol`:

```solidity:src/RecoverableWallet.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@erc7579-implementation/contracts/ERC7579Account.sol";
import "@account-recovery-module/contracts/AccountRecoveryModule.sol";

contract RecoverableWallet is ERC7579Account {
    constructor(address _owner, address _recoveryModule) ERC7579Account(_owner) {
        _installModule(address(_recoveryModule));
    }
}
```

## 4. Deploy the contracts

Create a deployment script `script/DeployRecoverableWallet.s.sol`:

```solidity:script/DeployRecoverableWallet.s.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Script.sol";
import "../src/RecoverableWallet.sol";
import "@account-recovery-module/contracts/AccountRecoveryModule.sol";

contract DeployRecoverableWallet is Script {
    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        vm.startBroadcast(deployerPrivateKey);

        AccountRecoveryModule recoveryModule = new AccountRecoveryModule();
        RecoverableWallet wallet = new RecoverableWallet(msg.sender, address(recoveryModule));

        vm.stopBroadcast();

        console.log("RecoverableWallet deployed at:", address(wallet));
        console.log("AccountRecoveryModule deployed at:", address(recoveryModule));
    }
}
```

To deploy the contracts:

1. Set up your environment variables:
   ```bash
   echo "PRIVATE_KEY=your_private_key_here" > .env
   ```

2. Run the deployment script:
   ```bash
   forge script script/DeployRecoverableWallet.s.sol --rpc-url <your_rpc_url> --broadcast
   ```

Replace `<your_rpc_url>` with the appropriate RPC URL for your target network.

## 5. Next steps

After deployment, you can interact with your RecoverableWallet using the ERC-7579 interface and leverage the account recovery features provided by the AccountRecoveryModule.
