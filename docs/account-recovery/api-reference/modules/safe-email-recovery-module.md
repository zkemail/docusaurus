# SafeEmailRecoveryModule

The `SafeEmailRecoveryModule` is a Safe module that recovers a Safe owner via ZK Email. It provides a simple mechanism for recovering Safe smart accounts by integrating with the email recovery manager contract.

<div className="row" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
  <div className="col col--12" style={{ marginBottom: '1rem' }}>
    <a href="https://github.com/zkemail/email-recovery/blob/main/src/modules/SafeEmailRecoveryModule.sol" target="_blank" className="card-link" style={{ textDecoration: 'none' }}>
      <div className="card" style={{ cursor: 'pointer', padding: '1.5rem 1rem', height: '100%' }}>
        <div className="card__header">
          <h3 style={{ pointerEvents: 'none', marginBottom: '1rem' }}>SafeEmailRecoveryModule Contract</h3>
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

## Events

### `RecoveryExecuted`
- Parameters:
  - `account` (indexed address): The account for which recovery was executed.

## Errors

- `ModuleNotInstalled(address account)`
- `InvalidAccount(address account)`
- `InvalidSelector(bytes4 selector)`
- `RecoveryFailed(address account, bytes returnData)`
- `ResetFailed(address account)`

## Constructor

```solidity
constructor(
    address verifier,
    address dkimRegistry,
    address emailAuthImpl,
    address subjectHandler
)
```

Initializes the SafeEmailRecoveryModule with the necessary parameters.

## Functions

### `configureSafeRecovery`
```solidity
function configureSafeRecovery(
    address[] memory guardians,
    uint256[] memory weights,
    uint256 threshold,
    uint256 delay,
    uint256 expiry
) public
```

Configures recovery for the caller's account. Ensures that the module is installed before configuring recovery.

### `canStartRecoveryRequest`
```solidity
function canStartRecoveryRequest(address account) external view returns (bool)
```

Checks if a recovery request can be initiated based on guardian acceptance.

### `recover`
```solidity
function recover(address account, bytes calldata recoveryData) internal override
```

Executes recovery on a Safe account. Called from the recovery manager once a recovery attempt has been processed.

### `resetWhenDisabled`
```solidity
function resetWhenDisabled(address account) external
```

Resets the guardian states for the account when the module is disabled.

## Notes

- This module defines how a recovery request is executed on a Safe, while the recovery manager defines what a valid recovery request is.
- The module integrates with the EmailRecoveryManager contract to facilitate the recovery process.
- It uses the `swapOwner` function of the Safe contract to rotate the owner during recovery.

## License

This project is licensed under the MIT License.