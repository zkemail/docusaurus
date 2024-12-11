---
title: Usage Guide | ZK Email Verifier
sidebar_label: Usage Guide
description: Comprehensive guide for implementing ZK Email Verifier - from regex creation to proof verification, including circuit compilation, input generation, witness computation, and both off-chain and on-chain verification
keywords: [ZK Email implementation, regex compilation, circuit creation, DKIM verification, proof generation, witness computation, snarkjs setup, trusted setup, circuit verification, Ethereum integration, zero-knowledge proofs]
---

# Usage Guide

This guide provides a step-by-step walkthrough on how to use the ZK Email Verifier. It covers the process from converting your email to regex to creating your zero-knowledge proof for email verification. The guide assumes you have already installed the necessary packages as outlined in the Installation Guide. If you haven't done so, please refer to the [Setup Guide](setup.md) first.

For an easy setup, we suggest utilizing [zkrepl](https://zkrepl.dev), a playground for compiling and testing your circuits in the early stages of development. Additionally, explore our [Proof of Twitter guide](https://prove.email/blog/twitter) for a practical demonstration on how to leverage our SDKs to construct your own circuits.

## Step 1: Create the Regex File

Transform your target email string into a regex format and compile it into a regex.circom file. For guidance, visit our [zk-regex repository](https://github.com/zkemail/zk-regex).

If you want an easy way to use zk-regex V1, you can use our tool to convert regex into circom code: [zkregex.com](https://zkregex.com/). If that fails, you are likely using advanced regex syntax and should use the [zk-regex V2 CLI](https://github.com/zkemail/zk-regex) to compile it instead.

## Step 2: Implementing the Circuits

Next, use `email-verifier.circom` from the zk-email/circuits package to create your zk circuit to verify the DKIM signature. You should use [our Twitter circuit guide](https://prove.email/blog/twitter) as a reference.

To set up your own circuit for the email-verifier, you can follow these steps:

1. Include the `email-verifier.circom` file from the `@zk-email/circuits` package as well as the `regex.circom` file that was generated from Step 1 of this guide.
2. Create a template for your circuit, let's call it `MyCircuit`.
3. Define the input signal for your circuit.
4. Add any necessary witnesses and constraints for regex (learn more about how to setup regex [here](https://github.com/zkemail/zk-regex))
5. Define the output signal, which will be public.
6. Instantiate the **EmailVerifier** component within your `MyCircuit` template.

NOTE: For teams using the email verifier circuit with the `ignoreBodyHashCheck` option disabled, please be aware of an important consideration. If you are conducting a body hash check within your own circuit configurations, it is essential to implement `AssertZeroes` for all characters beyond the specified limit.

`AssertZeroPadding(maxBodyLength)(emailBody, emailBodyLength + 1)`

* **maxBodyLength**: maximum number of bytes that the email body can occupy.
* **emailBody**: email body content that has been padded to meet the required size for processing.
* **emailBodyLength**: length of the email body data including the padding.

Here's an example of how you can set up your own circuit:

```javascript
include "@zk-email/circuits/email-verifier.circom";
include "simple_regex.circom"

template MyCircuit() {
    signal input ...// inputs to your circuit

    // Witnesses and constraints for regex go here

    signal output ...// output that is public

    component emailVerifier = EmailVerifier(_<arguments>_)(_<inputs>_);
    
    signal (_<output1>_, _<output_array>_[_<array_length>_]) <== SimpleRegex(_<arguments>_)(_<inputs>_);
}
```

## Step 3: Compile your circuit

To compile the circuit locally, you need to have Rust and Circom installed first. You can visit this link to install both https://docs.circom.io/getting-started/installation/#installing-dependencies

```bash
circom -l node_modules MyCircuit.circom -o --r1cs --wasm --sym --c --O0
```

Note: You can add -l to specify the directory where the directive `include` should look for the circuits indicated. For our repo use `circom -l node_modules` instead of circom. Additionally, we generally recommend using the `--O0` flag for optimization during compilation for beginners. However, if you're more experienced with Circom, feel free to use the `--O1` flag instead. It's important to avoid using the `--O2` flag as that is the default setting and it may lead to the deletion of additional constraints.

After running this command, the circuit will be compiled into a `.r1cs` file, a `.wasm` file, and a `.sym` file. These files are used in the next steps to generate the proving and verifying keys, and to compute the witness.

## Step 4: Generate Circuit Inputs

The second step in the zkEmail verification process is to generate the necessary circuit inputs. This involves parsing the email headers to extract the required information.

The required information includes the RSA signature, public key,  body of the email, and hash of the email body. To do this, create a directory named 'emls' and place the raw email inside it.

Next, create an `inputs.ts` file. In this file, you will use the `generateEmailVerifierInputs` function from the `@zk-email/helpers` package.

Here is a sample code snippet from our [proof-of-twitter](https://github.com/zkemail/proof-of-twitter/blob/main/packages/circuits/helpers/generate-inputs.ts) example to guide you:

```typescript
import { bytesToBigInt, fromHex } from "@zk-email/helpers/dist/binaryFormat";
import { generateEmailVerifierInputs } from "@zk-email/helpers/dist/input-generators";

export const STRING_PRESELECTOR = "email was meant for @";
export type IExampleCircuitInputs = {
  twitterUsernameIndex: string;
  address: string;
  emailHeader: string[];
  emailHeaderLength: string;
  pubkey: string[];
  signature: string[];
  emailBody?: string[] | undefined;
  emailBodyLength?: string | undefined;
  precomputedSHA?: string[] | undefined;
  bodyHashIndex?: string | undefined;
};

export async function generateExampleVerifierCircuitInputs(
  email: string | Buffer,
  ethereumAddress: string
): Promise<ITwitterCircuitInputs> {
  const emailVerifierInputs = await generateEmailVerifierInputs(email, {
    shaPrecomputeSelector: STRING_PRESELECTOR,
  });

  const bodyRemaining = emailVerifierInputs.emailBody!.map((c) => Number(c)); // Char array to Uint8Array
  const selectorBuffer = Buffer.from(STRING_PRESELECTOR);
  const usernameIndex =
    Buffer.from(bodyRemaining).indexOf(selectorBuffer) + selectorBuffer.length;

  const address = bytesToBigInt(fromHex(ethereumAddress)).toString();

  return {
    ...emailVerifierInputs,
    twitterUsernameIndex: usernameIndex.toString(),
    address,
  };
}
```

To generate the `input.json` file, run the following command:

```bash
npx ts-node inputs.ts
```

Note: Increasing the `emailHeaderLength` or `emailBodyLength` sizes will increase the time required for compiling and creating proving keys.

## Step 5: Compute the Witness

The process of creating a proof involves ensuring that all signals in the file adhere to the existing constraints. This is achieved by computing the witness using the Wasm file generated during compilation.

Navigate to the MyCircuit\_js file and incorporate the input.json file that was produced in Step 2. Execute the following command in your terminal:

```
node generate_witness.js myCircuit.wasm input.json witness.wtns

```

This operation will produce a file named 'witness.wtns'. This file is encoded in a format that is compatible with the snarkjs library. In the following steps, we will utilize snarkJs to initiate the proof creation process.

## Step 6: Proving the Circuit

The next step involves using the `snarkjs` command-line tool to generate the keys and the verifier contract. If you haven't installed `snarkjs` globally, you can do so by running `npm install -g snarkjs`.

The generation of the zk proof requires a trusted setup, which includes the `powers of tau ceremony` and `phase 2`. Click [here](https://zkp2p.gitbook.io/zkp2p/developer/circuits/trusted-setup-ceremony/) to read more about Trusted Setup.

Firstly, you need to determine the constraint size of your circuit. You can do this by running the following command:

```bash
snarkjs r1cs info myCircuit.r1cs
```

### Memory Allocation for snarkjs

To avoid out-of-memory errors in `snarkjs` for large circuits, increase Node.js memory with `node --max-old-space-size=<size>`, where `<size>` is in kilobytes.

```
node --max-old-space-size=614400 ./../node_modules/.bin/snarkjs
```

### Powers of Tau

You can download the ptau file directly from Google Cloud Platform using the following command:

```
wget https://storage.googleapis.com/zkevm/ptau/powersOfTau28_hez_final_22.ptau
```

### Phase 2

To run Phase 2 of the trusted setup refer to this link: [https://github.com/iden3/snarkjs](https://github.com/iden3/snarkjs)

## Step 7: Verify your circuit

After this process you should get three files

* the proving key(vkey)
* proof.json
* public.json

You can use these files to verify your circuit.

### Off-chain Verification

To verify your proof run:

```bash
snarkjs groth16 verify verification_key.json public.json proof.json
```

The command uses the files verification\_key.json we exported earlier,proof.json and public.json to check if the proof is valid. If the proof is valid, the command outputs an OK.

### On-chain Verification

To create a solidity verifier that allows you to verify your proof on the ethereum blockchain, run:

```bash
snarkjs zkey export solidityverifier myCircuit_0001.zkey verifier.sol
```

This will generate a `verifier.sol` contract.
