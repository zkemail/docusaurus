# EmailAuth.sol Explained

The `EmailAuth.sol` contract is a core component of the Generic Relayer architecture. It manages email authentication, command template management, and verifies zero-knowledge proofs to ensure secure execution of email-driven commands on the blockchain.

This page provides an in-depth explanation of the `EmailAuth.sol` contract, its purpose, key components, and how it works within the system.

## Overview

The `EmailAuth.sol` contract provides functionalities for:

- **Email Sender Authentication**: Verifies that an email originates from a legitimate source using DKIM (DomainKeys Identified Mail) signatures.
- **Command Authorization**: Ensures that the command extracted from the email matches predefined templates.
- **Zero-Knowledge Proof Verification**: Uses zero-knowledge proofs to verify the authenticity of the email content without revealing sensitive information.
- **Command Template Management**: Allows the insertion, updating, and deletion of command templates that define the structure of acceptable commands.
- **Preventing Replay Attacks**: Uses nullifiers to ensure that each email can only be used once for authentication.

The contract is designed to be upgradeable using the UUPS (Universal Upgradeable Proxy Standard) pattern and is controlled by an owner and a controller for specific administrative functions.

## Key Components

### Structs

#### `EmailAuthMsg`

```solidity
struct EmailAuthMsg {
    uint templateId;
    bytes[] commandParams;
    uint skippedCommandPrefix;
    EmailProof proof;
}
```

- **templateId**: The ID of the command template that the email command should satisfy.
- **commandParams**: Parameters extracted from the email command, matching placeholders in the template.
- **skippedCommandPrefix**: Number of bytes skipped in the command, used for partial matching.
- **proof**: An `EmailProof` struct containing the zero-knowledge proof and related data.

### State Variables

- **accountSalt** (`bytes32`): A unique salt used for deterministic contract deployment using `CREATE2`. It is derived from the user's email address and account code.
- **dkim** (`IDKIMRegistry`): Instance of the DKIM registry contract used for verifying DKIM signatures.
- **verifier** (`Verifier`): Instance of the Verifier contract used for verifying zero-knowledge proofs.
- **controller** (`address`): Address of the controller contract that has permissions to manage command templates and other administrative functions.
- **commandTemplates** (`mapping(uint => string[])`): Stores the supported command templates associated with their IDs.
- **lastTimestamp** (`uint`): Stores the latest timestamp from a verified `EmailAuthMsg` to prevent replay attacks.
- **usedNullifiers** (`mapping(bytes32 => bool)`): Keeps track of used nullifiers to prevent replay attacks.
- **timestampCheckEnabled** (`bool`): Flag indicating whether timestamp checks are enabled.

### Events

- **DKIMRegistryUpdated**: Emitted when the DKIM registry address is updated.
- **VerifierUpdated**: Emitted when the Verifier contract address is updated.
- **CommandTemplateInserted**: Emitted when a new command template is inserted.
- **CommandTemplateUpdated**: Emitted when a command template is updated.
- **CommandTemplateDeleted**: Emitted when a command template is deleted.
- **EmailAuthed**: Emitted when an email has been successfully authenticated.
- **TimestampCheckEnabled**: Emitted when the timestamp check feature is enabled or disabled.

## Modifiers

- **onlyController**: Restricts access to functions so that only the controller contract can call them.

  ```solidity
  modifier onlyController() {
      require(msg.sender == controller, "only controller");
      _;
  }
  ```

## Constructor and Initialization

### Constructor

The constructor is empty because the contract uses an initializer function due to being upgradeable.

```solidity
constructor() {}
```

### Initialization Function

#### `initialize`

Initializes the contract with the initial owner, account salt, and controller address.

```solidity
function initialize(
    address _initialOwner,
    bytes32 _accountSalt,
    address _controller
) public initializer {
    __Ownable_init(_initialOwner);
    accountSalt = _accountSalt;
    timestampCheckEnabled = true;
    controller = _controller;
}
```

- **Parameters**:
  - `_initialOwner`: Address of the initial owner.
  - `_accountSalt`: The account salt for deterministic deployment.
  - `_controller`: Address of the controller contract.

## Functions

### DKIM Registry and Verifier Management

#### `dkimRegistryAddr`

Returns the address of the DKIM registry contract.

```solidity
function dkimRegistryAddr() public view returns (address) {
    return address(dkim);
}
```

#### `verifierAddr`

Returns the address of the Verifier contract.

```solidity
function verifierAddr() public view returns (address) {
    return address(verifier);
}
```

#### `initDKIMRegistry`

Initializes the DKIM registry contract address. Can only be called by the controller.

```solidity
function initDKIMRegistry(address _dkimRegistryAddr) public onlyController {
    require(_dkimRegistryAddr != address(0), "invalid dkim registry address");
    require(address(dkim) == address(0), "dkim registry already initialized");
    dkim = IDKIMRegistry(_dkimRegistryAddr);
    emit DKIMRegistryUpdated(_dkimRegistryAddr);
}
```

#### `initVerifier`

Initializes the Verifier contract address. Can only be called by the controller.

```solidity
function initVerifier(address _verifierAddr) public onlyController {
    require(_verifierAddr != address(0), "invalid verifier address");
    require(address(verifier) == address(0), "verifier already initialized");
    verifier = Verifier(_verifierAddr);
    emit VerifierUpdated(_verifierAddr);
}
```

#### `updateDKIMRegistry`

Updates the DKIM registry contract address. Can only be called by the owner.

```solidity
function updateDKIMRegistry(address _dkimRegistryAddr) public onlyOwner {
    require(_dkimRegistryAddr != address(0), "invalid dkim registry address");
    dkim = IDKIMRegistry(_dkimRegistryAddr);
    emit DKIMRegistryUpdated(_dkimRegistryAddr);
}
```

#### `updateVerifier`

Updates the Verifier contract address. Can only be called by the owner.

```solidity
function updateVerifier(address _verifierAddr) public onlyOwner {
    require(_verifierAddr != address(0), "invalid verifier address");
    verifier = Verifier(_verifierAddr);
    emit VerifierUpdated(_verifierAddr);
}
```

### Command Template Management

#### `getCommandTemplate`

Retrieves a command template by its ID.

```solidity
function getCommandTemplate(uint _templateId) public view returns (string[] memory) {
    require(commandTemplates[_templateId].length > 0, "template id not exists");
    return commandTemplates[_templateId];
}
```

#### `insertCommandTemplate`

Inserts a new command template. Can only be called by the controller.

```solidity
function insertCommandTemplate(uint _templateId, string[] memory _commandTemplate) public onlyController {
    require(_commandTemplate.length > 0, "command template is empty");
    require(commandTemplates[_templateId].length == 0, "template id already exists");
    commandTemplates[_templateId] = _commandTemplate;
    emit CommandTemplateInserted(_templateId);
}
```

#### `updateCommandTemplate`

Updates an existing command template by its ID. Can only be called by the controller.

```solidity
function updateCommandTemplate(uint _templateId, string[] memory _commandTemplate) public onlyController {
    require(_commandTemplate.length > 0, "command template is empty");
    require(commandTemplates[_templateId].length > 0, "template id not exists");
    commandTemplates[_templateId] = _commandTemplate;
    emit CommandTemplateUpdated(_templateId);
}
```

#### `deleteCommandTemplate`

Deletes an existing command template by its ID. Can only be called by the controller.

```solidity
function deleteCommandTemplate(uint _templateId) public onlyController {
    require(commandTemplates[_templateId].length > 0, "template id not exists");
    delete commandTemplates[_templateId];
    emit CommandTemplateDeleted(_templateId);
}
```

### Email Authentication

#### `authEmail`

Authenticates the email sender and authorizes the command based on the provided `EmailAuthMsg`. Can only be called by the controller.

```solidity
function authEmail(EmailAuthMsg memory emailAuthMsg) public onlyController {
    // Retrieve the command template
    string[] memory template = commandTemplates[emailAuthMsg.templateId];
    require(template.length > 0, "template id not exists");

    // Verify DKIM public key hash
    require(
        dkim.isDKIMPublicKeyHashValid(
            emailAuthMsg.proof.domainName,
            emailAuthMsg.proof.publicKeyHash
        ),
        "invalid dkim public key hash"
    );

    // Check for replay attacks
    require(
        !usedNullifiers[emailAuthMsg.proof.emailNullifier],
        "email nullifier already used"
    );

    // Verify account salt
    require(
        accountSalt == emailAuthMsg.proof.accountSalt,
        "invalid account salt"
    );

    // Verify timestamp
    require(
        !timestampCheckEnabled ||
            emailAuthMsg.proof.timestamp == 0 ||
            emailAuthMsg.proof.timestamp > lastTimestamp,
        "invalid timestamp"
    );

    // Validate command lengths
    require(
        bytes(emailAuthMsg.proof.maskedCommand).length <= verifier.COMMAND_BYTES(),
        "invalid masked command length"
    );
    require(
        emailAuthMsg.skippedCommandPrefix < verifier.COMMAND_BYTES(),
        "invalid size of the skipped command prefix"
    );

    // Construct expected command
    string memory trimmedMaskedCommand = removePrefix(
        emailAuthMsg.proof.maskedCommand,
        emailAuthMsg.skippedCommandPrefix
    );
    string memory expectedCommand = "";

    // Try different string cases for matching
    for (uint stringCase = 0; stringCase < 3; stringCase++) {
        expectedCommand = CommandUtils.computeExpectedCommand(
            emailAuthMsg.commandParams,
            template,
            stringCase
        );
        if (Strings.equal(expectedCommand, trimmedMaskedCommand)) {
            break;
        }
        if (stringCase == 2) {
            revert("invalid command");
        }
    }

    // Verify zero-knowledge proof
    require(
        verifier.verifyEmailProof(emailAuthMsg.proof),
        "invalid email proof"
    );

    // Mark nullifier as used
    usedNullifiers[emailAuthMsg.proof.emailNullifier] = true;

    // Update timestamp
    if (timestampCheckEnabled && emailAuthMsg.proof.timestamp != 0) {
        lastTimestamp = emailAuthMsg.proof.timestamp;
    }

    // Emit authentication event
    emit EmailAuthed(
        emailAuthMsg.proof.emailNullifier,
        emailAuthMsg.proof.accountSalt,
        emailAuthMsg.proof.isCodeExist,
        emailAuthMsg.templateId
    );
}
```

**Explanation:**

- **DKIM Verification**: Ensures the email comes from a legitimate domain by verifying the DKIM public key hash.
- **Replay Protection**: Uses `emailNullifier` to prevent the same email from being used multiple times.
- **Account Salt Verification**: Confirms that the `accountSalt` matches, ensuring the email is associated with the correct account.
- **Timestamp Verification**: Checks the freshness of the email to prevent replay attacks.
- **Command Matching**: Constructs the expected command from the template and parameters, then compares it to the command in the email.
- **Zero-Knowledge Proof Verification**: Verifies the proof using the `Verifier` contract.

### Timestamp Check Control

#### `setTimestampCheckEnabled`

Enables or disables the timestamp check. Can only be called by the controller.

```solidity
function setTimestampCheckEnabled(bool _enabled) public onlyController {
    timestampCheckEnabled = _enabled;
    emit TimestampCheckEnabled(_enabled);
}
```

### Upgradeability

#### `_authorizeUpgrade`

Function required by the UUPS upgradeable pattern to authorize contract upgrades. Only callable by the owner.

```solidity
function _authorizeUpgrade(address newImplementation) internal override onlyOwner {}
```

## Internal Helper Functions

### `removePrefix`

Removes a specified number of characters from the beginning of a string.

```solidity
function removePrefix(string memory str, uint numChars) private pure returns (string memory) {
    require(numChars <= bytes(str).length, "Invalid number of characters");

    bytes memory strBytes = bytes(str);
    bytes memory result = new bytes(strBytes.length - numChars);

    for (uint i = numChars; i < strBytes.length; i++) {
        result[i - numChars] = strBytes[i];
    }

    return string(result);
}
```

## Security Considerations

- **Access Control**: Critical functions are protected by `onlyOwner` and `onlyController` modifiers to prevent unauthorized access.
- **Replay Protection**: Uses `emailNullifier` and `usedNullifiers` mapping to prevent replay attacks.
- **DKIM Verification**: Ensures that emails are authentic and haven't been tampered with.
- **Zero-Knowledge Proofs**: Protect user privacy by not revealing sensitive email content on-chain.
- **Timestamp Verification**: Prevents the execution of outdated commands by checking the timestamp.
- **Upgradeability**: Uses the UUPS pattern for secure contract upgrades, with authorization restricted to the owner.

## Conclusion

The `EmailAuth.sol` contract plays a crucial role in the Generic Relayer architecture by providing secure email authentication and command authorization mechanisms. By integrating DKIM verification, zero-knowledge proofs, and robust access control, it ensures that only legitimate and authorized commands are executed on the blockchain.

Understanding the functionalities and security features of `EmailAuth.sol` is essential for developers looking to implement email-driven actions in their blockchain applications using the Generic Relayer.