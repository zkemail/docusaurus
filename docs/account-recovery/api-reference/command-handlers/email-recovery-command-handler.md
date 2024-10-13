# EmailRecoverySubjectHandler

The `EmailRecoverySubjectHandler` is a contract that defines subject templates and how to validate them for email recovery. This is the default subject handler that will work with any validator.

<div className="row" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
  <div className="col col--12" style={{ marginBottom: '1rem' }}>
    <a href="https://github.com/zkemail/email-recovery/blob/main/src/handlers/EmailRecoverySubjectHandler.sol" target="_blank" className="card-link" style={{ textDecoration: 'none' }}>
      <div className="card" style={{ cursor: 'pointer', padding: '1.5rem 1rem', height: '100%' }}>
        <div className="card__header">
          <h3 style={{ pointerEvents: 'none', marginBottom: '1rem' }}>Email Recovery Subject Handler</h3>
        </div>
        <div className="card__body">
          <p style={{ pointerEvents: 'none', fontWeight: 'normal' }}>Find the source code for this contract</p>
        </div>
      </div>
    </a>
  </div>
</div>

## Errors

- `InvalidTemplateIndex(uint256 templateIdx, uint256 expectedTemplateIdx)`
- `InvalidSubjectParams(uint256 paramsLength, uint256 expectedParamsLength)`
- `InvalidAccount()`

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
) public pure returns (address)
```
Validates the subject params for a recovery email.

### `parseRecoveryDataHash`
```solidity
function parseRecoveryDataHash(
    uint256 templateIdx,
    bytes[] calldata subjectParams
) external pure returns (bytes32)
```
Parses the recovery data hash from the subject params. The data hash is verified against later when recovery is executed.

## Notes

- This contract implements the `IEmailRecoverySubjectHandler` interface.
- It provides default implementations for subject templates and validation for both acceptance and recovery emails.
- The subject templates are hard-coded and include placeholders for Ethereum addresses and other parameters.
- The contract includes various checks to ensure the validity of template indices and subject parameters.

## License

This project is licensed under the MIT License.