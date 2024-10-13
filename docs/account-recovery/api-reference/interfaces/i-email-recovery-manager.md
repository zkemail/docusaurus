# IEmailRecoveryManager

The `IEmailRecoveryManager` is an interface that defines the structure and functionality for managing email-based account recovery processes.

<div className="row" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
  <div className="col col--12" style={{ marginBottom: '1rem' }}>
    <a href="https://github.com/zkemail/email-recovery/blob/main/src/interfaces/IEmailRecoveryManager.sol" target="_blank" className="card-link" style={{ textDecoration: 'none' }}>
      <div className="card" style={{ cursor: 'pointer', padding: '1.5rem 1rem', height: '100%' }}>
        <div className="card__header">
          <h3 style={{ pointerEvents: 'none', marginBottom: '1rem' }}>IEmailRecoveryManager Interface</h3>
        </div>
        <div className="card__body">
          <p style={{ pointerEvents: 'none', fontWeight: 'normal' }}>Find the source code for this interface</p>
        </div>
      </div>
    </a>
  </div>
</div>

## Structs

### `RecoveryConfig`
- `delay` (uint256): The time from when the threshold for a recovery request has passed until the recovery request can be executed.
- `expiry` (uint256): The time from when recovery is started until the recovery request becomes invalid.

### `RecoveryRequest`
- `executeAfter` (uint256): The timestamp from which the recovery request can be executed.
- `executeBefore` (uint256): The timestamp from which the recovery request becomes invalid.
- `currentWeight` (uint256): Total weight of all guardian approvals for the recovery request.
- `recoveryDataHash` (bytes32): The keccak256 hash of the recovery data used to execute the recovery attempt.

## Events

- `RecoveryConfigured(address indexed account, uint256 guardianCount, uint256 totalWeight, uint256 threshold)`
- `RecoveryConfigUpdated(address indexed account, uint256 delay, uint256 expiry)`
- `GuardianAccepted(address indexed account, address indexed guardian)`
- `RecoveryProcessed(address indexed account, address indexed guardian, uint256 executeAfter, uint256 executeBefore, bytes32 recoveryDataHash)`
- `RecoveryCompleted(address indexed account)`
- `RecoveryCancelled(address indexed account)`
- `RecoveryDeInitialized(address indexed account)`

## Errors

- `InvalidVerifier()`
- `InvalidDkimRegistry()`
- `InvalidEmailAuthImpl()`
- `InvalidSubjectHandler()`
- `SetupAlreadyCalled()`
- `AccountNotConfigured()`
- `DelayMoreThanExpiry(uint256 delay, uint256 expiry)`
- `RecoveryWindowTooShort(uint256 recoveryWindow)`
- `ThresholdExceedsAcceptedWeight(uint256 threshold, uint256 acceptedWeight)`
- `InvalidGuardianStatus(GuardianStatus guardianStatus, GuardianStatus expectedGuardianStatus)`
- `InvalidAccountAddress()`
- `NoRecoveryConfigured()`
- `NotEnoughApprovals(uint256 currentWeight, uint256 threshold)`
- `DelayNotPassed(uint256 blockTimestamp, uint256 executeAfter)`
- `RecoveryRequestExpired(uint256 blockTimestamp, uint256 executeBefore)`
- `InvalidRecoveryDataHash(bytes32 recoveryDataHash, bytes32 expectedRecoveryDataHash)`
- `NoRecoveryInProcess()`
- `RecoveryHasNotExpired(address account, uint256 blockTimestamp, uint256 executeBefore)`
- `RecoveryIsNotActivated()`

## Functions

### `getRecoveryConfig`
````solidity
function getRecoveryConfig(address account) external view returns (RecoveryConfig memory)
````

Retrieves the recovery configuration for a given account.

### `getRecoveryRequest`
````solidity
function getRecoveryRequest(address account) external view returns (RecoveryRequest memory)
````

Retrieves the current recovery request for a given account.

### `updateRecoveryConfig`
````solidity
function updateRecoveryConfig(RecoveryConfig calldata recoveryConfig) external
````

Updates the recovery configuration for the caller's account.

### `cancelRecovery`
````solidity
function cancelRecovery() external
````

Cancels an ongoing recovery process for the caller's account.

## Notes

- This interface defines the core functionality for managing email-based account recovery processes.
- It includes structures for recovery configuration and recovery requests, as well as events for tracking important recovery-related actions.
- The interface provides functions for retrieving and updating recovery configurations, as well as canceling recovery processes.
- Implementations of this interface should handle the logic for processing recovery requests, managing guardians, and executing recovery attempts.

## License

This project is licensed under the MIT License.