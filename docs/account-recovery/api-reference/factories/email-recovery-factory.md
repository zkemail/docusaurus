# EmailRecoveryFactory

The `EmailRecoveryFactory` is a contract that facilitates the deployment of email recovery modules and their associated subject handlers. It uses Create2 to ensure deterministic addresses, which assists with module attestations.

<div className="row" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
  <div className="col col--12" style={{ marginBottom: '1rem' }}>
    <a href="https://github.com/zkemail/email-recovery/blob/main/src/factories/EmailRecoveryFactory.sol" target="_blank" className="card-link" style={{ textDecoration: 'none' }}>
      <div className="card" style={{ cursor: 'pointer', padding: '1.5rem 1rem', height: '100%' }}>
        <div className="card__header">
          <h3 style={{ pointerEvents: 'none', marginBottom: '1rem' }}>Email Recovery Factory</h3>
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

### `EmailRecoveryModuleDeployed`
- Parameters:
  - `emailRecoveryModule` (address): The address of the deployed email recovery module.
  - `subjectHandler` (address): The address of the deployed subject handler.
  - `validator` (address): The address of the validator to be recovered.
  - `functionSelector` (bytes4): The function selector for the recovery function.

## Errors

- `InvalidVerifier()`
- `InvalidEmailAuthImpl()`

## Constructor

```solidity
constructor(address _verifier, address _emailAuthImpl)
````

Initializes the EmailRecoveryFactory with the necessary parameters.

## Functions

### `deployEmailRecoveryModule`
````solidity
function deployEmailRecoveryModule(
    bytes32 subjectHandlerSalt,
    bytes32 recoveryModuleSalt,
    bytes calldata subjectHandlerBytecode,
    address dkimRegistry,
    address validator,
    bytes4 functionSelector
) external returns (address, address)
````

Deploys an email recovery module along with its subject handler.

#### Parameters:
- `subjectHandlerSalt`: Salt for the subject handler deployment
- `recoveryModuleSalt`: Salt for the recovery module deployment
- `subjectHandlerBytecode`: Bytecode of the subject handler contract
- `dkimRegistry`: Address of the DKIM registry
- `validator`: Address of the validator to be recovered
- `functionSelector`: Function selector for the recovery function to be called on the target validator

#### Returns:
- `emailRecoveryModule`: The deployed email recovery module
- `subjectHandler`: The deployed subject handler

## Notes

- The subject handler bytecode cannot be determined ahead of time, unlike the recovery module, which is why it is passed in directly.
- Developers will typically write their own subject handler and then pass the bytecode into this factory function.
- The deployed `EmailRecoveryModule` takes a target validator and target function selector as parameters, in addition to the verifier, DKIM registry, EmailAuth implementation, and subject handler.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.