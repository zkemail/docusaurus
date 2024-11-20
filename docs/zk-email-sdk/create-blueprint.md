# Create a new Blueprint

<Head>
  <link 
    rel="preload" 
    as="image" 
    href="/img/registry/create-blueprint.webp"
    fetchpriority="high"
  />
</Head>

The ZK Email registry allows you to create email proofs. To create a new proof, first you need to create a blueprint.

## What is a blueprint?

A blueprint is a set of parameters that define the email proof. This parameters include the regex for extracting parts of the email, the size of the email header and body, the email sender and all the required fields. The registry uses these parameters to compile a circuit that can be used to generate proofs.

## Fields

After you are logged in with your Github Account, you will be able to click on the `Create Blueprint` button. And access the [blueprint creation page](https://registry.zk.email/create/new).

<img 
  src="/img/registry/create-blueprint.webp" 
  alt="Create Blueprint" 
  width="1200"
  height="600"
  loading="eager"
  decoding="async"
  fetchpriority="high"
  style={{
    width: '100%',
    display: 'block',
    margin: '20px auto',
    borderRadius: '17px',
    objectFit: 'contain',
    maxWidth: '100%',
    height: 'auto'
  }}
/>

To create a new blueprint, you will need to fill the following fields:

### Pattern Name

The Pattern Name is the name of the blueprint. It is used to identify the blueprint in the registry. 

:::info
Pattern Name: `Proof Of X Account`
:::

The name should be descriptive to facilitate the discovery of the blueprint.

### Circuit Name

The Circuit Name is the name of the circuit that will be generated for the blueprint. It is used to identify the circuit in the registry.

:::info
Circuit Name: `ProofOfXAccount`
:::

The name should follow the PascalCase convention, don't use spaces or special characters and don't have any extensions.

### Slug

The slug is the URL path of the blueprint. It is used to identify the blueprint in the registry. It is build from the user creating the blueprint and the Circuit Name.

:::info
Slug: `zkemail/proofOfXAccount`
:::

### Upload test .eml

This field is used to upload a .eml file to be used as the test case for the blueprint. It is used to verify that the blueprint is extracting the correct information and that the circuit would be able to create a proof for it.

With this .eml file, the registry also can help you generate the fields to extract using the integrated AI auto extract feature.

### Tags

Tags are used to categorize the blueprint. They are used to facilitate the discovery of the blueprint.

:::info
Tags: email, proof, x
:::

### Description

The description is used to provide a brief description of the blueprint. It is used to help the user understand the blueprint and its purpose.

:::info
Description: This blueprint allows you to prove that you own an X account by providing a .eml file that contains the email sent to the account.
:::

### Email Query

The email query is used to obtain the email from your google inbox. If you are trying to create a proof, you would be able to login with your google account and the registry will be able to access your inbox to extract the email.

You can use any valid [gmail query](https://support.google.com/mail/answer/7190) to obtain the email.

:::info
Email Query: `from: x.com`
:::

### Skip body hash check

If you check this option, the circuit will not check the email body. If you are trying to extract information from the email body, you should not check this option.

### Sender domain

The sender domain is the domain used for DKIM verification, found in the `d=` field of the DKIM-Signature header (only include the part after the `@` symbol). This may not exactly match the actual sender's domain.

:::info
Sender domain: `x.com`
:::

### Email Body Cutoff Value

This parameter defines a string value that will be used to cut off the email body before it. The circuit will only process the part of the email body that comes after this cutoff value. This helps reduce circuit constraints when you only need to match regex patterns near the end of long emails.

### Max Email Header Length

This parameter defines the maximum length of the email header. If the email header is longer than the value defined here, the circuit will not be able to create a proof for it. Must be a multiple of 64.

### Max Email Body Length

This parameter defines the maximum length of the email body. If the email body is longer than the value defined here, the circuit will not be able to create a proof for it. Must be a multiple of 64.

### Verifier Contract

This option allows you to select the chain on which the verifier contract will be deployed.

### AI auto extraction

After you upload the test .eml file, you can use the integrated AI auto extraction feature to help you generate the fields to extract.

To use this feature, you need to click on the `Generate Fields` button. And the registry will use the uploaded .eml file to help you generate the fields to extract.

### Fields to extract

This section defines the fields that will be extracted from the email. If you have not check the `Skip body hash check` option, you will can provide a regex for the email body.

You have fill the following fields:

- Fields Name: The name of the field to extract.
- Data Location: The location of the data to extract. You can select between `Body` and `Headers`.
- Max Length: The maximum length of the data to extract.
- Parts JSON: The parts JSON is a JSON array that defines the regex to extract the data.

```
[
  {
    "isPublic": false,
    "regexDef": "@"
  },
  {
    "isPublic": true,
    "regexDef": "[a-zA-Z0-9_]+"
  }
]
```

:::info
Some characters need to be escaped in the regex. For example, the `"` character needs to be escaped as `\"`. This way when the JSON is parsed, it is not confused with the JSON syntax.

Also all the regex reserved characters need to be escaped twice. For example, the `.` character needs to be escaped as `\\.`. One for the JSON parser and one for the regex engine.
:::
