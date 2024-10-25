import { ApiTesterProps, RequestParameter } from '../../components/ApiTester';

const submitCommandConfig: ApiTesterProps = {
  endpoint: 'https://relayer.zk.email/api/submit',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  parameters: [
    {
      name: 'contractAddress',
      type: 'string',
      required: true,
      default: '0x3E0E7F4fb89881d4936a40dC35895D2ce7802912'
    },
    {
      name: 'dkimContractAddress',
      type: 'string',
      required: true,
      default: '0xF45acb85a1130BC107E3BCe17C1B60c8FeA8beec'
    },
    {
      name: 'accountCode',
      type: 'string',
      required: true,
      default: '0x22a2d51a892f866cf3c6cc4e138ba87a8a5059a1d80dea5b8ee8232034a105b7'
    },
    {
      name: 'codeExistsInEmail',
      type: 'boolean',
      required: true,
      default: true
    },
    {
      name: 'functionAbi',
      type: 'object',
      required: true,
      default: {
        type: "function",
        name: "emitEmailCommand",
        inputs: [
          {
            name: "emailAuthMsg",
            type: "tuple",
            internalType: "struct EmailAuthMsg",
            components: [
              {
                name: "templateId",
                type: "uint256",
                internalType: "uint256"
              },
              {
                name: "commandParams",
                type: "bytes[]",
                internalType: "bytes[]"
              },
              {
                name: "skippedCommandPrefix",
                type: "uint256",
                internalType: "uint256"
              },
              {
                name: "proof",
                type: "tuple",
                internalType: "struct EmailProof",
                components: [
                  {
                    name: "domainName",
                    type: "string",
                    internalType: "string"
                  },
                  {
                    name: "publicKeyHash",
                    type: "bytes32",
                    internalType: "bytes32"
                  },
                  {
                    name: "timestamp",
                    type: "uint256",
                    internalType: "uint256"
                  },
                  {
                    name: "maskedCommand",
                    type: "string",
                    internalType: "string"
                  },
                  {
                    name: "emailNullifier",
                    type: "bytes32",
                    internalType: "bytes32"
                  },
                  {
                    name: "accountSalt",
                    type: "bytes32",
                    internalType: "bytes32"
                  },
                  {
                    name: "isCodeExist",
                    type: "bool",
                    internalType: "bool"
                  },
                  {
                    name: "proof",
                    type: "bytes",
                    internalType: "bytes"
                  }
                ]
              }
            ]
          },
          {
            name: "owner",
            type: "address",
            internalType: "address"
          },
          {
            name: "templateIdx",
            type: "uint256",
            internalType: "uint256"
          }
        ],
        outputs: [],
        stateMutability: "nonpayable"
      }
    },
    {
      name: 'commandTemplate',
      type: 'string',
      required: true,
      default: 'Emit string {string}'
    },
    {
      name: 'commandParams',
      type: 'array',
      required: true,
      default: ['testing']
    },
    {
      name: 'templateId',
      type: 'string',
      required: true,
      default: '0x25d6c3eada7b2926c822bbfebfc3173123afb205cf093a8cae6622a56712f8a'
    },
    {
      name: 'remainingArgs',
      type: 'array',
      required: true,
      default: [
        { "Address": "0x9401296121FC9B78F84fc856B1F8dC88f4415B2e" },
        { "Uint": "0x0" }
      ]
    },
    {
      name: 'emailAddress',
      type: 'string',
      required: true,
      default: 'email@example.com'
    },
    {
      name: 'subject',
      type: 'string',
      required: true,
      default: 'Hello World'
    },
    {
      name: 'body',
      type: 'string',
      required: true,
      default: 'Sending a hello world!'
    },
    {
      name: 'chain',
      type: 'string',
      required: true,
      default: 'sepolia'
    }
  ] as RequestParameter[],
  exampleResponse: {
    message: "email sent",
    request_id: "fecfac34-3333-4cd3-bdaa-1b349aea0699",
    status: "success"
  },
  testMode: 'live',
  onTest: async (data) => {
    const response = await fetch('https://relayer.zk.email/api/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }
};

export default submitCommandConfig;