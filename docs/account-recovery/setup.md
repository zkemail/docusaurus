# Setup

ZK Email Recovery enables account recovery through email guardians. The recovery process involves:

1. Guardian setup and acceptance
2. Recovery initiation by guardians
3. Timelock delay period
4. Recovery completion and ownership transfer

## Quick Start (7579-Compatible Accounts)

Install our universal recovery module:

```solidity:contracts/Account.sol
// Install module with configuration
account.installModule({
    moduleTypeId: MODULE_TYPE_EXECUTOR,
    module: emailRecoveryModuleAddress,
    data: abi.encode(
        isInstalledContext,
        guardians,
        guardianWeights, 
        threshold,
        delay,
        expiry
    )
});
```

## Custom Implementation Guide

### Setup Environment

```bash
git clone https://github.com/zkemail/ether-email-auth.git
cd ether-email-auth

# Install foundry
curl -L https://foundry.paradigm.xyz | bash

# Install dependencies 
pnpm install
```

### Implement Core Components

#### Account Contract
Your account needs a recovery function:

```solidity:contracts/Account.sol
function changeOwner(address newOwner) public {
    require(
        msg.sender == owner() || msg.sender == recoveryController,
        "only owner or recovery controller"
    );
    _transferOwnership(newOwner);
}
```

#### Recovery Module
Create a module inheriting from EmailRecoveryManager:

```solidity:contracts/RecoveryModule.sol
contract MyRecoveryModule is EmailRecoveryManager {
    function recover(address account, bytes calldata recoveryData) internal override {
        (address validator, bytes memory recoveryCalldata) = 
            abi.decode(recoveryData, (address, bytes));
            
        executeFromExecutor(account, validator, recoveryCalldata);
    }
}
```

### Configure Recovery Settings

After deployment:

```solidity:scripts/setup.sol
// Add guardians with weights
recoveryModule.addGuardian(guardian1, weight1);
recoveryModule.addGuardian(guardian2, weight2);

// Set recovery parameters
recoveryModule.configureRecovery({
    guardians: guardians,
    weights: weights,
    threshold: threshold,  // Min weight needed
    delay: 24 hours,      // Timelock period
    expiry: 7 days        // Request expiry
});
```

## Command Handler Options

Choose a handler for email validation:

**EmailRecoveryCommandHandler (Universal)**
- Generic handler for any validator
- Command templates:
```
Accept: "Accept guardian request for {ethAddr}"
Recover: "Recover account {ethAddr} using recovery hash {string}"
```

**SafeRecoveryCommandHandler**
- Safe-specific handler
- Command templates:
```
Accept: "Accept guardian request for {ethAddr}"
Recover: "Recover account {ethAddr} from old owner {ethAddr} to new owner {ethAddr}"
```

**AccountHidingRecoveryCommandHandler**
- Privacy-focused handler that hides account addresses
- Command templates:
```
Accept: "Accept guardian request for {string}"
Recover: "Recover account {string} using recovery hash {string}"
```

You can also implement a custom handler by implementing `IEmailRecoveryCommandHandler`.
