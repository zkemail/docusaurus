import { ApiClientProps, RequestParameter } from '../../components/ApiClient';

const statusConfig: ApiClientProps = {
  endpoint: 'https://relayer.zk.email/api/status/:id',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  },
  parameters: [
    {
      name: 'id',
      type: 'string',
      required: true,
      default: 'fecfac34-3333-4cd3-bdaa-1b349aea0699',
    }
  ] as RequestParameter[],
  exampleResponse: {
    "message": "request status",
    "request": {
      "emailTxAuth": {
        "accountCode": "0x22a2d51a892f866cf3c6cc4e138ba87a8a5059a1d80dea5b8ee8232034a105b7",
        "body": "Sending a hello world!",
        "chain": "sepolia",
        "codeExistsInEmail": true,
        "commandParams": [
          "testing"
        ],
        "commandTemplate": "Emit string {string}",
        "contractAddress": "0xefb56bb5771cde84f487391b6c0f9ff1694d2631",
        "dkimContractAddress": "0xc3f15f5cc76a86f97ef8bc2d5070b6725d8992ce",
        "emailAddress": "saul.garces09@gmail.com",
        "functionAbi": {
          "inputs": [
            {
              "components": [
                {
                  "type": "uint256"
                },
                {
                  "type": "bytes[]"
                },
                {
                  "type": "uint256"
                },
                {
                  "components": [
                    {
                      "type": "string"
                    },
                    {
                      "type": "bytes32"
                    },
                    {
                      "type": "uint256"
                    },
                    {
                      "type": "string"
                    },
                    {
                      "type": "bytes32"
                    },
                    {
                      "type": "bytes32"
                    },
                    {
                      "type": "bool"
                    },
                    {
                      "type": "bytes"
                    }
                  ],
                  "type": "tuple"
                }
              ],
              "internalType": "struct EmailAuthMsg",
              "name": "emailAuthMsg",
              "type": "tuple"
            },
            {
              "internalType": "address",
              "name": "owner",
              "type": "address"
            },
            {
              "internalType": "uint256",
              "name": "templateIdx",
              "type": "uint256"
            }
          ],
          "name": "emitEmailCommand",
          "outputs": [],
          "stateMutability": "nonpayable"
        },
        "remainingArgs": [
          {
            "Address": "0x9401296121fc9b78f84fc856b1f8dc88f4415b2e"
          },
          {
            "Uint": "0x0"
          }
        ],
        "subject": "Hello World",
        "templateId": "0x25d6c3eada7b2926c822bbfebfc3173123afb205cf093a8cae6622a56712f8a"
      },
      "id": "fecfac34-3333-4cd3-bdaa-1b349aea0699",
      "status": "Finished",
      "updatedAt": "2024-10-25T09:49:10.922319"
    }
  },
  testMode: 'live',
  onTest: async (data) => {
    const response = await fetch(`https://relayer.zk.email/api/status/${data.id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  }
};

export default statusConfig;