Email tx auth

email creates the tx and the tx is authenticated with the email

the architecture has EmailAuth.sol that has commands

a command is a definition of a function that can be called by the email

you need to create a contract and the EmailAuth.sol with the commands you want to use and then deploy the contract to the network you want to use it on

Api call payload:

`contractAddress` is the target contract address that has the command
`dkimContractAddress` is the address of the
`accountCode` is the CREATE2() code that is used to generate the account address
`codeExistsInEmail` do you want to include the code in the email body
`functionAbi` the target function contract that you want to hit is the entire abi EmailAuthMessage
`commandTamplate` is one of the commands that you have defined in the EmailAuth.sol contract
`commandParams` is the arguments to fill the command template with
`commandIndex` is the index of the command in the EmailAuth.sol contract
`templateId` is the command template id that you have defined in the EmailAuth.sol contract
    if i have 5 commands abcde the index of b is 2 but the id would be uint256
`remaningArgs` (is a emailauth message) those are the remaining arguments that are not used in the command template
`emailAddress` is the email sender
`subject` is the subject of the email
`body` is the body of the email
`chain` is the name of the chain

Flow

for 
```
{
  "contractAddress": "0xec3a1eAD94BDc7527Aa807B97Ff7E3A2cBCbC75f",
  "dkimContractAddress": "0x0a3921e8Bb2d682f92a39cB006b77AEc8939d1B9",
  "accountCode": "0x22a2d51a892f866cf3c6cc4e138ba87a8a5059a1d80dea5b8ee8232034a105b7",
  "codeExistsInEmail": true,
  "functionAbi": abi
  "commandTemplate": "Emit string {string}",
  "commandParams": ["testing"],
  "templateId": "0x25d6c3eada7b2926c822bbfebfc3173123afb205cf093a8cae6622a56712f8a",
  "remainingArgs": [
    { "Address": "0x9401296121FC9B78F84fc856B1F8dC88f4415B2e" },
    { "Uint": "0x0" }
  ],
  "emailAddress": "bisht.s.aditya@gmail.com",
  "subject": "Testing",
  "body": "Testing",
  "chain": "baseSepolia"
}
```
a user will recieve an email command "Emit string testing"

**explanation of the architecture**
