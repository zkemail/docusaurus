---
hide_table_of_contents: true
---

import styles from '@site/src/components/TwoColumnLayout/two-column-layout.module.css';
import ApiClient from '@site/src/components/ApiClient';
import submitCommandConfig from '@site/src/api/ether-tx-auth/submit.ts';
import healthzConfig from '@site/src/api/ether-tx-auth/healthz.ts';
import statusConfig from '@site/src/api/ether-tx-auth/status.ts';

# API Reference

<div className={styles.twoColumnLayout}>
<div className={styles.leftColumn}>
The Generic Relayer API enables developers to integrate email-driven blockchain actions into their applications.

This API serves as the bridge between traditional email communication and blockchain transactions, allowing users to authorize and execute smart contract functions through email verification.
</div>
<div className={styles.rightColumn}>
</div>
</div>

## Submit Command

<div className={styles.twoColumnLayout}>
<div className={styles.leftColumn}>

### Request Parameters

`contractAddress` (string)

Address of your deployed smart contract containing the command.

---
`dkimContractAddress` (string)

Address of the `DKIMVerification` contract for email authentication.

---
`accountCode` (string)

A random `uint256` value used to derive the user's address from their email address using CREATE2.

---
`codeExistsInEmail` (boolean)

Include `accountCode` in the email body (`true` or `false`).

---
`functionAbi` (object)

ABI of the function to execute.

---
`commandTemplate` (string)

Command string as defined in your contract (e.g., `"Emit string {string}"`).

---
`commandParams` (array)

Parameters to fill into the command template.

---
`templateId` (string)

Unique identifier for the command template.

---
`remainingArgs` (array)

Additional arguments not included in the command template.

---
`emailAddress` (string)

Your email address where the command will be sent.

---
`subject` (string)

Subject line of the email.

---
`body` (string)

Body content of the email.

---
`chain` (string)

Blockchain network (e.g., `"sepolia"`).


### Response Fields

`message` (string)

A confirmation message indicating the email has been sent.

---
`request_id` (string)

A unique identifier for the request.

---
`status` (string)

The status of the request. Possible value: `"success"`.



</div>
<div className={styles.rightColumn}>

### Endpoint

```
POST https://relayer.zk.email/api/submit
```
<ApiClient {...submitCommandConfig} />



</div>
</div>

## Request Status

<div className={styles.twoColumnLayout}>
<div className={styles.leftColumn}>

### Request Parameters

`id` (string)

UUID of the request to check status for.

### Response Fields

`message` (string)

A message indicating the request status.

---
`request` (object)

An object containing details about the request, including:

- `id` (string): UUID of the request.
- `status` (string): Current status of the request. Possible values include "Finished" and others.
- `updatedAt` (string): ISO 8601 formatted timestamp of when the status was last updated.
- `emailTxAuth` (object): Original request details including:
  - `emailAddress`: Recipient email address
  - `subject`: Email subject
  - `body`: Email body content
  - `chain`: Blockchain network
  - `contractAddress`: Smart contract address
  - `dkimContractAddress`: DKIM contract address
  - `accountCode`: Account code
  - `codeExistsInEmail`: Boolean indicating if code exists in email
  - `functionAbi`: ABI of the executed function
  - `commandTemplate`: Original command template
  - `commandParams`: Parameters used in the command
  - `templateId`: Template ID
  - `remainingArgs`: Additional arguments

</div>
<div className={styles.rightColumn}>

### Endpoint

```
GET https://relayer.zk.email/api/status/:id
```

<ApiClient {...statusConfig} />

</div>
</div>

## Health Check

<div className={styles.twoColumnLayout}>
<div className={styles.leftColumn}>

### Response Fields

`message` (string)

A greeting message from the API.

---
`status` (string)

The status of the health check. Possible value: `"success"`.

</div>
<div className={styles.rightColumn}>

### Endpoint

```
GET https://relayer.zk.email/api/healthz
```

<ApiClient {...healthzConfig} />

</div>
</div>
