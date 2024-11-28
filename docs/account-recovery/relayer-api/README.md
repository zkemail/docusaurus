---
hide_table_of_contents: true
---

import styles from '@site/src/components/TwoColumnLayout/two-column-layout.module.css';
import ApiClient from '@site/src/components/ApiClient';
import echoRequestConfig from '@site/src/api/relayer-api/echo';
import requestStatusConfig from '@site/src/api/relayer-api/request-status';
import acceptanceRequestConfig from '@site/src/api/relayer-api/acceptance-request';
import recoveryRequestConfig from '@site/src/api/relayer-api/recovery-request';
import completeRequestConfig from '@site/src/api/relayer-api/complete-request';
import getAccountSaltConfig from '@site/src/api/relayer-api/get-account-salt';

# API Reference

<div className={styles.twoColumnLayout}>
<div className={styles.leftColumn}>
The Account Recovery Relayer API provides endpoints for managing account recovery and acceptance processes through email-based verification.
</div>
<div className={styles.rightColumn}>
</div>
</div>

## Echo

<div className={styles.twoColumnLayout}>
<div className={styles.leftColumn}>

### Request Parameters

No parameters required.

### Response Fields

`message` (string)

A simple greeting message returned by the API.

</div>
<div className={styles.rightColumn}>

### Endpoint

```
GET https://auth-base-sepolia-staging.prove.email/api/echo
```
<ApiClient {...echoRequestConfig} />

</div>
</div>

## Request Status

<div className={styles.twoColumnLayout}>
<div className={styles.leftColumn}>

### Request Parameters

`request_id` (number)

Unique identifier for the request to check status.

### Response Fields

`request_id` (number)

The ID of the request being checked.

---
`status` (string)

Current status of the request. Possible value: `"Pending"`.

---
`is_success` (boolean)

Whether the request has been successfully processed.

---
`email_nullifier` (string | null)

Nullifier value for the email, if available.

---
`account_salt` (string)

The salt value used for account creation, in hex format.

</div>
<div className={styles.rightColumn}>

### Endpoint

```
POST https://auth-base-sepolia-staging.prove.email/api/requestStatus
```

<ApiClient {...requestStatusConfig} />

</div>
</div>

## Acceptance Request

<div className={styles.twoColumnLayout}>
<div className={styles.leftColumn}>

### Request Parameters

`controller_eth_addr` (string)

Ethereum address of the controller initiating the acceptance.

---
`guardian_email_addr` (string)

Email address of the guardian involved in the acceptance process.

---
`account_code` (string)

Unique code associated with the account.

---
`template_idx` (number)

Index of the template to use for the acceptance command.

---
`command` (string)

The command to execute, specifying old and new owner addresses.

### Response Fields

`request_id` (number)

Unique identifier for the acceptance request.

---
`command_params` (array)

Array of command parameters used in the request.

</div>
<div className={styles.rightColumn}>

### Endpoint

```
POST https://auth-base-sepolia-staging.prove.email/api/acceptanceRequest
```

<ApiClient {...acceptanceRequestConfig} />

</div>
</div>

## Recovery Request

<div className={styles.twoColumnLayout}>
<div className={styles.leftColumn}>

### Request Parameters

`controller_eth_addr` (string)

Ethereum address of the controller initiating the recovery.

---
`guardian_email_addr` (string)

Email address of the guardian involved in the recovery process.

---
`template_idx` (number)

Index of the template to use for the recovery command.

---
`command` (string)

The command to execute for account recovery, specifying old and new owner addresses.

### Response Fields

`request_id` (string)

Unique identifier for the recovery request.

---
`subject_params` (object)

Contains parameters related to the subject of the request, such as `account_eth_addr`.

---
`status` (string)

The status of the recovery request. Possible value: `"success"`.

</div>
<div className={styles.rightColumn}>

### Endpoint

```
POST https://auth-base-sepolia-staging.prove.email/api/recoveryRequest
```

<ApiClient {...recoveryRequestConfig} />

</div>
</div>

## Complete Recovery Request

<div className={styles.twoColumnLayout}>
<div className={styles.leftColumn}>

### Request Parameters

`account_eth_addr` (string)

Ethereum address of the account being recovered.

---
`controller_eth_addr` (string)

Ethereum address of the controller completing the recovery.

---
`complete_calldata` (string)

Encoded calldata for completing the recovery transaction.

### Response Fields

`message` (string)

A message indicating the recovery completion status.

</div>
<div className={styles.rightColumn}>

### Endpoint

```
POST https://auth-base-sepolia-staging.prove.email/api/completeRequest
```

<ApiClient {...completeRequestConfig} />

</div>
</div>

## Get Account Salt Request

<div className={styles.twoColumnLayout}>
<div className={styles.leftColumn}>

### Request Parameters

`account_code` (string)

The unique code used to generate the account salt. A random number in the BN254 curve.

---
`email_addr` (string)

Email address associated with the account.

### Response Fields

`account_salt` (string)

The generated account salt in hex format.

</div>
<div className={styles.rightColumn}>

### Endpoint

```
POST https://auth-base-sepolia-staging.prove.email/api/getAccountSalt
```

<ApiClient {...getAccountSaltConfig} />

</div>
</div>