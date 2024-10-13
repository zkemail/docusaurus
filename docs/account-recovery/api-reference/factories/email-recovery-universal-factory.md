# EmailRecoveryUniversalFactory

The `EmailRecoveryUniversalFactory` is a contract that facilitates the deployment of universal email recovery modules and their associated subject handlers. It uses Create2 to ensure deterministic addresses, which assists with module attestations.

<div className="row" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
  <div className="col col--12" style={{ marginBottom: '1rem' }}>
    <a href="https://github.com/zkemail/email-recovery/blob/main/src/factories/EmailRecoveryUniversalFactory.sol" target="_blank" className="card-link" style={{ textDecoration: 'none' }}>
      <div className="card" style={{ cursor: 'pointer', padding: '1.5rem 1rem', height: '100%' }}>
        <div className="card__header">
          <h3 style={{ pointerEvents: 'none', marginBottom: '1rem' }}>Email Recovery Universal Factory</h3>
        </div>
        <div className="card__body">
          <p style={{ pointerEvents: 'none', fontWeight: 'normal' }}>Find the source code for this contract</p>
        </div>
      </div>
    </a>
  </div>
</div>

## Constants

### `verifier`
- Type: `address public immutable`
- Description: Address of the verifier used by the recovery module.

### `emailAuthImpl`
- Type: `address public immutable`
- Description: Address of the EmailAuth.sol implementation.

## Events

### `UniversalEmailRecoveryModuleDeployed`
- Parameters:
  - `emailRecoveryModule` (address): The address of the deployed email recovery module.
  - `subjectHandler` (address): The address of the deployed subject handler.

## Errors

- `InvalidVerifier()`
- `InvalidEmailAuthImpl()`

## Constructor

```solidity
constructor(address _verifier, address _emailAuthImpl)
```

Initializes the EmailRecoveryUniversalFactory with the necessary parameters.

## Functions

### `deployUniversalEmailRecoveryModule`
```solidity
function deployUniversalEmailRecoveryModule(
    bytes32 subjectHandlerSalt,
    bytes32 recoveryModuleSalt,
    bytes calldata subjectHandlerBytecode,
    address dkimRegistry
) external returns (address, address)
```

Deploys a universal email recovery module along with its subject handler.

#### Parameters:
- `subjectHandlerSalt`: Salt for the subject handler deployment
- `recoveryModuleSalt`: Salt for the recovery module deployment
- `subjectHandlerBytecode`: Bytecode of the subject handler contract
- `dkimRegistry`: Address of the DKIM registry

#### Returns:
- `emailRecoveryModule`: The deployed email recovery module
- `subjectHandler`: The deployed subject handler

## Notes

- The subject handler bytecode cannot be determined ahead of time, unlike the recovery module, which is why it is passed in directly.
- Developers will typically write their own subject handler and then pass the bytecode into this factory function.
- The universal recovery module should have a relatively stable subject handler, but developers may want to write a generic subject handler in a slightly different way or even in a non-English language.
- The deployed `UniversalEmailRecoveryModule` takes the target verifier, DKIM registry, EmailAuth implementation, and subject handler as parameters.
- The target validator and target function selector are set when a module is installed, which is part of what makes the module generic for recovering any validator.

## License

This project is licensed under the MIT License.