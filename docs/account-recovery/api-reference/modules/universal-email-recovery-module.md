# UniversalEmailRecoveryModule

The `UniversalEmailRecoveryModule` is a smart contract that provides a mechanism for recovering modular smart accounts by permissioning certain functions to be called on validators. It integrates with the email recovery manager contract to facilitate recovery.

<div className="row" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
  <div className="col col--12" style={{ marginBottom: '1rem' }}>
    <a href="https://github.com/zkemail/email-recovery/blob/main/src/modules/UniversalEmailRecoveryModule.sol" target="_blank" className="card-link" style={{ textDecoration: 'none' }}>
      <div className="card" style={{ cursor: 'pointer', padding: '1.5rem 1rem', height: '100%' }}>
        <div className="card__header">
          <h3 style={{ pointerEvents: 'none', marginBottom: '1rem' }}>UniversalEmailRecoveryModule Contract</h3>
        </div>
        <div className="card__body">
          <p style={{ pointerEvents: 'none', fontWeight: 'normal' }}>Find the source code for this contract</p>
        </div>
      </div>
    </a>
  </div>
</div>

## Constants

### `MAX_VALIDATORS`
- Type: `uint256 public constant`
- Value: 32
- Description: Maximum number of validators that can be configured for recovery.

## Events

### `NewValidatorRecovery`
- Parameters:
  - `account` (indexed address): The account for which a validator recovery is added.
  - `validator` (indexed address): The address of the validator.
  - `recoverySelector` (bytes4): The function selector for recovery.

### `RemovedValidatorRecovery`
- Parameters:
  - `account` (indexed address): The account from which a validator recovery is removed.
  - `validator` (indexed address): The address of the validator.
  - `recoverySelector` (bytes4): The function selector that was removed.

### `RecoveryExecuted`
- Parameters:
  - `account` (indexed address): The account being recovered.
  - `validator` (indexed address): The validator address.

## Errors

- `InvalidSelector(bytes4 selector)`
- `RecoveryModuleNotInitialized()`
- `InvalidOnInstallData()`
- `InvalidValidator(address validator)`
- `MaxValidatorsReached()`

## Modifiers

### `withoutUnsafeSelector`
Checks whether the selector is safe. Reverts if the selector is for "onInstall" or "onUninstall".

### `onlyWhenInitialized`
Checks whether the recovery module is initialized.

## Constructor

```solidity
constructor(
    address verifier,
    address dkimRegistry,
    address emailAuthImpl,
    address subjectHandler
)
```

Initializes the UniversalEmailRecoveryModule with the necessary parameters.

## Functions

### `onInstall`
```solidity
function onInstall(bytes calldata data) external
```
Initializes the module with the threshold and guardians.

### `allowValidatorRecovery`
```solidity
function allowValidatorRecovery(
    address validator,
    bytes memory isInstalledContext,
    bytes4 recoverySelector
) public onlyWhenInitialized withoutUnsafeSelector(validator, recoverySelector)
```
Allows a validator and function selector to be used for recovery.

### `disallowValidatorRecovery`
```solidity
function disallowValidatorRecovery(
    address validator,
    address prevValidator,
    bytes4 recoverySelector
) public onlyWhenInitialized
```
Disallows a validator and function selector that has been configured for recovery.

### `onUninstall`
```solidity
function onUninstall(bytes calldata /* data */) external
```
Handles the uninstallation of the module and clears the recovery configuration.

### `isInitialized`
```solidity
function isInitialized(address account) public view returns (bool)
```
Checks if the module is initialized for a given account.

### `canStartRecoveryRequest`
```solidity
function canStartRecoveryRequest(address account, address validator) external view returns (bool)
```
Checks if a recovery request can be initiated based on guardian acceptance.

### `recover`
```solidity
function recover(address account, bytes calldata recoveryData) internal override
```
Executes recovery on a validator.

### `getAllowedValidators`
```solidity
function getAllowedValidators(address account) public view returns (address[] memory)
```
Retrieves the list of allowed validators for a given account.

### `getAllowedSelectors`
```solidity
function getAllowedSelectors(address account) external view returns (bytes4[] memory)
```
Retrieves the list of allowed selectors for a given account.

### `name`
```solidity
function name() external pure returns (string memory)
```
Returns the name of the module.

### `version`
```solidity
function version() external pure returns (string memory)
```
Returns the version of the module.

### `isModuleType`
```solidity
function isModuleType(uint256 typeID) external pure returns (bool)
```
Checks if the given typeID corresponds to this module type.

# Notes

- This module is generic and does not target a specific validator.
- An account may add multiple validators to this recovery module, but it may only recover a single validator at a time.
- The module cannot be installed during account deployment as it breaks the 4337 validation rules.

# Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

# License

This project is licensed under the MIT License.