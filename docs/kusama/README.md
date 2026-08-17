---
title: Polkadot & Kusama | ZK Email
sidebar_label: Overview
description: Deploy ZK Email DKIM registry and proof verifier contracts to PolkaVM on Polkadot and Kusama. Covers the live Paseo Asset Hub registry, deploying a verifier, on-chain proof verification, chain and contract reference for Polkadot Hub Testnet.
keywords: [Kusama, Polkadot, PolkaVM, Paseo, Asset Hub, resolc, revive, Polkadot Hub Testnet, ZK Email, on-chain verification, Groth16, DKIM registry, ERC-7969, Hardhat, Substrate]
---

# Polkadot & Kusama

ZK Email proof verifier contracts run on **PolkaVM**, the contracts environment used by Polkadot and Kusama Asset Hub. Solidity verifiers are compiled with [`resolc`](https://github.com/paritytech/revive) instead of `solc`, then deployed with Hardhat exactly as they are on EVM chains.

This work was funded by the [Kusama ZK bounty](https://forum.polkadot.network/t/kusama-zk-bounty-transparency-report-q2-2026/18355). The reference deployments live on **Polkadot Hub Testnet (Paseo Asset Hub)**, chain ID `420420417`.

The supported proof system is **Groth16**. Verifiers are generated per blueprint from that blueprint's proving key.

## The DKIM registry

A verifier does not hold DKIM keys itself. It calls out to a registry contract implementing [ERC-7969](https://eips.ethereum.org/EIPS/eip-7969), the DKIM registry standard ([`IERC7969.sol`](https://github.com/zkemail/zk-email-verify/blob/main/packages/contracts/interfaces/IERC7969.sol)), which answers whether a given domain's DKIM key hash is valid. That registry has to exist before a verifier can be deployed, because its address is a constructor argument.

A `DKIMRegistry` is deployed and live on Paseo Asset Hub at [`0xD9e492f8104Ec730AF47A1A5C0cEAf94C89Da8EE`](https://blockscout-testnet.polkadot.io/address/0xD9e492f8104Ec730AF47A1A5C0cEAf94C89Da8EE), populated with real DKIM keys. You can point your own verifier at it by setting `DKIM_REGISTRY` to that address, with no deployment of your own.

### Keys are registered for you

Only the registry's owner can register key hashes, and ZK Email owns the registry above. You therefore do not register your blueprint's sender domain yourself. It happens automatically:

- **When your blueprint is compiled**, and again **every time a proof is generated**, ZK Email looks up the sender domain's known DKIM keys in the [DKIM Archive](https://archive.zk.email/), hashes them, and registers any hash that is not already on-chain.
- Because it also runs at proof time, a domain that rotates its DKIM key stays verifiable without anyone intervening.
- This applies to the SDK too. Proof generation runs through ZK Email's proving service, so generating a proof with `@zk-email/sdk` triggers the same registry update.

The update is best-effort and does not fail proof generation. If it cannot reach the chain, the proof still succeeds while the key hash never lands on-chain, and a later `verifyProofOnChain` reverts with `InvalidPublicKey()`. If an on-chain verification fails that way, check the registry for your domain before suspecting the proof.

If you would rather control the key set, the [milestone 1 how-to](https://github.com/zkemail/zk-email-verify/blob/kusama-grant/packages/contracts/docs/kusama-grant/milestone-1/04_public_howto.md) walks through checking a domain, populating a registry, and deploying one of your own.

The rest lives in the [milestone 1 documentation](https://github.com/zkemail/zk-email-verify/tree/kusama-grant/packages/contracts/docs/kusama-grant/milestone-1): deployment evidence, a Foundry suite covering registration, rotation and revocation, and a [gas and USD cost comparison against Ethereum](https://github.com/zkemail/zk-email-verify/blob/kusama-grant/packages/contracts/docs/kusama-grant/milestone-1/05_cost_benchmarks.md).

## Creating a blueprint that targets Paseo

Chain selection is available on the [ZK Email Registry staging environment](https://registry-staging.onrender.com/). Picking Polkadot Hub Testnet when you create a blueprint compiles the generated verifier with `resolc`, deploys it to chain `420420417`, and records the resulting address on the blueprint, so there is no contract for you to deploy.

[`kusama_grant_paseo_e2e`](https://registry-staging.onrender.com/e94e7f93-7575-4e26-a147-de894b19ce3e/versions) is a blueprint created this way. Its verifier is the pipeline-deployed contract listed under [Network and contract reference](#network-and-contract-reference).

## Verifying proofs on-chain

With a chain selected at creation, the blueprint already knows its verifier address, so [`verifyProofOnChain`](../zk-email-sdk/setup.md) submits the proof to it:

```javascript
const proof = await prover.generateProof(eml);
const verification = await blueprint.verifyProofOnChain(proof);
```

:::info Availability

Paseo support in `verifyProofOnChain` currently ships in the nightly SDK release:

```bash
npm install @zk-email/sdk@nightly
```

The stable release (`@zk-email/sdk@latest`) verifies against Base Sepolia only. Polkadot Hub Testnet support lands in a future stable release.

:::

## Deploying a verifier yourself

Everything above needs no contract deployment from you. This section is for reproducing that flow, or for running a verifier you control.

The verifier contract package reads `PRIVATE_KEY`, `DKIM_REGISTRY` and an optional `RPC_URL` from the environment, then deploys by chain ID:

```bash
yarn build
yarn deploy 420420417
```

There is also a local PolkaVM dev node flow (`revive-dev-node` plus `eth-rpc`, chain ID `420420420`) so you can iterate without a testnet wallet. The [public how-to](https://github.com/zkemail/sdk-images/blob/kusama-grant/circom/docs/kusama-grant/milestone-2/05_public_howto.md) walks through generation, local deployment and a real-proof Foundry test; the [contracts README](https://github.com/zkemail/sdk-images/blob/kusama-grant/circom/contracts/README.md) is the full command and environment variable reference.

## Network and contract reference

| | Polkadot Hub Testnet (Paseo Asset Hub) | Local PolkaVM dev node |
| --- | --- | --- |
| Chain ID | `420420417` | `420420420` |
| RPC | `https://eth-rpc-testnet.polkadot.io` | `http://127.0.0.1:8545` |
| Explorer | [blockscout-testnet.polkadot.io](https://blockscout-testnet.polkadot.io) | n/a |
| Compiler | `resolc` | `resolc` |

Deployments on Polkadot Hub Testnet (Paseo Asset Hub):

| Contract | Address |
| --- | --- |
| `DKIMRegistry` | [`0xD9e492f8104Ec730AF47A1A5C0cEAf94C89Da8EE`](https://blockscout-testnet.polkadot.io/address/0xD9e492f8104Ec730AF47A1A5C0cEAf94C89Da8EE) |
| `TestBlueprintGroth16Verifier` | [`0x2B1D8681B837a9e9080D36E9b588D1275D8e5D04`](https://blockscout-testnet.polkadot.io/address/0x2B1D8681B837a9e9080D36E9b588D1275D8e5D04) |
| `TestBlueprintZKEmailVerifier` | [`0x68E81c9909aD3982A991a953A63729bbF906B72B`](https://blockscout-testnet.polkadot.io/address/0x68E81c9909aD3982A991a953A63729bbF906B72B) |
| Pipeline-deployed blueprint verifier | [`0x72616B78d29d0cccBfEec1bf00E108885286D2f3`](https://blockscout-testnet.polkadot.io/address/0x72616B78d29d0cccBfEec1bf00E108885286D2f3) |

These contracts show as **unverified on Blockscout**, and so will yours. That is a PolkaVM tooling gap rather than anything wrong with the deployment: explorer verification tools expect bytecode produced by `solc` or Vyper, and there is no `resolc`-aware verify task yet. Provenance is established by recompiling and comparing bytecode instead, which the [end-to-end Paseo demo](https://github.com/zkemail/sdk-images/blob/kusama-grant/circom/docs/kusama-grant/milestone-2/06_e2e_demo.md) walks through, alongside a real `verify()` transaction against the registry and a negative control.

## Engineering documentation

The grant deliverables are documented in each repository:

| Repository | Covers |
| --- | --- |
| [`zkemail/zk-email-verify`](https://github.com/zkemail/zk-email-verify/blob/kusama-grant/packages/contracts/docs/kusama-grant/milestone-1/README.md) | DKIM registry on PolkaVM, deployment and bytecode provenance |
| [`zkemail/sdk-images`](https://github.com/zkemail/sdk-images/blob/kusama-grant/circom/docs/kusama-grant/README.md) | Verifier contract tooling, templates, dual-target Hardhat setup, pipeline integration |
| [`zkemail/zk-email-sdk-js`](https://github.com/zkemail/zk-email-sdk-js/blob/kusama-grant/docs/kusama-grant/milestone-3/04_sdk_on_chain_verification.md) | SDK on-chain verification across chains |
| [`zkemail/registry`](https://github.com/zkemail/registry/blob/kusama-grant/docs/kusama-grant/milestone-3/05_frontend_integration_and_documentation.md) | Registry frontend chain selection and on-chain verification UI |

A public how-to covering contract generation, local PolkaVM and Anvil deployment, and a real-proof Foundry test is in [`milestone-2/05_public_howto.md`](https://github.com/zkemail/sdk-images/blob/kusama-grant/circom/docs/kusama-grant/milestone-2/05_public_howto.md).

## Bonus: a standalone PolkaVM Hardhat template

Getting Solidity to build and deploy against both EVM and PolkaVM from one project took a fair amount of trial and error. Rather than keep that setup to ourselves, we stripped the ZK Email parts out and published it as [**zkemail/polkavm-hardhat-template**](https://github.com/zkemail/polkavm-hardhat-template).

You do not need it for anything on this page. It is for anyone else targeting PolkaVM who would rather not solve the same tooling problems again. Click **Use this template** and you get:

- Hardhat with [`@parity/hardhat-polkadot`](https://github.com/paritytech/hardhat-polkadot) wired for both `solc` and `resolc` output
- Foundry for tests
- A local PolkaVM dev node flow (`revive-dev-node` plus `eth-rpc`) and a local Anvil flow
- Hardhat Ignition deployment modules and a testnet deploy walkthrough
- A minimal `Counter` example, no ZK Email dependencies at all
