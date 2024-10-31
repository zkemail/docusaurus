# Command Templates

Command templates are a crucial part of integrating the ZK Email Generic Relayer into your smart contracts. They define the structure of commands that can be sent via email and subsequently processed on-chain.

## Understanding Command Templates

**Command templates** define the syntax and parameters of the commands that can be sent via email to your smart contract. They consist of fixed strings and placeholders (matchers) that represent dynamic values.

A command template consists of two main components that work together to define valid email commands:

- **Fixed Strings**: Static parts of the command that do not change.
- **Matchers**: Placeholders enclosed in curly braces `{}` that represent dynamic input values.

:::info

```plaintext
Transfer {uint} tokens to {ethAddr}
```

In this template:

- **Fixed Strings**: "Transfer", "tokens to"
- **Matchers**: `{uint}`, `{ethAddr}`

:::

## Available Type Matchers

There are several types of matchers you can use in your command templates. Each matcher type allows you to capture different kinds of data from the command.

For a full list of matcher types and how to use them, see the following sections.

### `{string}` Type Matcher

The `{string}` matcher captures any string value.

#### Usage

Use this matcher when you want to capture a text input.

#### Example

**Command Template**

```plaintext
Set status message to {string}
```

**Code Example**

```solidity
function commandTemplates() public pure returns (string[][] memory) {
    string[][] memory templates = new string[][](1);
    templates[0] = new string[](4);
    templates[0][0] = "Set";
    templates[0][1] = "status";
    templates[0][2] = "message";
    templates[0][3] = "{string}";
    return templates;
}
```

### `{uint}` Type Matcher

The `{uint}` matcher captures an unsigned integer.

#### Usage

Use this matcher when you need to capture a non-negative whole number.

#### Example

**Command Template**

```plaintext
Deposit {uint} tokens
```

**Code Example**

```solidity
function commandTemplates() public pure returns (string[][] memory) {
    string[][] memory templates = new string[][](1);
    templates[0] = new string[](3);
    templates[0][0] = "Deposit";
    templates[0][1] = "{uint}";
    templates[0][2] = "tokens";
    return templates;
}
```

### `{int}` Type Matcher

The `{int}` matcher captures a signed integer.

#### Usage

Use this matcher when you need to capture both positive and negative whole numbers.

#### Example

**Command Template**

```plaintext
Adjust balance by {int}
```

**Code Example**

```solidity
function commandTemplates() public pure returns (string[][] memory) {
    string[][] memory templates = new string[][](1);
    templates[0] = new string[](5);
    templates[0][0] = "Adjust";
    templates[0][1] = "balance";
    templates[0][2] = "by";
    templates[0][3] = "{int}";
    return templates;
}
```

### `{decimals}` Type Matcher

The `{decimals}` matcher captures a decimal number.

#### Usage

Use this matcher when you need to capture numbers with decimal points.

#### Example

**Command Template**

```plaintext
Set exchange rate to {decimals}
```

**Code Example**

```solidity
function commandTemplates() public pure returns (string[][] memory) {
    string[][] memory templates = new string[][](1);
    templates[0] = new string[](5);
    templates[0][0] = "Set";
    templates[0][1] = "exchange";
    templates[0][2] = "rate";
    templates[0][3] = "to";
    templates[0][4] = "{decimals}";
    return templates;
}
```

### `{ethAddr}` Type Matcher

The `{ethAddr}` matcher captures an Ethereum address.

#### Usage

Use this matcher when you need to capture an Ethereum address.

#### Example

**Command Template**

```plaintext
Authorize address {ethAddr}
```

**Code Example**

```solidity
function commandTemplates() public pure returns (string[][] memory) {
    string[][] memory templates = new string[][](1);
    templates[0] = new string[](3);
    templates[0][0] = "Authorize";
    templates[0][1] = "address";
    templates[0][2] = "{ethAddr}";
    return templates;
}
```
