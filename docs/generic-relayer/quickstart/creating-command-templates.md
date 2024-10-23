# Creating Command Templates

Command templates are a crucial part of integrating the ZK Email Generic Relayer into your smart contracts. They define the structure of commands that can be sent via email and subsequently processed on-chain. This guide will help you understand how to create custom command templates and integrate them into any smart contract, enabling you to harness the power of email-driven blockchain interactions.

## Understanding Command Templates

**Command templates** define the syntax and parameters of the commands that can be sent via email to your smart contract. They consist of fixed strings and placeholders (matchers) that represent dynamic values.

### Components of a Command Template

- **Fixed Strings**: These are static parts of the command that do not change.
- **Matchers**: Placeholders enclosed in curly braces `{}` that represent dynamic input values.

### Example Template

```plaintext
Transfer {uint} tokens to {address}
```

In this template:

- **Fixed Strings**: "Transfer", "tokens to"
- **Matchers**: `{uint}`, `{address}`

## Creating Custom Command Templates

To create a custom command template:

1. **Define the Command Structure**: Determine what action the command should perform and what parameters it requires.
2. **Identify Fixed Strings and Matchers**: Break down the command into fixed strings and matchers.
3. **Choose Appropriate Matchers**: Use the correct matcher types for your parameters.

### Available Matchers

- `{string}`: Matches any string.
- `{uint}`: Matches an unsigned integer.
- `{int}`: Matches a signed integer.
- `{decimals}`: Matches a decimal number.
- `{ethAddr}`: Matches an Ethereum address.

### Example

Suppose you want a command that allows a user to set a greeting message:

```plaintext
Set greeting to {string}
```

<!-- ## Integrating Command Templates into Contracts

To integrate command templates into your contract:

1. **Create a Function to Return Templates**: Implement a function that returns an array of your command templates.
2. **Compute Template IDs**: Assign a unique ID to each template using a consistent method.
3. **Handle Commands in Contract Logic**: Write functions that process the commands based on the template used.

### Step-by-Step Integration

#### 1. Define Command Templates in Your Contract

```solidity
function commandTemplates() public pure returns (string[][] memory) {
    string[][] memory templates = new string[][](1);
    templates[0] = new string[](3);
    templates[0][0] = "Set";
    templates[0][1] = "greeting";
    templates[0][2] = "to {string}";
    return templates;
}
```

#### 2. Compute Template IDs

Implement a function to compute template IDs:

```solidity
function computeTemplateId(uint templateIdx) public pure returns (uint256) {
    return uint256(keccak256(abi.encode("MY_CONTRACT", templateIdx)));
}
```

**Note**: Replace `"MY_CONTRACT"` with a unique identifier for your contract to avoid collisions.

#### 3. Process Commands Based on Template ID

In your function that handles commands (e.g., `handleCommand`), use the `templateId` to determine which command to execute:

```solidity
function handleCommand(
    EmailAuthMsg memory emailAuthMsg,
    uint256 templateIdx
) public {
    uint256 templateId = computeTemplateId(templateIdx);
    require(templateId == emailAuthMsg.templateId, "Invalid template ID");

    if (templateIdx == 0) {
        string memory newGreeting = abi.decode(emailAuthMsg.commandParams[0], (string));
        setGreeting(newGreeting);
    } else {
        revert("Unknown template index");
    }
}
```

## Computing Template IDs

Template IDs are unique identifiers for your command templates. They are computed using a hash function to ensure uniqueness and prevent collisions.

### Computing Template IDs in Solidity

```solidity
function computeTemplateId(uint256 templateIdx) public pure returns (uint256) {
    return uint256(keccak256(abi.encode("MY_CONTRACT", templateIdx)));
}
```

### Computing Template IDs in JavaScript

You can compute template IDs off-chain using JavaScript and the `ethers` library:

```javascript
const ethers = require('ethers');

function computeTemplateId(templateIdx) {
    return ethers.BigNumber.from(
        ethers.utils.keccak256(
            ethers.utils.defaultAbiCoder.encode(
                ['string', 'uint256'],
                ['MY_CONTRACT', templateIdx]
            )
        )
    ).toString();
}

console.log('Template ID for index 0:', computeTemplateId(0));
```

## Example: Implementing Command Templates

Let's walk through an example of integrating command templates into a contract that allows users to update a status message.

### 1. Define the Contract

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@zk-email/ether-email-auth-contracts/src/EmailAuth.sol";

contract StatusUpdater {
    string public statusMessage;
    address public owner;

    constructor(address _owner) {
        owner = _owner;
    }
}
```

### 2. Add Command Templates

```solidity
function commandTemplates() public pure returns (string[][] memory) {
    string[][] memory templates = new string[][](1);
    templates[0] = new string[](3);
    templates[0][0] = "Update";
    templates[0][1] = "status";
    templates[0][2] = "to {string}";
    return templates;
}
```

### 3. Compute Template IDs

```solidity
function computeTemplateId(uint256 templateIdx) public pure returns (uint256) {
    return uint256(keccak256(abi.encode("STATUS_UPDATER", templateIdx)));
}
```

### 4. Implement Command Handling

```solidity
function handleCommand(
    EmailAuthMsg memory emailAuthMsg,
    uint256 templateIdx
) public {
    uint256 templateId = computeTemplateId(templateIdx);
    require(templateId == emailAuthMsg.templateId, "Invalid template ID");

    if (templateIdx == 0) {
        string memory newStatus = abi.decode(emailAuthMsg.commandParams[0], (string));
        updateStatus(newStatus);
    } else {
        revert("Unknown template index");
    }
}
```

### 5. Add the Update Function

```solidity
function updateStatus(string memory newStatus) internal {
    require(msg.sender == owner, "Only owner can update status");
    statusMessage = newStatus;
}
```

---

## Best Practices

- **Unique Identifiers**: Use a unique string in `computeTemplateId` to avoid collisions with other contracts.
- **Input Validation**: Validate and sanitize inputs extracted from `commandParams` to prevent malicious data from being processed.
- **Access Control**: Implement proper access control to ensure only authorized users can execute commands.
- **Error Handling**: Provide meaningful error messages and handle exceptions gracefully.

## Next Steps

Now that you understand how to create and integrate command templates:

- **Extend Functionality**: Add more command templates to support additional functionalities.
- **User Interaction**: Update your frontend or API to generate emails conforming to your new command templates.
- **Testing**: Thoroughly test your contract with various command inputs to ensure reliability.
- **Security Audit**: Consider a security audit to identify and fix potential vulnerabilities.

## Conclusion

Command templates are a powerful feature that allows you to define flexible and secure interactions between email commands and smart contracts. By understanding how to create and integrate them, you can enhance your blockchain applications to respond to off-chain events seamlessly. -->
