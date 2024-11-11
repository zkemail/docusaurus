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
Explanation of the API.
</div>
<div className={styles.rightColumn}>
</div>
</div>

## Echo

<div className={styles.twoColumnLayout}>
<div className={styles.leftColumn}>

### Request Parameters

### Response Fields

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

### Response Fields

</div>
<div className={styles.rightColumn}>

### Endpoint

```
POST https://relayer.zk.email/api/requestStatus
```

<ApiClient {...requestStatusConfig} />

</div>
</div>

## Acceptance Request

<div className={styles.twoColumnLayout}>
<div className={styles.leftColumn}>

### Request Parameters

### Response Fields

</div>
<div className={styles.rightColumn}>

### Endpoint

```
POST https://relayer.zk.email/api/acceptanceRequest
```

<ApiClient {...requestStatusConfig} />

</div>
</div>

## Recovery Request

<div className={styles.twoColumnLayout}>
<div className={styles.leftColumn}>

### Request Parameters

### Response Fields

</div>
<div className={styles.rightColumn}>

### Endpoint

```
POST https://relayer.zk.email/api/recoveryRequest
```

<ApiClient {...recoveryRequestConfig} />

</div>
</div>

## Recovery Request

<div className={styles.twoColumnLayout}>
<div className={styles.leftColumn}>

### Request Parameters

### Response Fields

</div>
<div className={styles.rightColumn}>

### Endpoint

```
POST https://relayer.zk.email/api/recoveryRequest
```

<ApiClient {...recoveryRequestConfig} />

</div>
</div>

## Complete Recovery Request

<div className={styles.twoColumnLayout}>
<div className={styles.leftColumn}>

### Request Parameters

### Response Fields

</div>
<div className={styles.rightColumn}>

### Endpoint

```
POST https://relayer.zk.email/api/recoveryRequest
```

<ApiClient {...completeRequestConfig} />

</div>
</div>

## Get Account Salt Request

<div className={styles.twoColumnLayout}>
<div className={styles.leftColumn}>

### Request Parameters

### Response Fields

</div>
<div className={styles.rightColumn}>

### Endpoint

```
POST https://relayer.zk.email/api/getAccountSalt
```

<ApiClient {...getAccountSaltConfig} />

</div>
</div>