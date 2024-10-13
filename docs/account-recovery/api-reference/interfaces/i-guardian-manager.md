# IGuardianManager

The `IGuardianManager` is an interface that defines the structure and functionality for managing guardians in the context of account recovery processes.

<div className="row" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
  <div className="col col--12" style={{ marginBottom: '1rem' }}>
    <a href="https://github.com/zkemail/email-recovery/blob/main/src/interfaces/IGuardianManager.sol" target="_blank" className="card-link" style={{ textDecoration: 'none' }}>
      <div className="card" style={{ cursor: 'pointer', padding: '1.5rem 1rem', height: '100%' }}>
        <div className="card__header">
          <h3 style={{ pointerEvents: 'none', marginBottom: '1rem' }}>IGuardianManager Interface</h3>
        </div>
        <div className="card__body">
          <p style={{ pointerEvents: 'none', fontWeight: 'normal' }}>Find the source code for this interface</p>
        </div>
      </div>
    </a>
  </div>
</div>

## Structs

### `GuardianConfig`
- `guardianCount` (uint256): Total count for all guardians.
- `totalWeight` (uint256): Combined weight for all guardians.
- `acceptedWeight` (uint256): Combined weight for all accepted guardians.
- `threshold` (uint256): The threshold required to successfully process a recovery attempt.

## Events

- `AddedGuardian(address indexed account, address indexed guardian, uint256 weight)`
- `GuardianStatusUpdated(address indexed account, address indexed guardian, GuardianStatus newStatus)`
- `RemovedGuardian(address indexed account, address indexed guardian, uint256 weight)`
- `ChangedThreshold(address indexed account, uint256 threshold)`

## Errors

- `RecoveryInProcess()`
- `IncorrectNumberOfWeights(uint256 guardianCount, uint256 weightCount)`
- `ThresholdCannotBeZero()`
- `InvalidGuardianAddress(address guardian)`
- `InvalidGuardianWeight()`
- `AddressAlreadyGuardian()`
- `ThresholdExceedsTotalWeight(uint256 threshold, uint256 totalWeight)`
- `StatusCannotBeTheSame(GuardianStatus newStatus)`
- `SetupNotCalled()`
- `AddressNotGuardianForAccount()`

## Functions

### `getGuardianConfig`
````solidity
function getGuardianConfig(address account) external view returns (GuardianConfig memory)
````

Retrieves the guardian configuration for a given account.

### `getGuardian`
````solidity
function getGuardian(address account, address guardian) external view returns (GuardianStorage memory)
````

Retrieves the guardian information for a specific guardian of a given account.

### `addGuardian`
````solidity
function addGuardian(address guardian, uint256 weight) external
````

Adds a new guardian with the specified weight for the caller's account.

### `removeGuardian`
````solidity
function removeGuardian(address guardian) external
````

Removes a guardian from the caller's account.

### `changeThreshold`
````solidity
function changeThreshold(uint256 threshold) external
````

Changes the threshold required for successful recovery for the caller's account.

## Notes

- This interface defines the core functionality for managing guardians in the context of account recovery.
- It includes functions for adding and removing guardians, updating guardian statuses, and changing the recovery threshold.
- The `GuardianConfig` struct maintains important information about the guardians, including their total count, weights, and the recovery threshold.
- Implementations of this interface should handle the specific logic for managing guardians and ensuring the integrity of the recovery process.
