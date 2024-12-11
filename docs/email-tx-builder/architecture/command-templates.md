---
title: Command Templates | Email Transaction Builder
sidebar_label: Command Templates
description: Learn about email command templates for smart contract interactions, including matcher types, syntax rules, and implementation examples in Solidity
keywords: [command templates, email transactions, smart contract commands, matcher types, Solidity implementation, string matcher, uint matcher, int matcher, decimals matcher, ethereum address matcher, email authentication]
---

# Command Templates

**Command templates** define the syntax and parameters of the commands that can be sent via email to your smart contract. They consist of fixed strings and placeholders (matchers) that represent dynamic values.

A **command** is a predefined function within the `EmailAuth.sol` smart contract or a related contract that can be invoked via email authentication. Commands represent specific actions or operations that can be executed on the blockchain when properly authorized through the email verification process.

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

### String Type Matcher

The `{string}` matcher captures any string value. Solidity type: `string`. Use this matcher when you want to capture a text input.

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

### Uint Type Matcher

The `{uint}` matcher captures an unsigned integer. Solidity type: `uint256`. Use this matcher when you need to capture a non-negative whole number.

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

### Int Type Matcher

The `{int}` matcher captures a signed integer. Solidity type: `int256`. Use this matcher when you need to capture both positive and negative whole numbers.

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

### Decimals Type Matcher

The `{decimals}` matcher captures a decimal number. Solidity type: `uint256`. Use this matcher when you need to capture numbers with decimal points.

For example, `2.7` is encoded as `abi.encode(2.7 * (10**18))`.

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

### EthAddr Type Matcher

The `{ethAddr}` matcher captures a checksummed Ethereum address in hexadecimal format. Solidity type: `address`. Use this matcher when you need to capture an Ethereum address.

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
