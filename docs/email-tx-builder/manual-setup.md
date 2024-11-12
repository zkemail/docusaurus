import DocCardList from '@theme/DocCardList';

# Manual Setup

Welcome to the ZK Email Generic Relayer Manual Setup Guide! This guide will walk you through setting up and using the Generic Relayer to enable email-driven actions on blockchain networks. You'll learn how to define commands, deploy contracts, and interact with the relayer API.

## Set Up a New Project

<details>
<summary>Prerequisites</summary>

Before you begin, ensure you have the following installed on your machine:

- **Foundry**: A toolkit for Ethereum application development. Installation instructions can be found [here](https://book.getfoundry.sh/getting-started/installation.html).
- **Node.js and npm**: JavaScript runtime and package manager.
- **Git**: Version control system.

You'll also need:

- **Access to the Sepolia testnet** (or another preferred blockchain network).
- **Testnet Ether**: For deploying contracts and paying gas fees.
</details>

Create a new directory for your project and navigate into it:

```bash
mkdir generic-relayer-template && cd generic-relayer-template
```

Initialize a new Foundry project:

```bash
forge init
```

## Install Dependencies

### Install Required Packages

Initialize a new npm project:

```bash
npm init -y
```

Install the necessary npm packages:

```bash
npm install @openzeppelin/contracts@5.0.0 @openzeppelin/contracts-upgradeable@5.0.0 @zk-email/contracts@6.1.5 @zk-email/ether-email-auth-contracts@0.0.2-preview
```

### Update Remappings

Create a `remappings.txt` file in your project root with the following content:

```
@openzeppelin/=node_modules/@openzeppelin/
@zk-email/=node_modules/@zk-email/
```

## Create and Deploy Contracts

### Create `EmitEmailCommand.sol` Contract

Create a new file `src/EmitEmailCommand.sol` and add the following code:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@zk-email/ether-email-auth-contracts/src/EmailAuth.sol";
import "@openzeppelin/contracts/utils/Create2.sol";
import {ERC1967Proxy} from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

/// @title Example contract that emits an event for the command in the given email.
contract EmitEmailCommand {
    address public verifierAddr;
    address public dkimAddr;
    address public emailAuthImplementationAddr;

    event StringCommand(address indexed emailAuthAddr, string indexed command);
    event UintCommand(address indexed emailAuthAddr, uint indexed command);
    event IntCommand(address indexed emailAuthAddr, int indexed command);
    event DecimalsCommand(address indexed emailAuthAddr, uint indexed command);
    event EthAddrCommand(
        address indexed emailAuthAddr,
        address indexed command
    );

    constructor(
        address _verifierAddr,
        address _dkimAddr,
        address _emailAuthImplementationAddr
    ) {
        verifierAddr = _verifierAddr;
        dkimAddr = _dkimAddr;
        emailAuthImplementationAddr = _emailAuthImplementationAddr;
    }

    /// @notice Returns the address of the verifier contract.
    /// @dev This function is virtual and can be overridden by inheriting contracts.
    /// @return address The address of the verifier contract.
    function verifier() public view virtual returns (address) {
        return verifierAddr;
    }

    /// @notice Returns the address of the DKIM contract.
    /// @dev This function is virtual and can be overridden by inheriting contracts.
    /// @return address The address of the DKIM contract.
    function dkim() public view virtual returns (address) {
        return dkimAddr;
    }

    /// @notice Returns the address of the email auth contract implementation.
    /// @dev This function is virtual and can be overridden by inheriting contracts.
    /// @return address The address of the email authentication contract implementation.
    function emailAuthImplementation() public view virtual returns (address) {
        return emailAuthImplementationAddr;
    }

    /// @notice Computes the address for email auth contract using the CREATE2 opcode.
    /// @dev This function utilizes the `Create2` library to compute the address. The computation uses a provided account address to be recovered, account salt,
    /// and the hash of the encoded ERC1967Proxy creation code concatenated with the encoded email auth contract implementation
    /// address and the initialization call data. This ensures that the computed address is deterministic and unique per account salt.
    /// @param owner The address of the owner of the EmailAuth proxy.
    /// @param accountSalt A bytes32 salt value defined as a hash of the guardian's email address and an account code. This is assumed to be unique to a pair of the guardian's email address and the wallet address to be recovered.
    /// @return address The computed address.
    function computeEmailAuthAddress(
        address owner,
        bytes32 accountSalt
    ) public view returns (address) {
        return
            Create2.computeAddress(
                accountSalt,
                keccak256(
                    abi.encodePacked(
                        type(ERC1967Proxy).creationCode,
                        abi.encode(
                            emailAuthImplementation(),
                            abi.encodeCall(
                                EmailAuth.initialize,
                                (owner, accountSalt, address(this))
                            )
                        )
                    )
                )
            );
    }

    /// @notice Deploys a new proxy contract for email authentication.
    /// @dev This function uses the CREATE2 opcode to deploy a new ERC1967Proxy contract with a deterministic address.
    /// @param owner The address of the owner of the EmailAuth proxy.
    /// @param accountSalt A bytes32 salt value used to ensure the uniqueness of the deployed proxy address.
    /// @return address The address of the newly deployed proxy contract.
    function deployEmailAuthProxy(
        address owner,
        bytes32 accountSalt
    ) internal returns (address) {
        ERC1967Proxy proxy = new ERC1967Proxy{salt: accountSalt}(
            emailAuthImplementation(),
            abi.encodeCall(
                EmailAuth.initialize,
                (owner, accountSalt, address(this))
            )
        );
        return address(proxy);
    }

    /// @notice Calculates a unique command template ID for template provided by this contract.
    /// @dev Encodes the email account recovery version ID, "EXAMPLE", and the template index,
    /// then uses keccak256 to hash these values into a uint ID.
    /// @param templateIdx The index of the command template.
    /// @return uint The computed uint ID.
    function computeTemplateId(uint templateIdx) public pure returns (uint) {
        return uint256(keccak256(abi.encode("EXAMPLE", templateIdx)));
    }

    /// @notice Returns a two-dimensional array of strings representing the command templates.
    /// @return string[][] A two-dimensional array of strings, where each inner array represents a set of fixed strings and matchers for a command template.
    function commandTemplates() public pure returns (string[][] memory) {
        string[][] memory templates = new string[][](5); // Corrected size to 5
        templates[0] = new string[](3); // Corrected size to 3
        templates[0][0] = "Emit";
        templates[0][1] = "string";
        templates[0][2] = "{string}";

        templates[1] = new string[](3); // Added missing initialization
        templates[1][0] = "Emit";
        templates[1][1] = "uint";
        templates[1][2] = "{uint}";

        templates[2] = new string[](3); // Added missing initialization
        templates[2][0] = "Emit";
        templates[2][1] = "int";
        templates[2][2] = "{int}";

        templates[3] = new string[](3); // Added missing initialization
        templates[3][0] = "Emit";
        templates[3][1] = "decimals";
        templates[3][2] = "{decimals}";

        templates[4] = new string[](4); // Corrected size to 4
        templates[4][0] = "Emit";
        templates[4][1] = "ethereum";
        templates[4][2] = "address"; // Fixed typo: "adddress" to "address"
        templates[4][3] = "{ethAddr}";

        return templates;
    }

    /// @notice Emits an event for the command in the given email.
    function emitEmailCommand(
        EmailAuthMsg memory emailAuthMsg,
        address owner,
        uint templateIdx
    ) public {
        address emailAuthAddr = computeEmailAuthAddress(
            owner,
            emailAuthMsg.proof.accountSalt
        );
        uint templateId = computeTemplateId(templateIdx);
        require(templateId == emailAuthMsg.templateId, "invalid template id");

        EmailAuth emailAuth;
        if (emailAuthAddr.code.length == 0) {
            require(
                emailAuthMsg.proof.isCodeExist == true,
                "isCodeExist must be true for the first email"
            );
            address proxyAddress = deployEmailAuthProxy(
                owner,
                emailAuthMsg.proof.accountSalt
            );
            require(
                proxyAddress == emailAuthAddr,
                "proxy address does not match with emailAuthAddr"
            );
            emailAuth = EmailAuth(proxyAddress);
            emailAuth.initDKIMRegistry(dkim());
            emailAuth.initVerifier(verifier());
            string[][] memory templates = commandTemplates();
            for (uint idx = 0; idx < templates.length; idx++) {
                emailAuth.insertCommandTemplate(
                    computeTemplateId(idx),
                    templates[idx]
                );
            }
        } else {
            emailAuth = EmailAuth(payable(address(emailAuthAddr)));
            require(
                emailAuth.controller() == address(this),
                "invalid controller"
            );
        }
        emailAuth.authEmail(emailAuthMsg);
        _emitEvent(emailAuthAddr, emailAuthMsg.commandParams, templateIdx);
    }

    function _emitEvent(
        address emailAuthAddr,
        bytes[] memory commandParams,
        uint templateIdx
    ) private {
        if (templateIdx == 0) {
            string memory command = abi.decode(commandParams[0], (string));
            emit StringCommand(emailAuthAddr, command);
        } else if (templateIdx == 1) {
            uint command = abi.decode(commandParams[0], (uint));
            emit UintCommand(emailAuthAddr, command);
        } else if (templateIdx == 2) {
            int command = abi.decode(commandParams[0], (int));
            emit IntCommand(emailAuthAddr, command);
        } else if (templateIdx == 3) {
            uint command = abi.decode(commandParams[0], (uint));
            emit DecimalsCommand(emailAuthAddr, command);
        } else if (templateIdx == 4) {
            address command = abi.decode(commandParams[0], (address));
            emit EthAddrCommand(emailAuthAddr, command);
        } else {
            revert("invalid templateIdx");
        }
    }
}
```

### Create Deployment Script

Create a `script/DeployEmitEmailCommand.s.sol` file:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";

import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@zk-email/ether-email-auth-contracts/src/utils/Verifier.sol";
import "@zk-email/ether-email-auth-contracts/src/utils/Groth16Verifier.sol";
import "@zk-email/ether-email-auth-contracts/src/utils/ECDSAOwnedDKIMRegistry.sol";
import "@zk-email/ether-email-auth-contracts/src/EmailAuth.sol";
import "../src/EmitEmailCommand.sol";
import {ERC1967Proxy} from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

contract Deploy is Script {
    using ECDSA for *;

    ECDSAOwnedDKIMRegistry dkimImpl;
    ECDSAOwnedDKIMRegistry dkim;
    Verifier verifierImpl;
    Verifier verifier;
    EmailAuth emailAuthImpl;
    EmitEmailCommand emitEmailCommand;

    function run() external {
        uint256 deployerPrivateKey = vm.envUint("PRIVATE_KEY");
        if (deployerPrivateKey == 0) {
            console.log("PRIVATE_KEY env var not set");
            return;
        }
        address signer = vm.envAddress("SIGNER");
        if (signer == address(0)) {
            console.log("SIGNER env var not set");
            return;
        }

        vm.startBroadcast(deployerPrivateKey);
        address initialOwner = vm.addr(deployerPrivateKey);
        console.log("Initial owner: %s", vm.toString(initialOwner));
        // Deploy ECDSA DKIM registry
        {
            dkimImpl = new ECDSAOwnedDKIMRegistry();
            console.log(
                "ECDSAOwnedDKIMRegistry implementation deployed at: %s",
                address(dkimImpl)
            );
            ERC1967Proxy dkimProxy = new ERC1967Proxy(
                address(dkimImpl),
                abi.encodeCall(dkimImpl.initialize, (initialOwner, signer))
            );
            dkim = ECDSAOwnedDKIMRegistry(address(dkimProxy));
            console.log(
                "ECDSAOwnedDKIMRegistry deployed at: %s",
                address(dkim)
            );
            vm.setEnv("ECDSA_DKIM", vm.toString(address(dkim)));
        }

        // Deploy Verifier
        {
            verifierImpl = new Verifier();
            console.log(
                "Verifier implementation deployed at: %s",
                address(verifierImpl)
            );
            Groth16Verifier groth16Verifier = new Groth16Verifier();
            ERC1967Proxy verifierProxy = new ERC1967Proxy(
                address(verifierImpl),
                abi.encodeCall(
                    verifierImpl.initialize,
                    (initialOwner, address(groth16Verifier))
                )
            );
            verifier = Verifier(address(verifierProxy));
            console.log("Verifier deployed at: %s", address(verifier));
            vm.setEnv("VERIFIER", vm.toString(address(verifier)));
        }

        // Deploy EmailAuth Implementation
        {
            emailAuthImpl = new EmailAuth();
            console.log(
                "EmailAuth implementation deployed at: %s",
                address(emailAuthImpl)
            );
            vm.setEnv("EMAIL_AUTH_IMPL", vm.toString(address(emailAuthImpl)));
        }

        // Deploy EmitEmailCommand
        {
            emitEmailCommand = new EmitEmailCommand(
                address(verifier),
                address(dkim),
                address(emailAuthImpl)
            );
            console.log(
                "EmitEmailCommand deployed at: %s",
                address(emitEmailCommand)
            );
        }
        vm.stopBroadcast();
    }
}
```

### Create Environment Variables File

Create a `.env` file in the root of the project:

```bash
PRIVATE_KEY=0x... # Replace with your private key (include the 0x prefix)
SIGNER=0x69bec2dd161d6bbcc91ec32aa44d9333ebc864c0 # Dont change this

CHAIN_ID=11155111
RPC_URL="https://rpc.sepolia.org"
ETHERSCAN_API_KEY=your-etherscan-api-key
```

Next, source the environment variables by running:

```bash
source .env
``` 

### Compile the Contracts

Compile your contracts using Foundry:

```bash
forge build
```

Ensure there are no compilation errors before proceeding.

### Deploy the Contracts

Deploy the contracts using Foundry's `forge script` command:

```bash
forge script script/DeployEmitEmailCommand.s.sol:Deploy --rpc-url $RPC_URL --chain-id $CHAIN_ID --broadcast --verify --legacy --etherscan-api-key $ETHERSCAN_API_KEY
```

Make sure to replace `$RPC_URL` and `$ETHERSCAN_API_KEY` with your actual RPC URL and Etherscan API key.

**Note**: Ensure you have sufficient testnet ETH in the account associated with your private key.

## Conclusion

Congratulations! You've successfully set up and used the ZK Email Generic Relayer to execute email-driven commands on the blockchain. By following this guide, you:

- Set up a new project and installed necessary dependencies.
- Created and deployed the `EmitEmailCommand` contract.
- Deployed required dependencies (`DKIMRegistry`, `Verifier`, and `EmailAuth` implementation).
- Defined command templates.
- Interacted with the relayer API to send commands via email.
- Monitored the execution and verified the results.

For more detailed information on the architecture and technical aspects, refer to the [Architecture Guide](../architecture/README.md).
