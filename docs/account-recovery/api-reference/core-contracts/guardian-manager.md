# GuardianManager

The `GuardianManager` is an abstract smart contract that manages guardians for account recovery. It handles the setup, addition, removal, and configuration of guardians for each account.

<div className="row" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
  <div className="col col--12" style={{ marginBottom: '1rem' }}>
    <a href="https://github.com/zkemail/email-recovery/blob/main/src/GuardianManager.sol" target="_blank" className="card-link" style={{ textDecoration: 'none' }}>
      <div className="card" style={{ cursor: 'pointer', padding: '1.5rem 1rem', height: '100%' }}>
        <div className="card__header">
          <h3 style={{ pointerEvents: 'none', marginBottom: '1rem' }}>Guardian Manager</h3>
        </div>
        <div className="card__body">
          <p style={{ pointerEvents: 'none', fontWeight: 'normal' }}>Find the source code for this contract</p>
        </div>
      </div>
    </a>
  </div>
</div>

## State Variables

### `guardianConfigs`
- Type: `mapping(address account => GuardianManager.GuardianConfig guardianConfig)`
- Visibility: `internal`
- Description: Maps an account address to its guardian configuration.

### `guardiansStorage`
- Type: `mapping(address account => EnumerableGuardianMap.AddressToGuardianMap guardian)`
- Visibility: `internal`
- Description: Maps an account address to its guardians' storage.

## Modifiers

### `onlyWhenNotRecovering`
- Description: Ensures that the function can only be called when no recovery process is active for the caller's account.

## Events

### `AddedGuardian`
- Parameters:
  - `account` (indexed address): The account for which a guardian is added.
  - `guardian` (indexed address): The address of the added guardian.
  - `weight` (uint256): The weight assigned to the guardian.

### `RemovedGuardian`
- Parameters:
  - `account` (indexed address): The account from which a guardian is removed.
  - `guardian` (indexed address): The address of the removed guardian.
  - `weight` (uint256): The weight of the removed guardian.

### `ChangedThreshold`
- Parameters:
  - `account` (indexed address): The account for which the threshold is changed.
  - `threshold` (uint256): The new threshold value.

### `GuardianStatusUpdated`
- Parameters:
  - `account` (indexed address): The account for which a guardian's status is updated.
  - `guardian` (indexed address): The address of the guardian.
  - `newStatus` (GuardianStatus): The new status of the guardian.

## Functions

### `getGuardianConfig`
```solidity
function getGuardianConfig(address account) public view returns (GuardianConfig memory)
```
Retrieves the guardian configuration for a given account.

### `getGuardian`
```solidity
function getGuardian(address account, address guardian) public view returns (GuardianStorage memory)
```
Retrieves the guardian storage details for a given guardian and account.

### `setupGuardians`
```solidity
function setupGuardians(
    address account,
    address[] memory guardians,
    uint256[] memory weights,
    uint256 threshold
) internal returns (uint256, uint256)
```
Sets up guardians for a given account with specified weights and threshold.

### `addGuardian`
```solidity
function addGuardian(address guardian, uint256 weight) public onlyWhenNotRecovering
```
Adds a guardian for the caller's account with a specified weight.

### `removeGuardian`
```solidity
function removeGuardian(address guardian) external onlyWhenNotRecovering
```
Removes a guardian for the caller's account.

### `changeThreshold`
```solidity
function changeThreshold(uint256 threshold) external onlyWhenNotRecovering
```
Changes the threshold for guardian approvals for the caller's account.

### `updateGuardianStatus`
```solidity
function updateGuardianStatus(
    address account,
    address guardian,
    GuardianStatus newStatus
) internal
```
Updates the status for a guardian.

### `removeAllGuardians`
```solidity
function removeAllGuardians(address account) internal
```
Removes all guardians associated with an account.

## Notes

- This contract is abstract and is intended to be inherited by other contracts that implement guardian management functionality.
- It uses the `EnumerableGuardianMap` library for efficient guardian storage and retrieval.
- The contract includes checks to ensure that guardian operations are only performed when no recovery process is active.

## License

This project is licensed under the MIT License.