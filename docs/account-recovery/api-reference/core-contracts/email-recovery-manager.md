# EmailRecoveryManager

The `EmailRecoveryManager` is a smart contract that manages the email-based recovery process for accounts. It handles the configuration of recovery settings, processing of recovery requests, and completion of the recovery process.

<div className="row" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
  <div className="col col--12" style={{ marginBottom: '1rem' }}>
    <a href="https://github.com/zkemail/email-recovery/blob/main/src/EmailRecoveryManager.sol" target="_blank" className="card-link" style={{ textDecoration: 'none' }}>
      <div className="card" style={{ cursor: 'pointer', padding: '1.5rem 1rem', height: '100%' }}>
        <div className="card__header">
          <h3 style={{ pointerEvents: 'none', marginBottom: '1rem' }}>Email Recovery Manager</h3>
        </div>
        <div className="card__body">
          <p style={{ pointerEvents: 'none', fontWeight: 'normal' }}>Find the source code for this contract</p>
        </div>
      </div>
    </a>
  </div>
</div>

## Constants

### `MINIMUM_RECOVERY_WINDOW`
- Type: `uint256`
- Value: 2 days
- Description: The minimum required time window between when a recovery attempt becomes valid and when it becomes invalid.

### `subjectHandler`
- Type: `address immutable`
- Description: The address of the subject handler contract that returns and validates the subject templates.

## Events

### `RecoveryConfigured`
- Parameters:
  - `account` (indexed address): The account for which recovery is configured.
  - `guardianCount` (uint256): The number of guardians.
  - `totalWeight` (uint256): The total weight of all guardians.
  - `threshold` (uint256): The threshold required for recovery.
- Description: Emitted when recovery is configured for an account.

### `RecoveryConfigUpdated`
- Parameters:
  - `account` (indexed address): The account for which recovery config is updated.
  - `delay` (uint256): The new delay period.
  - `expiry` (uint256): The new expiry period.
- Description: Emitted when the recovery configuration for an account is updated.

### `GuardianAccepted`
- Parameters:
  - `account` (indexed address): The account for which a guardian is accepted.
  - `guardian` (indexed address): The address of the accepted guardian.
- Description: Emitted when a guardian is accepted for an account.

### `RecoveryProcessed`
- Parameters:
  - `account` (indexed address): The account being recovered.
  - `guardian` (indexed address): The guardian initiating the recovery.
  - `executeAfter` (uint256): The timestamp after which recovery can be executed.
  - `executeBefore` (uint256): The timestamp before which recovery must be executed.
  - `recoveryDataHash` (bytes32): The hash of the recovery data.
- Description: Emitted when a recovery request is processed and meets the threshold.

### `RecoveryCompleted`
- Parameters:
  - `account` (indexed address): The account for which recovery is completed.
- Description: Emitted when the recovery process for an account is completed.

### `RecoveryCancelled`
- Parameters:
  - `account` (indexed address): The account for which recovery is cancelled.
- Description: Emitted when a recovery request is cancelled.

### `RecoveryDeInitialized`
- Parameters:
  - `account` (indexed address): The account for which recovery is de-initialized.
- Description: Emitted when all recovery-related state for an account is removed.

## Errors

1. `InvalidVerifier()`
2. `InvalidDkimRegistry()`
3. `InvalidEmailAuthImpl()`
4. `InvalidSubjectHandler()`
5. `SetupAlreadyCalled()`
6. `AccountNotConfigured()`
7. `DelayMoreThanExpiry(uint256 delay, uint256 expiry)`
8. `RecoveryWindowTooShort(uint256 window)`
9. `RecoveryInProcess()`
10. `RecoveryIsNotActivated()`
11. `InvalidGuardianStatus(GuardianStatus current, GuardianStatus expected)`
12. `ThresholdExceedsAcceptedWeight(uint256 threshold, uint256 acceptedWeight)`
13. `InvalidRecoveryDataHash(bytes32 provided, bytes32 expected)`
14. `InvalidAccountAddress()`
15. `NoRecoveryConfigured()`
16. `NotEnoughApprovals(uint256 current, uint256 threshold)`
17. `DelayNotPassed(uint256 currentTime, uint256 executeAfter)`
18. `RecoveryRequestExpired(uint256 currentTime, uint256 executeBefore)`
19. `NoRecoveryInProcess()`
20. `RecoveryHasNotExpired(address account, uint256 currentTime, uint256 executeBefore)`

## Constructor

```solidity
constructor(
    address _verifier,
    address _dkimRegistry,
    address _emailAuthImpl,
    address _subjectHandler
)
```

Initializes the EmailRecoveryManager contract with the necessary parameters.

## Functions

The contract likely includes functions for configuring recovery, processing recovery requests, and completing the recovery process. However, these functions are not explicitly listed in the provided documentation.

# Notes

- This contract works in conjunction with other components like the verifier, DKIM registry, email authentication implementation, and subject handler.
- It implements a guardian-based recovery system with configurable thresholds and time windows.

# Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

# License

This project is licensed under the MIT License.