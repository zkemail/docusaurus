# SafeRecoverySubjectHandler

The `SafeRecoverySubjectHandler` is a contract that defines subject templates and how to validate them for email recovery specifically for Safe accounts. This is a custom subject handler that works with Safes and defines custom validation.

<div className="row" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
  <div className="col col--12" style={{ marginBottom: '1rem' }}>
    <a href="https://github.com/zkemail/email-recovery/blob/main/src/handlers/SafeRecoverySubjectHandler.sol" target="_blank" className="card-link" style={{ textDecoration: 'none' }}>
      <div className="card" style={{ cursor: 'pointer', padding: '1.5rem 1rem', height: '100%' }}>
        <div className="card__header">
          <h3 style={{ pointerEvents: 'none', marginBottom: '1rem' }}>Safe Recovery Subject Handler</h3>
        </div>
        <div className="card__body">
          <p style={{ pointerEvents: 'none', fontWeight: 'normal' }}>Find the source code for this contract</p>
        </div>
      </div>
    </a>
  </div>
</div>

## Constants

### `selector`
- Type: `bytes4 public constant`
- Value: `bytes4(keccak256(bytes("swapOwner(address,address,address)")))`
- Description: The function selector for rotating an owner on a Safe.

## Errors

- `InvalidTemplateIndex(uint256 templateIdx, uint256 expectedTemplateIdx)`
- `InvalidSubjectParams(uint256 paramsLength, uint256 expectedParamsLength)`
- `InvalidOldOwner(address oldOwner)`
- `InvalidNewOwner(address newOwner)`

## Functions

### `acceptanceSubjectTemplates`
```solidity
function acceptanceSubjectTemplates() public pure returns (string[][] memory)
```

Returns a hard-coded two-dimensional array of strings representing the subject templates for an acceptance by a new guardian.

### `recoverySubjectTemplates`
```solidity
function recoverySubjectTemplates() public pure returns (string[][] memory)
```

Returns a hard-coded two-dimensional array of strings representing the subject templates for email recovery.

### `extractRecoveredAccountFromAcceptanceSubject`
```solidity
function extractRecoveredAccountFromAcceptanceSubject(
    bytes[] calldata subjectParams,
    uint256 /* templateIdx */
) public pure returns (address)
```

Extracts the account address to be recovered from the subject parameters of an acceptance email.

### `extractRecoveredAccountFromRecoverySubject`
```solidity
function extractRecoveredAccountFromRecoverySubject(
    bytes[] calldata subjectParams,
    uint256 /* templateIdx */
) public pure returns (address)
```

Extracts the account address to be recovered from the subject parameters of a recovery email.

### `validateAcceptanceSubject`
```solidity
function validateAcceptanceSubject(
    uint256 templateIdx,
    bytes[] calldata subjectParams
) external pure returns (address)
```

Validates the subject params for an acceptance email.

### `validateRecoverySubject`
```solidity
function validateRecoverySubject(
    uint256 templateIdx,
    bytes[] calldata subjectParams
) public view returns (address)
```

Validates the subject params for a recovery email. It checks if the old owner is valid and the new owner is not already an owner.

### `parseRecoveryDataHash`
```solidity
function parseRecoveryDataHash(
    uint256 templateIdx,
    bytes[] calldata subjectParams
) external view returns (bytes32)
```

Parses the recovery data hash from the subject params. The data hash is verified against later when recovery is executed.

### `getPreviousOwnerInLinkedList`
```solidity
function getPreviousOwnerInLinkedList(
    address safe,
    address oldOwner
) internal view returns (address)
```

Gets the previous owner in the Safe owners linked list that points to the owner passed into the function.

## Notes

- This contract implements the `IEmailRecoverySubjectHandler` interface.
- It provides custom implementations for subject templates and validation specifically for Safe accounts.
- The contract includes checks to ensure the validity of old and new owners during the recovery process.
- The `parseRecoveryDataHash` function constructs the recovery data hash using the Safe account address and the `swapOwner` function call data.

## License

This project is licensed under the MIT License.