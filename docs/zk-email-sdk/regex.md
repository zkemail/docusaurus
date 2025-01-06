---
title: Regex
sidebar_label: Regex
description: Learn how to create regex patterns for email verification in ZK Email.
keywords: [regex, email verification, pattern matching, field extraction, email parsing]
---

# Regex

ZK Email allows you to create zero-knowledge proofs of emails. You can define a **decomposed regex** to extract specific fields from an email (such as sender, recipient, subject, timestamps, etc.) while keeping the rest of the email private. 

This page will explain how regex works, how decomposed regex is used in ZK Email, common special characters, and provide template examples for popular email fields.

## What is Regex?

**Regex** (short for *regular expression*) is a sequence of characters that forms a search pattern. It is widely used to match or find strings in text. For example, you might use regex to find all email addresses in a long document, or to validate if a user’s input meets certain rules (e.g., format of a phone number).

A regular expression uses a combination of:
- **Literal characters** (e.g., letters, numbers, punctuation).
- **Metacharacters** (e.g., `^`, `$`, `(`, `)`, `?`, `+`, `*`, `[`, `]`, `{`, `}`, `|`, `\`).
- **Quantifiers** (e.g., `?`, `+`, `*`, `{m,n}`).
- **Character classes** (e.g., `[A-Za-z0-9]`, `[^a-z]`, `\s`).
- **Anchors** (e.g., `^` for start of string, `$` for end of string, `\b` for word boundary).

These building blocks allow you to define very patterns to search or extract substrings from text.

Examples:

- `[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}` - Matches email addresses. [Try out](https://regex101.com/r/NlTlk4/1).
- `^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$` - Matches US phone numbers. [Try out](https://regex101.com/r/QwP1va/1).
- `^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$` - Matches valid IP address octets (0-255). [Try out](https://regex101.com/r/E6ujVA/1).

### Decomposed Regex

For extracting specific fields from an email, a **decomposed regex** breaks a single regular expression into smaller, sequential parts. Instead of having one large and complex regex, ZK Email uses an array of parts definitions, each describing a consecutive part of the regex and visibility.

Each part in the decomposed regex includes:
- `isPublic`: a boolean indicating if this part of the match should be public or private in the final proof.
- `regexDef`: the portion of the regex pattern.

When these parts are combined in order, they form a complete pattern for matching. You can also find an example of a parts array from our [ZK Email Registry](https://registry.zk.email/dc963079-fe7d-4bcb-a4ed-c60ad7a93d2b/parameters#:~:text=parts).

:::info
If multiple matches are found in the email, only the first match will be used. Make sure your regex pattern is specific enough to uniquely identify the desired content.
:::

### Special Characters and Expressions

Two characters commonly used when dealing with multi-line text (such as emails) are:

- `\n` : Represents the **newline** character (line feed).
- `\r` : Represents the **carriage return** character.

Email headers often contain `\r\n` pairs to mark the end of lines. Depending on the email format, you might see these in the raw headers. In your regular expressions, you can match them explicitly by including `\r`, `\n`, or a combination like `(\r\n|^)` to anchor your pattern at the beginning of a line or match line breaks.

Here's a quick reference of commonly used regex special characters and expressions:

| Character / Expression| Description |
|-----------|-------------|
| `.` | Matches any character except newline |
| `^` | Start of string/line |
| `$` | End of string/line |
| `*` | 0 or more occurrences |
| `+` | 1 or more occurrences |
| `?` | 0 or 1 occurrence |
| `\w` | Word character [A-Za-z0-9_] |
| `\d` | Digit [0-9] |
| `\s` | Whitespace (space, tab, newline) |
| `[abc]` | Character class - matches a, b, or c |
| `[^abc]` | Negated class - matches anything except a, b, or c |
| `(...)` | Capturing group |
| `(?:...)` | Non-capturing group |
| `a{3}` | Exactly 3 occurrences of a |
| `a{3,}` | 3 or more occurrences of a |
| `a{3,6}` | Between 3 and 6 occurrences of a |
| `a\|b` | Alternation - matches a or b |

For an interactive regex tester and comprehensive reference, visit [regex101.com](https://regex101.com).


## Decomposed Regex Examples

Below are some common email fields you might want to extract. If you want to create your own email proof, please refer to our guide to [create a new blueprint](/zk-email-sdk/create-blueprint).

### Email Sender

Below is a decomposed regex that extracts the **email sender**, capturing the sender email address as public.

```json
[
  {
    "isPublic": false,
    "regexDef": "(\r\n|^)from:"
  },
  {
    "isPublic": false,
    "regexDef": "([^\r\n]+<)?"
  },
  {
    "isPublic": true,
    "regexDef": "[A-Za-z0-9!#$%&'\*\+\-/=\?\^_`{\|}~\.]+@[A-Za-z0-9\.-]+"
  },
  {
    "isPublic": false,
    "regexDef": ">?\r\n"
  }
]
```
### Email Recipient

Similar approach for the **email recipient**:

```json
[
  {
    "isPublic": false,
    "regexDef": "(\r\n|^)to:"
  },
  {
    "isPublic": false,
    "regexDef": "([^\r\n]+<)?"
  },
  {
    "is_public": true,
    "regex_def": "[a-zA-Z0-9!#$%&'\*\+\-/=\?\^_`{\|}~\.]+@[a-zA-Z0-9_\.-]+"
  },
  {
    "isPublic": false,
    "regexDef": ">?\r\n"
  }
]
```

### Email Subject

Capturing the **subject** line:

```json
[
  {
    "isPublic": false,
    "regexDef": "(\r\n|^)subject:"
  },
  {
    "isPublic": true,
    "regexDef": "[^\r\n]+"
  },
  {
    "isPublic": false,
    "regexDef": "\r\n"
  }
]
```

### Timestamp (from DKIM-Signature)

Capturing a **timestamp** from a DKIM-Signature header (denoted by `t=`):

```json
[
  {
    "isPublic": false,
    "regexDef": "(\r\n|^)dkim-signature:"
  },
  {
    "isPublic": false,
    "regexDef": "([a-z]+=[^;]+; )+t="
  },
  {
    "isPublic": true,
    "regexDef": "[0-9]+"
  },
  {
    "isPublic": false,
    "regexDef": ";"
  }
]
```
