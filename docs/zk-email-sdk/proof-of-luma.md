---
title: Proof of Luma | Registry
sidebar_label: "Proof of Luma"
description: Learn how to create a zero-knowledge proof of Luma event registration using email verification in the ZK Email Registry
keywords: [luma events, event registration, email verification, zero knowledge proofs, zk email, proof generation, event confirmation, registration proof, luma proof]
---


# Example: Proof of Luma

In this guide, we'll walk you through creating a new blueprint in the ZK Email Registry to prove registration confirmation for Luma events. You'll learn how to set up the blueprint details, configure the email query, define data extraction fields using regex, and test the blueprint with a sample email.

:::note Prerequisites
- GitHub account 
- Example .EML file ([download here](/files/emls/proof-of-luma.eml))
:::

## Set Up Basic Information

Start by filling in the basic blueprint details:

- **Pattern Name**: `Proof Of Luma`
- **Circuit Name**: `ProofOfLuma` 
- **Slug**: Auto-generated as `{your-username}/ProofOfLuma`
- **Upload test .EML**: Use the example .EML file downloaded earlier
- **Description**: `Prove that you received a registration confirmation for a Luma event`

Click **Next** to proceed.

![Create Blueprint Step 1](/img/registry/proof-of-luma/step1.webp)

## Configure Email Query

Next, configure the Email Query to find the relevant .EML files from your Gmail inbox:

- **Email Query**: `from:user.luma-mail.com subject:"Registration confirmed"`
- **Sender Domain**: `user.luma-mail.com`
- **Max Email Header Length**: `1024` 
- **Skip body hash check**: `Yes` (reduces circuit constraints since we only need header data)

![Create Blueprint Step 2](/img/registry/proof-of-luma/step2.webp)

Click **Next** to continue.

## Set Up Field Extraction

Now it's time to configure field extraction using regex:

1. Click `add values to extract`
2. Input `event` as the fieldName 
3. Choose Email Header as the data location
4. Add 3 regex parts:
   - `(\r\n|^)subject:Registration confirmed for ` (private field)
   - `[^\r\n]+` (public field)
   - `\r\n` (private field)

![Create Blueprint Step 3](/img/registry/proof-of-luma/step3.webp)

After adding the regex parts, you should see the event name extracted from the email. Then click **Submit Blueprint** to compile the blueprint.

![Create Blueprint Step 4](/img/registry/proof-of-luma/step4.webp)

## Test the Blueprint

Navigate to the [**compiled blueprint**](https://registry.zk.email/dc963079-fe7d-4bcb-a4ed-c60ad7a93d2b) and upload a test .EML file from Luma containing a registration confirmation email to verify the extraction works correctly.

And that's it! You've successfully created a Proof of Luma blueprint to prove event registration confirmation. Happy proving!



