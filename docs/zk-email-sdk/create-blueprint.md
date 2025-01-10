---
title: Create a new Blueprint | Registry
sidebar_label: Create a new Blueprint
description: Step-by-step guide to creating email verification blueprints in the ZK Email Registry, including pattern configuration, field extraction, and AI-assisted setup
keywords: [blueprint creation, email verification, pattern matching, regex configuration, field extraction, AI auto-extraction, DKIM verification, circuit parameters, proof generation, email parsing]
---

import DocCardList from '@theme/DocCardList';

# Create a new Blueprint

<Head>
  <link 
    rel="preload" 
    as="image" 
    href="/img/registry/create-blueprint.webp"
    fetchpriority="high"
  />
</Head>

The ZK Email Registry allows you to create email proofs. To create a new proof, first you need to create a blueprint. To start creating your blueprint you need to login with your GitHub account and navigate to the [ZK Email Registry](https://registry.zk.email/create/new).

:::info Prerequisites
To create a blueprint you need an .EML file. Learn how to get yours [here](/docs/zk-email-sdk/get-eml-file).
:::

## Blueprint Details

First, let's set up the basic information for your blueprint. Click the "Create Blueprint" button to start.

![Create Blueprint Step 1](/img/registry/create-blueprint.webp)

### Pattern Name
This is what users will see in the registry. Make it descriptive and clear.
```
Example: "Blueprint Name"
```

### Circuit Name
The technical name for your circuit. Must follow these rules:
- Use PascalCase
- No spaces or special characters
- No file extensions
```
Example: "BlueprintName"
```

### Slug
This is your URL identifier. It's automatically generated as:
```
{github-username}/{circuitName}
```

### Test Email Upload
Drop or upload a `.EML` file here. This is needed because:
- It's used to test your extraction patterns
- Powers the AI auto-extraction feature
- Helps validate your blueprint works

### Description
Write a clear explanation of what your blueprint proves. Keep it concise but informative.
```
Example: "Proof that you were confirmed for an event."
```

## Email Details

Now we will configure the query to find the email for creating the proof and setting the sender domain to be used for DKIM verification.

![Create Blueprint Step 2](/img/registry/create-blueprint-step2.webp)

### Email Query
The Gmail search query to find relevant emails. You can use any gmail query to find the email. More information [here](https://support.google.com/mail/answer/7190).
```
Example: "from:domain.com"
```
This query will be used when users try to generate proofs with their Gmail account.

### Sender Domain
The domain used for DKIM verification. Find this in the `d=` field of the DKIM-Signature header.
```
Example: "domain.com" (don't include @)
```

### Max Email Header Length
Sets the maximum size for email headers. Must be:
- A multiple of 64
- Large enough to fit your use email header
```
Example: 1024
```

### Skip body hash check
If you are trying to extract data purely from headers, you can enable this option. This option ignores the body of the email when generating the proof which is useful to reduce the number of constraints in the circuit.

## Field Extraction

This is where you define what data to extract from the email.

![Create Blueprint Step 3](/img/registry/create-blueprint-step3.webp)

### AI Auto-extraction
1. Write a description of the fields you want to extract (e.g., "Extract the user's name and order number")
2. Click "Generate Fields"
3. The AI will analyze your test email and populate the extraction fields automatically

### Fields to Extract
For each piece of data you want to extract:

1. **Field Name**: Give it a clear identifier
```
Example: "receiverName"
```

2. **Data Location**: Choose where to look:
   - `Body`: Email content
   - `Headers`: Email metadata

3. **Max Length**: Maximum characters for this field
```
Example: 64
```

4. **Regex Parts**: Define your extraction pattern:
```json
[
  {
    "isPublic": true,
    "regexDef": "[a-zA-Z0-9_]+"  // Matches username
  }
]
```

### External Inputs
For any additional data needed during verification:
1. Field Name
2. Maximum Length

## Example Blueprints

<DocCardList
  items={[
    {
      type: 'link',
      href: '/zk-email-sdk/proof-of-luma',
      label: 'Proof of Luma',
      description: 'Proof that you were confirmed for a Luma event',
    }
  ]}
/>