---
title: Deployed Contracts | Account Recovery
sidebar_label: Deployed Contracts
description: Reference list of deployed smart contract addresses for account recovery system across Base, Base Sepolia, Sepolia, and ZKSync Era networks
keywords: [smart contracts, contract addresses, Base, Sepolia, ZKSync Era, account recovery, blockchain deployments, DKIM registry, verifier, recovery modules]
---

# Deployed Contracts

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
  <TabItem value="base" label="Base">
| Contract name | Address |
| ------------ | ------- |
| UserOverrideableDKIMRegistry | 0xf056FD259F8f8d6bEC3dE7B3436190Fd67e0dcDc |
| Verifier | 0xB771d12f3DAe6D1B22f0252Adfda07d7D81cFAD8 |
| EmailRecoveryUniversalFactory | 0x33B33bC730FD017Cc394B29047a7157f52896AA1 |
| UniversalEmailRecoveryModule | 0x36A470159F8170ad262B9518095a9FeD0824e7dD |
| EmailRecoveryCommandHandler | 0x8F2e57AA7dEE0EB75442C79beb348E1aeae10476 |
| EmailRecoveryFactory | 0xf0d68B9F085623b84C990c2c383990bcaad68C20 |
  </TabItem>

  <TabItem value="base-sepolia" label="Base Sepolia">
| Contract name | Address |
| ------------ | ------- |
| UserOverrideableDKIMRegistry | 0x1D2B1F8cF98382e53C7735F05ef84d51FEd8Eff6 |
| ECDSAOwnedDKIMRegistry | 0x172B71f22779363cAfa940102e9D5524Be7Df51f ([recovery.prove.email](https://recovery.prove.email))<br/>0x2e253775b0E1296b5180AE4F9908A9c6d92d9f6E (multichain) |
| Verifier | 0x0D5C8bcae3A3589F2CFbb04895933717aA5098e1 |
| EmailAuth | 0xCa4d16459b7AC7b348016244f1fA49d3f87b6F3F |
| RecoveryController(proxy) | 0x12753947bd048a2a615cd7D4fb39FAa354FA23AE |
| SimpleWallet(impl) | 0xD60a998398C2335B35B4a1df553bfF2C1a1E51A4 |
| SafeRecoveryCommandHandler | 0xdEaB753Bd5189A798d43E785bFB1b589468eA550 |
| SafeEmailRecoveryModule | 0x97c4063105AD22CF706C278e6015E4E93153432C |
  </TabItem>

  <TabItem value="sepolia" label="Sepolia">
| Contract name | Address |
| ------------ | ------- |
| UserOverrideableDKIMRegistry | 0x1D2B1F8cF98382e53C7735F05ef84d51FEd8Eff6 |
| ECDSAOwnedDKIMRegistry | 0x2e253775b0E1296b5180AE4F9908A9c6d92d9f6E |
| Verifier | 0x0D5C8bcae3A3589F2CFbb04895933717aA5098e1 |
| EmailAuth | 0xCa4d16459b7AC7b348016244f1fA49d3f87b6F3F |
| RecoveryController(proxy) | 0x12753947bd048a2a615cd7D4fb39FAa354FA23AE |
| SimpleWallet(impl) | 0xD60a998398C2335B35B4a1df553bfF2C1a1E51A4 |
| SafeRecoveryCommandHandler | 0xdEaB753Bd5189A798d43E785bFB1b589468eA550 |
| SafeEmailRecoveryModule | 0x97c4063105AD22CF706C278e6015E4E93153432C |
  </TabItem>

  <TabItem value="zksync" label="ZKSync Era">
| Contract name | Address |
| ------------ | ------- |
| UserOverrideableDKIMRegistry | 0x7C2e50e58cb6D94BbDa7dCec1aF7634003892aD9 |
| Verifier | 0xC261ba8f3A2219Cd15a463C605c3E272cf105E00 |
| EmailAuth | 0xFaCAd61572f4c7df60Eb951B875625cc29612f8B |
| RecoveryController(proxy) | 0x207A507c7824235D841348e0F204E883B27239A5 |
| SimpleWallet(impl) | 0xcB1938e736d54a09491B03D6680A3aedc3477c9E |
| ZkSyncCreate2Factory | 0x4a06245B0CD0cAE3968f0BD048196d610f53B6b2 |

**Missing Libraries**
| Library name | Address |
| ------------ | ------- |
| DecimalUtils | 0x718C17388E0A1b63788E80F789B03cdd8Df76060 |
| CommandUtils | 0x72971413eC4D6F4298C9E906f85a9f78a73773a5 |
| StringUtils | 0x888A8339fF7465DfE29BcC1f930B983C01a35C0a |
  </TabItem>
</Tabs>

You can additionally see our Account Recovery relayer's address at [0x9401296121FC9B78F84fc856B1F8dC88f4415B2e](https://base-sepolia.blockscout.com/address/0x9401296121FC9B78F84fc856B1F8dC88f4415B2e).