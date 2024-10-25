---
hide_table_of_contents: true
---

import styles from '@site/src/components/TwoColumnLayout/two-column-layout.module.css';

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

Random `uint256` value to create the SALT in the email body.

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
### Example Request

```bash
curl -X POST 'https://relayer.zk.email/api/submit' \
  -H 'Content-Type: application/json' \
  --data-raw '{
    "contractAddress": "<EMIT_EMAIL_COMMAND_ADDRESS>",
    "dkimContractAddress": "<DKIM_PROXY_ADDRESS>",
    "accountCode": "<ACCOUNT_CODE>",
    "codeExistsInEmail": <CODE_EXISTS_IN_EMAIL>,
    "functionAbi": <FUNCTION_ABI>,
    "commandTemplate": "<COMMAND_TEMPLATE>",
    "commandParams": <COMMAND_PARAMS>,
    "templateId": "<TEMPLATE_ID>",
    "remainingArgs": <REMAINING_ARGS>,
    "emailAddress": "<EMAIL_ADDRESS>",
    "subject": "<SUBJECT>",
    "body": "<BODY>",
    "chain": "<CHAIN>"
  }'
```

### Example Response

```json
{
  "message": "email sent",
  "request_id": "1ca65abb-f4bd-43b3-956b-36e075790090",
  "status": "success"
}
```

</div>
</div>
