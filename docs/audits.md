---
title: Audits
sidebar_label: Audits
description: Complete audit history of ZK Email's libraries, including reports from Matter Labs, Zellic, Ackee Blockchain, zksecurity, and Y Academy, with detailed fixes and improvements
keywords: [security audits, Matter Labs, Zellic, Ackee Blockchain, zksecurity, Y Academy, smart contract security, ZK circuits, DKIM verification, email recovery, security fixes, code improvements]
---

# Audits

### 2024 zk-regex and ZKsync update by Matter Labs

Matter Labs audited our zk-regex rewrite and ZKsync Solidity contracts in October 2024. The audit report is available below.

The following commits contain all fixes addressing the audit findings:

- Fixes committed at [9ed376](https://github.com/zkemail/zk-email-verify/tree/9ed3769dc3d96fb0d7c45f1f014dcd9bfb63675b) for zk-email-verify
- Fixes committed at [7002a2](https://github.com/zkemail/zk-regex/tree/7002a2179e076449b84e3e7e8ba94e88d0a2dc2f) for zk-regex
- Fixes committed at [984b59](https://github.com/zkemail/ether-email-auth/tree/984b5919a9be715b743b08863ab6471c2b5356a6) for ether-email-auth
- Fixes committed at [c866ec](https://github.com/zkemail/email-recovery/tree/c866ecb3dd326fe17850c61a9e38eb3db8a45695) for email-recovery
- Fixes committed at [a60eb9](https://github.com/zkemail/clave-email-recovery/tree/a60eb9877f47f80459eefcf4639a350c96a43393) for clave-email-recovery
- Fixes committed at [0327db](https://github.com/zkemail/ic-dns-oracle/tree/0327db9ac701a908139fcef2994cff8ed2d5533f) for ic-dns-oracle

<div style={{
  padding: "1rem",
  border: "1px solid #e0e0e0", 
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  width: "fit-content",
  cursor: "pointer"
}}>
  <a href="/files/matterlabs-zkemail-audit-report.pdf" download style={{
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    textDecoration: "none",
    color: "inherit"
  }}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" fill="currentColor"/>
    </svg>
    <span>Download Matter Labs Audit Report</span>
  </a>
</div>

### 2024 Email Transaction Builder Audit by Zellic

We completed an audit with Zellic of our Email Transaction Builder (previously known as Ether Email Auth) library in September 2024.

Fixes are merged on commit [38d9a4](https://github.com/zkemail/ether-email-auth/commit/38d9a4b96b75ce436157c31732bb759d3029f886) on ether-email-auth.

<div style={{
  padding: "1rem",
  border: "1px solid #e0e0e0", 
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  width: "fit-content",
  cursor: "pointer"
}}>
  <a href="/files/zkemail-zellic-audit-report.pdf" download style={{
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    textDecoration: "none",
    color: "inherit"
  }}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" fill="currentColor"/>
    </svg>
    <span>Download Zellic Audit Report</span>
  </a>
</div>


### 2024 Account Recovery Smart Contract Audit by Ackee

We completed an audit of our smart contracts for Account Recovery in July 2024.

- Fixes committed at [482d295](https://github.com/zkemail/email-recovery/pull/22) on [email-recovery](https://github.com/zkemail/email-recovery/).

<div style={{
  padding: "1rem",
  border: "1px solid #e0e0e0", 
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  width: "fit-content",
  cursor: "pointer"
}}>
  <a href="/files/ackee-blockchain-zkemail-email-recovery-report.pdf" download style={{
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    textDecoration: "none",
    color: "inherit"
  }}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" fill="currentColor"/>
    </svg>
    <span>Download Ackee Audit Report</span>
  </a>
</div>

### 2024 Audit by zksecurity

We completed a second audit in May 2024 of [all of our ZK circuits](https://github.com/zkemail/zk-email-verify), including our latest ZK regex rewrite. The audit deemed that EmailVerifier was safe, but people using sub-components in custom circuits may require extra changes and validations. We have fixed all of the high/medium issues, and you can see the full report here and use the fixed circuits via using version 6.1.1 from npm.

- Fixes committed at [95cd90](https://github.com/zkemail/zk-email-verify/commit/95cd90) for zk-email-verify
- Fixes committed at [5396ec](https://github.com/zkemail/zk-regex/commit/5396ec) for zk-regex

<div style={{
  padding: "1rem",
  border: "1px solid #e0e0e0", 
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  width: "fit-content",
  cursor: "pointer"
}}>
  <a href="/files/zk_email_zksecurity_audit.pdf" download style={{
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    textDecoration: "none",
    color: "inherit"
  }}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" fill="currentColor"/>
    </svg>
    <span>Download zksecurity Audit Report</span>
  </a>
</div>

### 2023 Audit by Y Academy

We completed our first audit on the [circom dependencies and helper templates](https://github.com/zkemail/zk-email-verify) in zk-email-verify. Below, you'll find a detailed PDF report of the findings. We've addressed each issue raised in the audit and have listed the corresponding PRs with each fix.

* Missing constraint for illegal characters: [PR#103](https://github.com/zkemail/zk-email-verify/pull/103)
* Incorrect use of division operation: [PR#104](https://github.com/zkemail/zk-email-verify/pull/104/commits/531f9c2b811cc06a935cb80a17311d28e3662871)
* Missing range checks for output signals: [PR#104](https://github.com/zkemail/zk-email-verify/pull/104/commits/9c14d51f130bb0cb0cf6eecb4945cbc5ff72f48a)
* Missing constraints for a signal input: [PR#104](https://github.com/zkemail/zk-email-verify/commit/4d4128c9980336d7f6dc0dcc7e1458203af15b4d)
* Missing constraints for output signals: [PR#104](https://github.com/zkemail/zk-email-verify/commit/4d4128c9980336d7f6dc0dcc7e1458203af15b4d)
* Issue with value retrieval in the LongToShortNoEndCarry: [PR#104](https://github.com/zkemail/zk-email-verify/pull/104)

<div style={{
  padding: "1rem",
  border: "1px solid #e0e0e0", 
  borderRadius: "8px",
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
  width: "fit-content",
  cursor: "pointer"
}}>
  <a href="/files/yacademy-zkemail-audit-report.pdf" download style={{
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    textDecoration: "none",
    color: "inherit"
  }}>
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z" fill="currentColor"/>
    </svg>
    <span>Download Y Academy Audit Report</span>
  </a>
</div>
