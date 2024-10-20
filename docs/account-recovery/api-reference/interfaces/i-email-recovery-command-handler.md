# IEmailRecoverySubjectHandler

The `IEmailRecoverySubjectHandler` is an interface that defines the structure and functionality for handling email subjects in the context of account recovery processes.

<div className="row" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
  <div className="col col--12" style={{ marginBottom: '1rem' }}>
    <a href="https://github.com/zkemail/email-recovery/blob/main/src/interfaces/IEmailRecoverySubjectHandler.sol" target="_blank" className="card-link" style={{ textDecoration: 'none' }}>
      <div className="card" style={{ cursor: 'pointer', padding: '1.5rem 1rem', height: '100%' }}>
        <div className="card__header">
          <h3 style={{ pointerEvents: 'none', marginBottom: '1rem' }}>IEmailRecoverySubjectHandler Interface</h3>
        </div>
        <div className="card__body">
          <p style={{ pointerEvents: 'none', fontWeight: 'normal' }}>Find the source code for this interface</p>
        </div>
      </div>
    </a>
  </div>
</div>

## Functions

### `acceptanceSubjectTemplates`
````solidity
function acceptanceSubjectTemplates() external pure returns (string[][] memory)
````

Returns the subject templates for guardian acceptance emails.

### `recoverySubjectTemplates`
````solidity
function recoverySubjectTemplates() external pure returns (string[][] memory)
````

Returns the subject templates for recovery request emails.

### `extractRecoveredAccountFromAcceptanceSubject`
````solidity
function extractRecoveredAccountFromAcceptanceSubject(
    bytes[] memory subjectParams,
    uint256 templateIdx
) external view returns (address)
````

Extracts the account address to be recovered from the subject parameters of an acceptance email.

### `extractRecoveredAccountFromRecoverySubject`
````solidity
function extractRecoveredAccountFromRecoverySubject(
    bytes[] memory subjectParams,
    uint256 templateIdx
) external view returns (address)
````

Extracts the account address to be recovered from the subject parameters of a recovery email.

### `validateAcceptanceSubject`
````solidity
function validateAcceptanceSubject(
    uint256 templateIdx,
    bytes[] memory subjectParams
) external view returns (address)
````

Validates the subject parameters for an acceptance email and returns the account address.

### `validateRecoverySubject`
````solidity
function validateRecoverySubject(
    uint256 templateIdx,
    bytes[] memory subjectParams
) external view returns (address)
````

Validates the subject parameters for a recovery email and returns the account address.

### `parseRecoveryDataHash`
````solidity
function parseRecoveryDataHash(
    uint256 templateIdx,
    bytes[] memory subjectParams
) external view returns (bytes32)
````

Parses and returns the recovery data hash from the subject parameters.

## Notes

- This interface defines the core functionality for handling email subjects in the context of account recovery.
- It includes functions for retrieving subject templates, extracting and validating account addresses from subjects, and parsing recovery data hashes.
- Implementations of this interface should handle the specific logic for different types of recovery-related emails (acceptance and recovery).
- The `templateIdx` parameter in most functions allows for multiple subject templates to be supported for each type of email.

## License

This project is licensed under the MIT License.
