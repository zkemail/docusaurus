---
title: Setup
---

# Generic Relayer Setup

This guide provides step-by-step instructions to integrate the ZK Email Generic Relayer system into your existing contract using Foundry.

## Install Dependencies

Install the necessary NPM packages in your project directory:

```bash
npm install @openzeppelin/contracts@5.0.0 @openzeppelin/contracts-upgradeable@5.0.0 @zk-email/contracts@6.1.5 @zk-email/ether-email-auth-contracts@0.0.2-preview
```

**Packages Installed:**

- `@zk-email/contracts@6.1.5`: Core contracts for ZK Email functionalities.
- `@zk-email/ether-email-auth-contracts@0.0.2-preview`: Contracts for email authentication and verification.
- `@openzeppelin/contracts@5.0.0`: Standard library of reusable smart contracts.
- `@openzeppelin/contracts-upgradeable@5.0.0`: Upgradeable version of OpenZeppelin contracts.

In your Solidity contract file, import the required contracts and libraries:

```solidity
// Import ZK Email contracts
import "@zk-email/ether-email-auth-contracts/src/EmailAuth.sol";

// Import OpenZeppelin contracts
import "@openzeppelin/contracts/utils/Create2.sol";
import {ERC1967Proxy} from "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";
```

Add the following remappings to your `remappings.txt` file or create the file if it doesn't exist:

```
@openzeppelin/=node_modules/@openzeppelin/
@zk-email/=node_modules/@zk-email/
```

## Smart Contract Setup

### Contract Variables

Add variables to store the addresses of the essential contracts:

```solidity
address public verifierAddr;
address public dkimAddr;
address public emailAuthImplementationAddr;
```

Set the addresses of the Verifier, DKIM Registry, and EmailAuth implementation in the constructor:

```solidity
constructor(
    address _verifierAddr,
    address _dkimAddr,
    address _emailAuthImplementationAddr
) {
    verifierAddr = _verifierAddr;
    dkimAddr = _dkimAddr;
    emailAuthImplementationAddr = _emailAuthImplementationAddr;
}
```
Provide functions to access these addresses:

```solidity
function verifier() public view virtual returns (address) {
    return verifierAddr;
}

function dkim() public view virtual returns (address) {
    return dkimAddr;
}

function emailAuthImplementation() public view virtual returns (address) {
    return emailAuthImplementationAddr;
}
```

### Email Authentication

Implement a function to compute the deterministic address for the `EmailAuth` contract:

```solidity
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
```

Deploy the `EmailAuth` proxy contract when needed:

```solidity
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
```

## Command Template Definition

Implement the `commandTemplates` function to specify command structures:

```solidity
function commandTemplates() public pure returns (string[][] memory) {
    string[][] memory templates = new string[][](NUMBER_OF_TEMPLATES);

    // Template 0: "Approve transaction {uint}"
    templates[0] = new string[](2);
    templates[0][0] = "Approve transaction";
    templates[0][1] = "{uint}";

    // Template 1: "Set threshold to {uint}"
    templates[1] = new string[](3);
    templates[1][0] = "Set threshold to";
    templates[1][1] = "{uint}";
    templates[1][2] = "percent";

    // Add more templates as needed...

    return templates;
}
```

Create a function to generate unique IDs for each template:

```solidity
function computeTemplateId(uint templateIdx) public pure returns (uint) {
    return uint256(keccak256(abi.encode("IDENTIFIER", templateIdx)));
}
```

## Command Execution Implementation

Process authenticated email commands in your contract:

```solidity
function executeEmailCommand(
    EmailAuthMsg memory emailAuthMsg,
    address owner,
    uint templateIdx
) public {
    // Compute addresses and template IDs
    address emailAuthAddr = computeEmailAuthAddress(
        owner,
        emailAuthMsg.proof.accountSalt
    );
    uint templateId = computeTemplateId(templateIdx);
    require(templateId == emailAuthMsg.templateId, "Invalid template ID");

    EmailAuth emailAuth;

    if (emailAuthAddr.code.length == 0) {
        // Deploy and initialize EmailAuth proxy
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
            "Proxy address mismatch"
        );
        emailAuth = EmailAuth(proxyAddress);
        emailAuth.initDKIMRegistry(dkim());
        emailAuth.initVerifier(verifier());

        // Insert command templates
        string[][] memory templates = commandTemplates();
        for (uint idx = 0; idx < templates.length; idx++) {
            emailAuth.insertCommandTemplate(
                computeTemplateId(idx),
                templates[idx]
            );
        }
    } else {
        // Use existing EmailAuth contract
        emailAuth = EmailAuth(payable(address(emailAuthAddr)));
        require(
            emailAuth.controller() == address(this),
            "Invalid controller"
        );
    }

    // Authenticate the email
    emailAuth.authEmail(emailAuthMsg);

    // Execute the action based on the command
    _executeAction(emailAuthAddr, emailAuthMsg.commandParams, templateIdx);
}
```

Define actions corresponding to each command template:

```solidity
function _executeAction(
    address emailAuthAddr,
    bytes[] memory commandParams,
    uint templateIdx
) private {
    if (templateIdx == 0) {
        uint transactionId = abi.decode(commandParams[0], (uint));
        _approveTransaction(transactionId);
    } else if (templateIdx == 1) {
        uint threshold = abi.decode(commandParams[0], (uint));
        _setThreshold(threshold);
    } else {
        revert("Invalid template index");
    }
}
```

## Deployment

Deploy the following contracts and note their addresses:

1. **Verifier Contract**
2. **DKIM Registry Contract**
3. **EmailAuth Implementation Contract**

Deploy your main contract with the addresses of the deployed contracts:

```solidity
constructor(
    address _verifierAddr,
    address _dkimAddr,
    address _emailAuthImplementationAddr
) {
    verifierAddr = _verifierAddr;
    dkimAddr = _dkimAddr;
    emailAuthImplementationAddr = _emailAuthImplementationAddr;
}
```
