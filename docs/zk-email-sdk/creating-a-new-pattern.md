# Creating a New Pattern

A pattern is a customizable template that guides the system in how to handle and process email data. A pattern specifies:

* What information you want to extract from an email.
* How to locate this information within the email structure.
* Which parts of this information should be made public and which should remain private.

Think of a pattern as a set of instructions to follow when processing an email. It tells the system:

* Where to look in the email (header, body, etc.)
* What to look for (sender email, subject line, specific content, etc.)
* What to reveal and what to keep hidden

## Getting started

This guide will walk you through the step-by-step process of creating a new pattern using [ZK Email Registry](https://sdk.prove.email/).

If you face any challenge creating new Patterns, you can ask our GPT questions about creating new patterns: [GPT Link](https://chatgpt.com/g/g-wNBWHHSPV-zk-email-fields-to-extract-generator)

### Submitting a new Pattern&#x20;

<details>

<summary>Prerequisites</summary>

Before you begin you will need to have:

* An email `.eml` file that you want to create proofs for.

</details>

#### 1. Access the ZK Email Registry

First, visit the ZK Regex Registry at [https://sdk.prove.email/](https://sdk.prove.email/). This is where you'll submit your new pattern.

#### 2. Open the Pattern Creation Form

Look for click on the "Submit a new pattern" button. This will take you to the pattern creation form.

![Creating a new pattern form](/img/creating-a-new-pattern.webp)

#### 3. Fill in Pattern Details

You will need to provide some information about the pattern you want to create.

* **Pattern Title**: Provides a descriptive name for your pattern.
* **Description**: Explains what your pattern verifies.
* **Slug**: Creates a unique identifier for your pattern.
* **Tags**: Categorizes your pattern for easier searching and grouping.
* **Email Query**: Defines how to find relevant emails for your pattern. It is used to find emails directly from the Google inbox when using the SDK.

<details>

<summary>Email Query Examples</summary>

**Search by sender:**

```
from:example@test.com
```

This query will find emails sent by a specific email address.

**Search by subject:**

```
subject:"Account Verification"
```

This query will find emails with the exact phrase "Account Verification" in the subject line.

**Search by content:**

```
"Your verification code is"
```

This query will find emails containing the exact phrase "Your verification code is" in the body.

**Combine sender and subject:**

```
from:noreply@example.com subject:"Password Reset"
```

This query will find emails from noreply@example.com with "Password Reset" in the subject.

**Search for emails with attachments:**

```
from:billing@company.com has:attachment
```

This query will find emails from billing@company.com that have attachments.

**Search by date range:**

```
from:support@service.com after:2023/01/01 before:2023/12/31
```

This query will find emails from support@service.com sent during the year 2023.

**Search for unread emails:**

```
is:unread from:notifications@app.com
```

This query will find unread emails from notifications@app.com.

**Search by label:**

```
label:important from:boss@company.com
```

This query will find emails from boss@company.com that are labeled as important.

***

Remember to make your query as specific as possible to help narrow down the search and find the most relevant emails for your pattern.

</details>

* **Circuit Name**: Names the generated circuit for your pattern.
* **Skip Body Hash Check**: Determines whether to check the email body or just the headers.

<details>

<summary>When to use it?</summary>

Set this option to `true` if:

* All the information you need can be fully retrieved from the email headers.
* You don't need to verify any information in the email body.
* You want to optimize the proof generation process by reducing the amount of data to be processed.

Set this option to `false` if:

* You need to extract or verify information from the email body.
* You want to ensure the integrity of the entire email, including its body.

</details>

* **Email sender domain**: Represents the domain of the email sender in the email you're using for your pattern.
* **DKIM selector**: An optional parameter that defines the DKIM selector from your email header.
* **SHA Precompute Selector**: Identifies a unique string that precedes the extracted data in the email body.

<details>

<summary>Information</summary>

The main purposes of this field are:

1. To optimize the number of constraints in the circuit.
2. To reduce the computational resources required for proof generation.

**When to use?**

You should use the SHA Precompute Selector when:

* You need to extract information from the email body.
* You want to optimize the proof generation process, especially for large emails.
* The information you need to extract comes after a consistent, unique string in the email body.

</details>

* **Max Email Body Length:** Specifies the maximum number of characters that the SDK will process from the email body when generating zero-knowledge proofs.
* **Use new ZK Regex SDK for circuit generation**: Specifies whether to use the latest SDK version.
* **Fields to Extract**: Defines the specific pieces of information you want to extract from the email.

When defining fields to extract in your ZK Email pattern, you'll need to choose between two different formats: V1 and V2. Your choice depends on whether you've opted to use the new ZK Regex SDK for circuit generation.

If you've checked the box for "Use new ZK Regex SDK for circuit generation", you should use the V2 format.

<details>

<summary>V2 Usage</summary>

When using V2 of the SDK, you need to provide:

1. **Parts**: This is where the JSON needed by the [zk-regex SDK](https://github.com/zkemail/zk-regex) needs to be set. Here's an example:
   * `is_public`: Determines whether this part of the regex should be revealed in the public output.
   * `regex_def`: The regex definition for this part.

Example of a V2 field extraction:

```json
{
  "parts": [
    {
      "is_public": false,
      "regex_def": "email was meant for @"
    },
    {
      "is_public": true,
      "regex_def": "\w+"
    }
  ]
}
```

You can see the limited subset of regex that our zk-regex v2 compiler supports [here](https://github.com/zkemail/zk-regex). This example would extract a username from an email body that contains text like:

"This email was meant for @johndoe123"

</details>

If you are using the legacy compiler, then don't check this box to use the V1 format. We do not recommend this.

<details>

<summary>V1 Usage</summary>

When using V1 of the SDK, you need to provide:

1. **Regex**: The full regex pattern used to extract the values. Note that the vast majority of regex syntax is not supported in the V1 compiler, only [the grammar rules mentioned here](https://zkregex.com/min\_dfa). Example: `email: ([a-zA-Z0-9]|@|\.)+`
2. **Prefix Regex**: The regex pattern that can match the characters right before the field you are interested in. \
   \
   Example: Given the string "email: [test@zkemail.com](mailto:test@zkemail.com)", the prefix regex would be `email:` (with a space at the end).
3. **Reveal States**: This field will be provided from the regex tool UI. Example: `[[[22,1],[1,1]]]`

Example of a V1 field extraction:

```json
{
  "field_name": "SenderEmail",
  "data_location": "header",
  "regex": "From: ([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,})",
  "prefix_regex": "From: ",
  "reveal_states": [[[22,1],[1,1]]]
}
```

</details>

The V2 format, which uses the SDK, offers more granular control over what parts of the extracted information are public or private. It's generally recommended to use V2 if possible, as it represents the more current and flexible approach.

### After you Submit a Pattern

Once a pattern is submitted, it takes around 15 minutes for the circuit and the necessary keys to be created. However, what you can do is to immediately download the example project to test it out locally.

You will see a green tick on the registry home page when the circuit resources have been generated.
