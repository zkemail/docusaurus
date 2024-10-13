# EmailRecoveryModule

The `EmailRecoveryModule` is a smart contract that provides a mechanism for recovering modular smart accounts by permissioning certain functions to be called on validators. It integrates with the email recovery manager contract to facilitate recovery.

<div className="row" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
  <div className="col col--12" style={{ marginBottom: '1rem' }}>
    <a href="https://github.com/zkemail/email-recovery/blob/main/src/modules/EmailRecoveryModule.sol" target="_blank" className="card-link" style={{ textDecoration: 'none' }}>
      <div className="card" style={{ cursor: 'pointer', padding: '1.5rem 1rem', height: '100%' }}>
        <div className="card__header">
          <h3 style={{ pointerEvents: 'none', marginBottom: '1rem' }}>EmailRecoveryModule Contract</h3>
        </div>
        <div className="card__body">
          <p style={{ pointerEvents: 'none', fontWeight: 'normal' }}>Find the source code for this contract</p>
        </div>
      </div>
    </a>
  </div>
</div>


## Constants

### `validator`
- Type: `address public immutable`
- Description: The address of the validator being recovered.

### `selector`
- Type: `bytes4 public immutable`
- Description: The function selector that is called when recovering the validator.

## Events

### `RecoveryExecuted`
- Parameters:
  - `account` (indexed address): The account being recovered.
  - `validator` (indexed address): The validator address.
- Description: Emitted when a recovery is executed.

## Errors

### `InvalidSelector`
- Parameters: `bytes4 selector`
- Description: Thrown when an invalid selector is provided.

### `InvalidOnInstallData`
- Description: Thrown when invalid data is provided during module installation.

### `InvalidValidator`
- Parameters: `address validator`
- Description: Thrown when an invalid validator address is provided.

## Constructor

```solidity
constructor(
    address verifier,
    address dkimRegistry,
    address emailAuthImpl,
    address subjectHandler,
    address _validator,
    bytes4 _selector
)
```

Initializes the EmailRecoveryModule with the necessary parameters.

## Functions

### `onInstall`
```solidity
function onInstall(bytes calldata data) external
```
Initializes the module with the threshold and guardians.

### `onUninstall`
```solidity
function onUninstall(bytes calldata data) external
```
Handles the uninstallation of the module and clears the recovery configuration.

### `isInitialized`
```solidity
function isInitialized(address account) external view returns (bool)
```
Checks if the module is initialized for a given account.

### `canStartRecoveryRequest`
```solidity
function canStartRecoveryRequest(address account) external view returns (bool)
```
Checks if a recovery request can be initiated based on guardian acceptance.

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

- This module targets a specific validator, so it should be deployed per validator.
- The module cannot be installed during account deployment as it breaks the 4337 validation rules.
- The `onInstall` function expects specific encoded data for recovery configuration.

# Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

# License

This project is licensed under the MIT License.