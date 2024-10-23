# What is a Command?

A **command** is a predefined function within the `EmailAuth.sol` smart contract or a related contract that can be invoked via email authentication. Commands represent specific actions or operations that can be executed on the blockchain when properly authorized through the email verification process.

## Command Definition

Commands are defined as functions in the `EmailAuth.sol` contract and/or in a separate implementation contract that uses `EmailAuth.sol`. Each command has:

- **Function Logic**: The actual code that performs the desired operation on the blockchain.

- **Command Template**: A string that represents the command in human-readable form, often used in email communication.

- **Template ID**: A unique identifier for the command template.

- **Parameters**: Inputs required to execute the command, which can be filled with user-provided values extracted from the email.

## Command Templates

Command templates define the structure of the commands that can be received via email. They consist of fixed strings and placeholders for parameters.

**Example:**

```solidity
function commandTemplates() public pure returns (string[][] memory) {
    string[][] memory templates = new string[][](1);
    templates[0] = new string[](3);
    templates[0][0] = "Emit";
    templates[0][1] = "string";
    templates[0][2] = "{string}";
    return templates;
}
```

This template corresponds to the command `"Emit string {string}"`, where `{string}` is a placeholder for the command parameter.

## Template ID Computation

Each command template has a unique `templateId`, computed using a hash function:

```solidity
function computeTemplateId(uint256 templateIdx) public pure returns (uint256) {
    return uint256(keccak256(abi.encode("EXAMPLE", templateIdx)));
}
```

This ensures that each template can be uniquely identified and matched during the email verification process.

## Example Command Contract Implementation

Below is a complete example of the `EmitEmailCommand` contract, demonstrating how commands can be implemented. It defines functions that emit events based on the commands received via email authentication.

### `EmitEmailCommand.sol`

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "./EmailAuth.sol"; // Adjust the import path as necessary
import "@openzeppelin/contracts/utils/Create2.sol";
import "@openzeppelin/contracts/proxy/ERC1967/ERC1967Proxy.sol";

/// @notice Demonstrates how to execute commands upon email authentication by emitting specific events.
contract EmitEmailCommand {
    address public verifierAddr;
    address public dkimAddr;
    address public emailAuthImplementationAddr;

    event StringCommand(address indexed emailAuthAddr, string command);
    // Additional events can be defined for other command types if needed

    /// @notice Constructor to initialize the contract addresses
    /// @param _verifierAddr Address of the Verifier contract
    /// @param _dkimAddr Address of the DKIM Registry contract
    /// @param _emailAuthImplementationAddr Address of the EmailAuth implementation contract
    constructor(
        address _verifierAddr,
        address _dkimAddr,
        address _emailAuthImplementationAddr
    ) {
        verifierAddr = _verifierAddr;
        dkimAddr = _dkimAddr;
        emailAuthImplementationAddr = _emailAuthImplementationAddr;
    }

    /// @notice Computes a unique command template ID
    /// @param templateIdx The index of the command template
    /// @return uint256 The computed template ID
    function computeTemplateId(uint256 templateIdx) public pure returns (uint256) {
        return uint256(keccak256(abi.encode("EXAMPLE", templateIdx)));
    }

    /// @notice Returns the command templates
    /// @return string[][] The array of command templates
    function commandTemplates() public pure returns (string[][] memory) {
        string[][] memory templates = new string[][](1);
        templates[0] = new string[](3);
        templates[0][0] = "Emit";
        templates[0][1] = "string";
        templates[0][2] = "{string}";
        return templates;
    }

    /// @notice Computes the address of the EmailAuth contract using CREATE2
    /// @param owner The owner address
    /// @param accountSalt The salt used for address computation
    /// @return address The computed EmailAuth contract address
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
                            emailAuthImplementationAddr,
                            abi.encodeWithSelector(
                                EmailAuth.initialize.selector,
                                owner,
                                accountSalt,
                                address(this)
                            )
                        )
                    )
                )
            );
    }

    /// @notice Deploys the EmailAuth proxy contract using CREATE2
    /// @param owner The owner address
    /// @param accountSalt The salt used for address computation
    /// @return address The address of the deployed EmailAuth proxy
    function deployEmailAuthProxy(
        address owner,
        bytes32 accountSalt
    ) internal returns (address) {
        ERC1967Proxy proxy = new ERC1967Proxy{salt: accountSalt}(
            emailAuthImplementationAddr,
            abi.encodeWithSelector(
                EmailAuth.initialize.selector,
                owner,
                accountSalt,
                address(this)
            )
        );
        return address(proxy);
    }

    /// @notice Handles the execution of the command after verifying the email authentication
    /// @param emailAuthMsg The email authentication message containing the proof and command parameters
    /// @param owner The owner address
    /// @param templateIdx The index of the command template
    function emitEmailCommand(
        EmailAuthMsg memory emailAuthMsg,
        address owner,
        uint256 templateIdx
    ) public {
        address emailAuthAddr = computeEmailAuthAddress(
            owner,
            emailAuthMsg.proof.accountSalt
        );
        uint256 templateId = computeTemplateId(templateIdx);
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
            emailAuth.initDKIMRegistry(dkimAddr);
            emailAuth.initVerifier(verifierAddr);
            string[][] memory templates = commandTemplates();
            for (uint256 idx = 0; idx < templates.length; idx++) {
                emailAuth.insertCommandTemplate(
                    computeTemplateId(idx),
                    templates[idx]
                );
            }
        } else {
            emailAuth = EmailAuth(payable(emailAuthAddr));
            require(
                emailAuth.controller() == address(this),
                "invalid controller"
            );
        }
        emailAuth.authEmail(emailAuthMsg);
        _emitEvent(emailAuthAddr, emailAuthMsg.commandParams, templateIdx);
    }

    /// @notice Emits the appropriate event based on the command template index
    /// @param emailAuthAddr The address of the EmailAuth contract
    /// @param commandParams The parameters extracted from the email command
    /// @param templateIdx The index of the command template
    function _emitEvent(
        address emailAuthAddr,
        bytes[] memory commandParams,
        uint256 templateIdx
    ) private {
        if (templateIdx == 0) {
            string memory command = abi.decode(commandParams[0], (string));
            emit StringCommand(emailAuthAddr, command);
        } else {
            revert("invalid templateIdx");
        }
    }
}
```

**Explanation:**

- **Imports:**
  - `EmailAuth.sol`: Contains the `EmailAuth` contract which handles email authentication.
  - `Create2.sol`: Used for deterministic contract deployments.
  - `ERC1967Proxy.sol`: Enables proxy pattern for upgradeable contracts.

- **Events:**
  - `StringCommand`: Emitted when a command with a `string` parameter is executed.

- **Constructor:**
  - Initializes contract addresses for the verifier, DKIM registry, and the `EmailAuth` implementation.

- **Function `computeTemplateId`:**
  - Computes a unique ID for each command template using a hash function.

- **Function `commandTemplates`:**
  - Defines the command templates that can be executed.

- **Function `computeEmailAuthAddress`:**
  - Calculates the deterministic address where the `EmailAuth` contract should be deployed using `CREATE2`.

- **Function `deployEmailAuthProxy`:**
  - Deploys the `EmailAuth` proxy contract at the computed address if it doesn't already exist.

- **Function `emitEmailCommand`:**
  - Main function that:
    - Computes the expected `EmailAuth` address.
    - Deploys the `EmailAuth` proxy if necessary.
    - Initializes the `EmailAuth` contract with the DKIM registry and verifier addresses.
    - Inserts command templates into `EmailAuth`.
    - Authenticates the email using `authEmail`.
    - Calls `_emitEvent` to execute the command.

- **Function `_emitEvent`:**
  - Decodes the command parameters and emits the appropriate event based on the `templateIdx`.

**Note:**
- Adjust the import paths according to your project structure.
- Ensure that the `EmailAuth.sol` contract and any other dependencies are properly set up and compiled.

---

By following this example, you can create your own commands and integrate them into your blockchain application using the Generic Relayer architecture. The `EmitEmailCommand` contract provides a template that you can modify to suit your specific use case, adding more command templates and handling different types of commands as needed.

Remember to:

- Define your command templates clearly.
- Compute unique `templateId`s for each command template.
- Implement the command logic in the `_emitEvent` function or similar handlers.
- Ensure proper authentication and validation using the `EmailAuth` contract.