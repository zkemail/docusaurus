
# Command Templates

Command templates are a crucial part of integrating the ZK Email Generic Relayer into your smart contracts. They define the structure of commands that can be sent via email and subsequently processed on-chain.

## Understanding Command Templates

**Command templates** define the syntax and parameters of the commands that can be sent via email to your smart contract. They consist of fixed strings and placeholders (matchers) that represent dynamic values.

### Components of a Command Template

- **Fixed Strings**: Static parts of the command that do not change.
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

## Integrating Command Templates into Contracts

### Step-by-Step Integration

#### 1. Define Command Templates in Your Contract

```solidity
function commandTemplates() public pure returns (string[][] memory) {
    string[][] memory templates = new string[][](1);
    templates[0] = new string[](3);
    templates[0][0] = "Set";
    templates[0][1] = "greeting";
    templates[0][2] = "to";
    templates[0][3] = "{string}";
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

## Best Practices

- **Unique Identifiers**: Use a unique string in `computeTemplateId` to avoid collisions with other contracts.
- **Input Validation**: Validate and sanitize inputs extracted from `commandParams` to prevent malicious data.
- **Access Control**: Implement proper access control to ensure only authorized users can execute commands.
- **Error Handling**: Provide meaningful error messages and handle exceptions gracefully.

---

By understanding and implementing command templates, you can harness the power of email-driven interactions within your smart contracts, enhancing functionality and user experience.