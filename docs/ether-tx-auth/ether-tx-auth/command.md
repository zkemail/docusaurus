import DocCardList from '@theme/DocCardList';

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

## Quickstart

If you want to quickly get started with the generic relayer, you can use the following quickstart guide:

<DocCardList 
  items={[
    {
      type: 'link',
      href: '../quickstart',
      label: 'Quickstart',
      description: 'Get started with the generic relayer.',
    },
  ]}
/>
