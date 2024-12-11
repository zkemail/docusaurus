---
title: "@zk-email/circuits | ZK Email Verifier"
sidebar_label: "@zk-email/circuits"
description: Comprehensive documentation of the ZK Email circuits package, including EmailVerifier circuit, utility libraries, and helper components for email verification and data processing
keywords: [ZK Email circuits, EmailVerifier, RSA verification, SHA-256 hashing, base64 decoding, email masking, circuit libraries, Circom templates, zero-knowledge proofs, email processing]
---

# @zk-email/circuits

### Installation

```
yarn add @zk-email/circuits
```

### EmailVerifier Circuit

`EmailVerifier` is the primary circuit exported from `@zk-email/circuits` which is used for proving the signature of the input email is valid.

#### Usage:

Import to your circuit file like below.

```
include "@zk-email/circuits/email-verifier.circom";
```

*   **Parameters**:

    * `maxHeadersLength`: Maximum length for the email header.
    * `maxBodyLength`: Maximum length for the email body.
    * `n`: Number of bits per chunk the RSA key is split into. Recommended to be 121.
    * `k`: Number of chunks the RSA key is split into. Recommended to be 17.
    * `ignoreBodyHashCheck`: Set 1 to skip body hash check in case data to prove/extract is only in the headers.
    * `enableHeaderMasking`: Set to 1 to enable masking of the email header.
    * `enableBodyMasking`: Set to 1 to enable masking of the email body.
    * `removeSoftLineBreaks`: Set to 1 to remove soft line breaks from the email body (`=\r\n`).

    `Note`: We use these values for n and k because their product (n * k) needs to be more than 2048 (RSA constraint) and n has to be less than half of 255 to fit in a circom signal.
*   **Input Signals**:

    * `emailHeader[maxHeadersLength]`: Email headers that are signed (ones in `DKIM-Signature` header) as ASCII int[], padded as per SHA-256 block size.
    * `emailHeaderLength`: Length of the email header including the SHA-256 padding.
    * `pubkey[k]`: RSA public key split into k chunks of n bits each.
    * `signature[k]`: RSA signature split into k chunks of n bits each.
    * `emailBody[maxBodyLength]`: Email body after the precomputed SHA as ASCII int[], padded as per SHA-256 block size.
    * `emailBodyLength`: Length of the email body including the SHA-256 padding.
    * `bodyHashIndex`: Index of the body hash `bh` in the `emailHeader`.
    * `precomputedSHA[32]`: Precomputed SHA-256 hash of the email body till the bodyHashIndex.

    If `removeSoftLineBreaks` is enabled:
    * `decodedEmailBodyIn[maxBodyLength]`: The email body with soft line breaks removed, provided as input for validation.

    If `enableHeaderMasking` is enabled:
    * `headerMask[maxHeadersLength]`: A mask array for the email header, where each element is `1` (reveal) or `0` (hide).

    If `enableBodyMasking` is enabled:
    * `bodyMask[maxBodyLength]`: A mask array for the email body, where each element is `1` (reveal) or `0` (hide).

*   **Output Signals**:

    * `pubkeyHash`: Poseidon hash of the pubkey - Poseidon(n/2)(n/2 chunks of pubkey with k*2 bits per chunk).

    If `removeSoftLineBreaks` is enabled:
    * `decodedEmailBodyOut[maxBodyLength]`: The decoded email body with soft line breaks removed.

    If `enableHeaderMasking` is enabled:
    * `maskedHeader[maxHeadersLength]`: The masked email header after applying the `headerMask`.

    If `enableBodyMasking` is enabled:
    * `maskedBody[maxBodyLength]`: The masked email body after applying the `bodyMask`.

### **Libraries**

This section contains a template library located in the `@zk-email/circuits/lib` directory. These templates are important for building your main circuit (EmailVerifier).

These templates are used in the `EmailVerifier` circuit, and can also be used in a wide range of ZK projects, even those not directly related to ZK Email.

#### `lib/rsa.circom`

<details>

<summary>RSAVerifier65537: Verifies RSA signatures with exponent 65537.</summary>

* [**Source**](https://github.com/zkemail/zk-email-verify/blob/main/packages/circuits/lib/rsa.circom#L13-L39)
* **Parameters**
  * `n`: Number of bits per chunk the modulus is split into. Recommended to be 121.
  * `k`: Number of chunks the modulus is split into. Recommended to be 17.
* **Inputs**:
  * `message[k]`: The message that was signed.
  * `signature[k]`: The signature to verify.
  * `modulus[k]`: The modulus of the RSA key (pubkey).

</details>

#### `lib/sha.circom`

<details>

<summary>Sha256Bytes: Computes the SHA256 hash of input bytes.</summary>

* [**Source**](https://github.com/zkemail/zk-email-verify/blob/main/packages/circuits/lib/sha.circom#L17-L38)
* **Parameters**
  * `maxByteLength`: Maximum length of the input bytes.
* **Inputs**:
  * `paddedIn[maxByteLength]`: Message to hash padded as per the SHA256 specification.
  * `paddedInLength`: Length of the message in bytes including padding.
* **Output**:
  * `out[256]`: The 256-bit hash of the input message.

</details>

<details>

<summary>Sha256BytesPartial: Computes the SHA256 hash of input bytes with a precomputed state.</summary>

* [**Source**](https://github.com/zkemail/zk-email-verify/blob/main/packages/circuits/lib/sha.circom#L41-L79)
* **Parameters**
  * `maxByteLength`: Maximum length of the input bytes.
* **Inputs**:
  * `paddedIn[maxByteLength]`: Message to hash padded as per the SHA256 specification.
  * `paddedInLength`: Length of the message in bytes including padding.
  * `preHash[32]`: The precomputed state of the hash.
* **Output**:
  * `out[256]`: The 256-bit hash of the input message.

</details>

#### `lib/base64.circom`

<details>

<summary>Base64Decode: Decodes a base64 encoded string into binary data.</summary>

* [**Source**](https://github.com/zkemail/zk-email-verify/blob/main/packages/circuits/lib/base64.circom#L11-L61)
* **Inputs**:
  * `in`: The base64 encoded string to decode.
  * `N`: The expected length of the output binary data.
* **Outputs**:
  * `out`: The decoded binary data.

</details>

### Utils

This section provides an overview of utility circom templates available in the `@zk-email/circuits/utils` directory. These templates assist in the construction of zk circuits for various applications beyond the core ZK Email functionalities.

#### `utils/array.circom`

<details>

<summary>AssertZeroPadding: Asserts that the input array is zero-padded from the given `startIndex`.</summary>

* [**Source**](https://github.com/zkemail/zk-email-verify/blob/main/packages/circuits/utils/array.circom#L154-L172)
* **Parameters**:
  * `maxArrayLen`: The maximum number of elements in the input array.
* **Inputs**:
  * `in`: The input array.
  * `startIndex`: The index from which the array should be zero-padded.

</details>

<details>

<summary>ItemAtIndex: Selects an item at a given index from the input array.</summary>

* [**Source**](https://github.com/zkemail/zk-email-verify/blob/main/packages/circuits/utils/array.circom#L15-L42)
* **Parameters**:
  * `maxArrayLen`: The number of elements in the array.
* **Inputs**:
  * `in`: The input array.
  * `index`: The index of the element to select.
* **Output**:
  * `out`: The selected element.

</details>

<details>

<summary>CalculateTotal: Calculates the sum of an array.</summary>

* [**Source**](https://github.com/zkemail/zk-email-verify/blob/main/packages/circuits/utils/array.circom#L54-L67)
* **Parameters**:
  * `n`: The number of elements in the array.
* **Inputs**:
  * `nums`: The input array.
* **Output**:
  * `sum`: The sum of the input array.

</details>

<details>

<summary>SelectSubArray: Selects a subarray from an array given a `startIndex` and `length`.</summary>

* [**Source**](https://github.com/zkemail/zk-email-verify/blob/main/packages/circuits/utils/array.circom#L80-L104)
* **Parameters**:
  * `maxArrayLen`: The maximum number of bytes in the input array.
  * `maxSubArrayLen`: The maximum number of integers in the output array.
* **Inputs**:
  * `in`: The input byte array.
  * `startIndex`: The start index of the subarray.
  * `length`: The length of the subarray.
* **Output**:
  * `out`: Array of `maxSubArrayLen` size, items starting from `startIndex`, and items after `length` set to zero.

</details>

<details>

<summary>VarShiftLeft: Shifts input array by `shift` indices to the left.</summary>

* [**Source**](https://github.com/zkemail/zk-email-verify/blob/main/packages/circuits/utils/array.circom#L116-L140)
* **Parameters**:
  * `maxArrayLen`: The maximum length of the input array.
  * `maxOutArrayLen`: The maximum length of the output array.
* **Inputs**:
  * `in`: The input array.
  * `shift`: The number of indices to shift the array to the left.
* **Output**:
  * `out`: Shifted subarray.

</details>

#### `utils/bytes.circom`

<details>

<summary>PackBytes: Packs an array of bytes to numbers that fit in the field.</summary>

* [**Source**](https://github.com/zkemail/zk-email-verify/blob/main/packages/circuits/utils/bytes.circom#L28-L60)
* **Inputs**:
  * `in`: The input byte array.
  * `maxBytes`: The maximum number of bytes in the input array.
* **Outputs**:
  * `out`: The output integer array after packing.

</details>

<details>

<summary>PackByteSubArray: Selects a sub-array from the input array and packs it to numbers that fit in the field.</summary>

* [**Source**](https://github.com/zkemail/zk-email-verify/blob/main/packages/circuits/utils/bytes.circom#L72-L93)
* **Inputs**:
  * `in`: The input byte array.
  * `startIndex`: The start index of the sub-array.
  * `length`: The length of the sub-array.
  * `maxArrayLen`: The maximum number of elements in the input array.
  * `maxSubArrayLen`: The maximum number of elements in the sub-array.
* **Outputs**:
  * `out`: The output integer array after packing the sub-array.

</details>

<details>

<summary>DigitBytesToInt: Converts a byte array representing digits to an integer.</summary>

* [**Source**](https://github.com/zkemail/zk-email-verify/blob/main/packages/circuits/utils/bytes.circom#L102-L117)
* **Inputs**:
  * `in`: The input byte array - big-endian digit string of `out`.
  * `n`: The number of bytes in the input array.
* **Outputs**:
  * `out`: The output integer after conversion.

</details>

<details>

<summary>ByteMask: Applies a mask to a byte array to selectively reveal or hide bytes.</summary>

* **Parameters**:
  * `maxArrayLen`: The maximum length of the input array.
* **Inputs**:
  * `in[maxArrayLen]`: The input byte array.
  * `mask[maxArrayLen]`: The mask array, where each element is `1` (reveal) or `0` (hide).
* **Output**:
  * `out[maxArrayLen]`: The masked byte array after applying the mask.

</details>

#### `utils/constants.circom`

<details>

<summary>Constants: Defines a set of constants used across various circom circuits for standardizing sizes and lengths of different data types.</summary>

* [**Source**](https://github.com/zkemail/zk-email-verify/blob/main/packages/circuits/utils/constants.circom)
* **Constants**:
  * `EMAIL_ADDR_MAX_BYTES()`: Returns the maximum byte size for an email, defined as 256.
  * `DOMAIN_MAX_BYTES()`: Returns the maximum byte size for a domain, defined as 255.
  * `MAX_BYTES_IN_FIELD()`: Returns the maximum number of bytes that can fit in a field, defined as 31.

</details>

#### `utils/functions.circom`

<details>

<summary>log2Ceil: Calculates the ceiling of the base 2 logarithm of a given number.</summary>

* [**Source**](https://github.com/zkemail/zk-email-verify/blob/main/packages/circuits/utils/functions.circom#L2-L10)
* **Inputs**:
  * `a`: The input number for which the base 2 logarithm ceiling is to be calculated.
* **Outputs**:
  * Returns the smallest integer greater than or equal to the base 2 logarithm of the input number.

</details>

#### `utils/hash.circom`

<details>

<summary>PoseidonLarge: Circuit to calculate Poseidon hash of inputs more than 16.</summary>

* [**Source**](https://github.com/zkemail/zk-email-verify/blob/main/packages/circuits/utils/hash.circom#L13-L37)
* **Inputs**:
  * `in[chunkSize]`: The input array of chunkSize elements.
  * `bytesPerChunk`: Number of bits in each chunk.
  * `chunkSize`: Number of chunks in input.
* **Outputs**:
  * `out`: Poseidon hash of input where consecutive elements are merged.

</details>

#### `utils/regex.circom`

<details>

<summary>SelectRegexReveal: Selects the reveal part of a byte array that matches a regular expression.</summary>

* [**Source**](https://github.com/zkemail/zk-email-verify/blob/main/packages/circuits/utils/regex.circom#L15-L50)
* **Inputs**:
  * `in`: The input byte array.
  * `startIndex`: The index of the start of the reveal part in the input array.
  * `maxArrayLen`: The maximum length of the input array.
  * `maxRevealLen`: The maximum length of the reveal part.
* **Outputs**:
  * `out`: The revealed data array that matches the regular expression.

</details>

<details>

<summary>PackRegexReveal: Packs the reveal data from a regex match into an integer array.</summary>

* [**Source**](https://github.com/zkemail/zk-email-verify/blob/main/packages/circuits/utils/regex.circom#L60-L77)
* **Inputs**:
  * `in`: The input byte array.
  * `startIndex`: The index of the start of the reveal part in the input array.
  * `maxArrayLen`: The maximum length of the input array.
  * `maxRevealLen`: The maximum length of the reveal part.
* **Outputs**:
  * `out`: The packed integer array after processing the reveal data.

</details>

### Helpers

This section contains helper circom templates in `@zk-email/circuits/helpers` that you can use to build on top of ZK Email.

#### `helpers/email-nullifier.circom`

<details>

<summary>EmailNullifier: Calculates the email nullifier using Poseidon hash.</summary>

* [**Source**](https://github.com/zkemail/zk-email-verify/blob/main/packages/circuits/helpers/email-nullifier.circom#L15-L23)
* **Parameters**:
  * `bitPerChunk`: The number of bits per chunk the signature is split into.
  * `chunkSize`: The number of chunks the signature is split into.
* **Inputs**:
  * `signature[chunkSize]`: The signature of the email.
* **Output**:
  * `out`: The email nullifier.

</details>

#### `helpers/remove-soft-line-breaks.circom`

<details>

<summary>RemoveSoftLineBreaks: Removes soft line breaks from the email body.</summary>

* **Parameters**:
  * `maxBodyLength`: The maximum length of the email body.
* **Inputs**:
  * `encoded[maxBodyLength]`: The email body with potential soft line breaks.
* **Outputs**:
  * `decoded[maxBodyLength]`: The email body with soft line breaks removed.
  * `isValid`: A signal indicating whether the decoding was successful (`1` for valid, `0` for invalid).

</details>

### Additional Notes

- **Constraint Counts**: The inclusion of new functionalities like masking and soft line break removal may increase the number of constraints in the circuit. Be mindful of these when designing proofs and verifying performance.
- **Padding Requirements**: The circuit includes assertions to ensure that `maxHeadersLength` and `maxBodyLength` are multiples of 64, which aligns with SHA-256 padding requirements.
- **Security Considerations**: When using masking and data processing features, ensure that they are applied correctly to maintain data integrity and privacy. Misuse could lead to unintended data exposure or verification failures.
