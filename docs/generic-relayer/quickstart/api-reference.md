---
hide_table_of_contents: true
---

import styles from '@site/src/components/TwoColumnLayout/two-column-layout.module.css';
import ApiTester from '@site/src/components/ApiTester';
import submitCommandConfig from '@site/src/api/generic-relayer/submit.ts';

# API Reference

Welcome to the API reference. Here you'll find detailed information about our API endpoints.

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

</div>
<div className={styles.rightColumn}>

### Endpoint

```
POST https://relayer.zk.email/api/submit
```
<ApiTester {...submitCommandConfig} />



</div>
</div>
