---
hide_table_of_contents: true
---

import styles from '@site/src/components/TwoColumnLayout/two-column-layout.module.css';
import ApiClient from '@site/src/components/ApiClient';
import echoRequestConfig from '@site/src/api/relayer-api/echo';
import requestStatusConfig from '@site/src/api/relayer-api/request-status';
import acceptanceRequestConfig from '@site/src/api/relayer-api/acceptance-request';

# API Reference

<div className={styles.twoColumnLayout}>
<div className={styles.leftColumn}>
Explanation of the API.
</div>
<div className={styles.rightColumn}>
</div>
</div>

## Echo

<div className={styles.twoColumnLayout}>
<div className={styles.leftColumn}>

### Request Parameters

todo

### Response Fields

tod

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

<ApiClient {...requestStatusConfig} />

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

<ApiClient {...acceptanceRequestConfig} />

</div>
</div>
