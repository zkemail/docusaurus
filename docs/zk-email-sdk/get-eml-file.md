---
title: Getting an .EML file | Registry
sidebar_label: Getting an .EML file
description: Learn how to obtain an .EML file, which is the starting point for creating email verification blueprints in the ZK Email Registry. This guide covers what an .EML file is, why it's needed, and how to export one from popular email clients.
keywords: [EML file, email verification, blueprint creation, RFC 5322, email export, Apple Mail, Microsoft Outlook, Gmail, Mozilla Thunderbird]
---

import DocCardList from '@theme/DocCardList';

# Getting an .EML file

Before you can create a blueprint, you need to get an .EML file. This file contains an email message in the format of the [RFC 5322](https://www.rfc-editor.org/rfc/rfc5322.html) standard and in the registry is used to test the [decomposed regex](/zk-email-sdk/regex#decomposed-regex) and auto-extract the email sender, header length, and body length.

## What is an .EML File?
An .EML file is a standard format for storing email messages. It contains all the components of an email, including headers, body text, and attachments. This format is widely supported and can be opened by most email clients and text editors.

## Gmail

1. Open the desired email in Gmail.
2. Click the three vertical dots (More options) icon in the top-right corner.
3. Select "Download message" from the dropdown menu.
4. The .eml file will automatically download to your computer.


## Apple Mail
Method 1:
1. Launch Apple Mail on your Mac.
2. Select the email you wish to export.
3. Click "File" in the menu bar, then choose "Save As".
4. In the save dialog, select "Raw Message Source" as the file format.
5. Rename the file with a .eml extension (e.g., "email_export.eml").
6. Click "Save" to download the .eml file.

Method 2 (Quick Drag-and-Drop):
1. Open Apple Mail and select the target email.
2. Drag and drop the email onto your desktop or any folder.
3. The email will automatically save as an .eml file.

## Microsoft Outlook

Web Version:
1. Open the email you want to export.
2. Click the three dots (More options) icon in the top-right corner.
3. Select "Save" from the dropdown menu.
4. The .eml file will automatically download to your computer.

Desktop Version:
1. Open the target email.
2. Click "File" in the top menu bar.
3. Select "Save As" and choose a location on your computer.
4. Ensure the file type is set to .eml or Outlook Message Format.
5. Click "Save" to download the .eml file.

## Proton Mail

Note that currently, Protonmail's desire for non-repudiation means that users are not empowered with enough cryptographic data from the email in order to verify DKIM themselves. We do not agree with the design, as we think users should be in control of their own cryptographic verification as much as possible, with an option to delete that data if they so choose. That means that currently, Protonmail users cannot use the [registry](/zk-email-sdk/registry) to prove emails they received, but they can send still emails to trigger on chain transactions (i.e. they can still use account recovery or email wallet).

1. Open the specific email you wish to export.
2. Click the three dots (More options) icon in the top-left corner of the email.
3. Select "Export" from the dropdown menu.
4. The email will automatically save as an .eml file.

## Yahoo Mail

We recommend following [this guide](https://support.microsoft.com/en-us/office/add-or-manage-a-yahoo-email-account-in-outlook-ff76dd33-3127-42ac-b93f-1da2dc9054c7#:~:text=Select%20File.-,Select%20%2B%20Add%20Account.,set%20up%20for%20this%20account) to add your yahoo account in Outlook and then follow the steps above for Microsoft Outlook.

## Next Steps

By following these instructions, you'll be able to obtain the necessary .EML files to proceed with creating email verification blueprints in the ZK Email Registry.

<DocCardList 
  items={[
    {
      type: 'link',
      href: '/zk-email-sdk/create-blueprint',
      label: 'Create Blueprint',
      description: 'Learn how to create a blueprint in the ZK Email Registry.',
    },
  ]}
/>
