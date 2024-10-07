---
description: >-
  We have audited all of the code used in any zk-email mainnet deployments
  (zkp2p, email recovery). Contact us on t.me/zkemail if you are using any code
  that is not covered in these audits.
---

# Audits

### 2024 zk-regex and zksync update by Matter Labs

We are currently completing an audit of our zk-regex rewrite and our Solidity zksync deployments. Expected end date is mid October.

### 2024 Ether Email Auth Audit by Zellic

We completed an audit with Zellic of our Ether Email Auth library in September 2024.

Fixes are merged on commit [38d9a4](https://github.com/zkemail/ether-email-auth/commit/38d9a4b96b75ce436157c31732bb759d3029f886) on ether-email-auth.

### 2024 Account Recovery Smart Contract Audit by Ackee

We completed an audit of our smart contracts for Account Recovery in July 2024.

Fixes committed at [482d295](https://github.com/zkemail/email-recovery/pull/22) on [email-recovery](https://github.com/zkemail/email-recovery/).

### 2024 Audit by zksecurity

We completed a second audit in May 2024 of [all of our ZK circuits](https://github.com/zkemail/zk-email-verify), including our latest ZK regex rewrite. The audit deemed that EmailVerifier was safe, but people using sub-components in custom circuits may require extra changes and validations. We have fixed all of the high/medium issues, and you can see the full report here and use the fixed circuits via using version 6.1.1 from npm.

Fixes committed at [95cd90](https://github.com/zkemail/zk-email-verify/commit/95cd90) for zk-email-verify

Fixes committed at [5396ec](https://github.com/zkemail/zk-regex/commit/5396ec) for zk-regex

### 2023 Audit by Y Academy

We completed our first audit on the [circom dependencies and helper templates](https://github.com/zkemail/zk-email-verify) in zk-email-verify. Below, you'll find a detailed PDF report of the findings. We've addressed each issue raised in the audit and have listed the corresponding PRs with each fix.

* Missing constraint for illegal characters: [PR#103](https://github.com/zkemail/zk-email-verify/pull/103)
* Incorrect use of division operation: [PR#104](https://github.com/zkemail/zk-email-verify/pull/104/commits/531f9c2b811cc06a935cb80a17311d28e3662871)
* Missing range checks for output signals: [PR#104](https://github.com/zkemail/zk-email-verify/pull/104/commits/9c14d51f130bb0cb0cf6eecb4945cbc5ff72f48a)
* Missing constraints for a signal input: [PR#104](https://github.com/zkemail/zk-email-verify/commit/4d4128c9980336d7f6dc0dcc7e1458203af15b4d)
* Missing constraints for output signals: [PR#104](https://github.com/zkemail/zk-email-verify/commit/4d4128c9980336d7f6dc0dcc7e1458203af15b4d)
* Issue with value retrieval in the LongToShortNoEndCarry: [PR#104](https://github.com/zkemail/zk-email-verify/pull/104)
