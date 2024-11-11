import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Deployed Contracts

These are the Base Sepolia and Sepolia addresses. The repository includes a compatible zkSync implementation.

Currently, we are waiting on our audit to deploy our ZK Sync addresses.

<Tabs>
  <TabItem value="base-sepolia" label="Base Sepolia">

| Contract name                | Address                                                                                                                                                                        |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| UserOverrideableDKIMRegistry | 0x1D2B1F8cF98382e53C7735F05ef84d51FEd8Eff6                                                                                                                                     |
| ECDSAOwnedDKIMRegistry (recovery.prove.email) | 0x172B71f22779363cAfa940102e9D5524Be7Df51f                                                                                                                    |
| ECDSAOwnedDKIMRegistry (multichain) | 0xB632E8a65f88387Fe57714648BAdb566AbB690Ae                                                                                                                             |
| Verifier                     | 0xb33AEBd0F8577EA3E1DA00546559ab812De51184                                                                                                                                     |
| EmailAuth                    | 0x5f8b92d28375A88eC77dd6C48611c16246d569B9                                                                                                                                     |
| RecoveryController(proxy) (recovery.prove.email) | 0x65838a66E46e9c5391abfc4bCe2f922196070568                                                                                                                 |
| RecoveryController(proxy) (multichain) | 0x12753947bd048a2a615cd7D4fb39FAa354FA23AE                                                                                                                          |
| SimpleWallet(impl)           | 0xD60a998398C2335B35B4a1df553bfF2C1a1E51A4                                                                                                                                     |

  </TabItem>
  <TabItem value="sepolia" label="Sepolia">

| Contract name                | Address                                    |
| ---------------------------- | ------------------------------------------ |
| UserOverrideableDKIMRegistry | 0x1D2B1F8cF98382e53C7735F05ef84d51FEd8Eff6 |
| ECDSAOwnedDKIMRegistry       | 0xB632E8a65f88387Fe57714648BAdb566AbB690Ae |
| Verifier                     | 0xb33AEBd0F8577EA3E1DA00546559ab812De51184 |
| EmailAuth                    | 0x5f8b92d28375A88eC77dd6C48611c16246d569B9 |
| RecoveryController(proxy)    | 0x12753947bd048a2a615cd7D4fb39FAa354FA23AE |
| SimpleWallet(impl)           | 0xD60a998398C2335B35B4a1df553bfF2C1a1E51A4 |

  </TabItem>
</Tabs>

You can additionally see our Account Recovery relayer's address at [0x9401296121FC9B78F84fc856B1F8dC88f4415B2e](https://base-sepolia.blockscout.com/address/0x9401296121FC9B78F84fc856B1F8dC88f4415B2e).
