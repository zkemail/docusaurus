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
      "body": {
        "accountCode": "0x22a2d51a892f866cf3c6cc4e138ba87a8a5059a1d80dea5b8ee8232034a105b7",
        "body": "Sending a hello world!",
        "chain": "sepolia",
        "codeExistsInEmail": true,
        "commandParams": [
          "testing"
        ],
        "commandTemplate": "Emit string {string}",
        "dkimContractAddress": "0xc3f15f5cc76a86f97ef8bc2d5070b6725d8992ce",
        "emailAddress": "saul.garces09@gmail.com",
        "subject": "Hello World",
        "templateId": "0x25d6c3eada7b2926c822bbfebfc3173123afb205cf093a8cae6622a56712f8a"
      },
      "id": "fecfac34-3333-4cd3-bdaa-1b349aea0699",
      "status": "Finished",
      "updatedAt": "2024-10-25T09:49:10.922319"
    },
    "response": {
      "commandParams": ["testing"],
      "proof": {
        "accountSalt": "0x200ab4951e3c39b9d18aa3a1dd748cc206bdf7f4999144e5a2c71fabd0537af1",
        "domainName": "gmail.com",
        "emailNullifier": "0x1a42242555497b62392f2014b870f835457d7ae1b716fd97d450dc165afc5735",
        "isCodeExist": true,
        "maskedCommand": "Emit string testing",
        "proof": "0x0f16aaeb277a54df949ee0d45d0491e217f25f34978fb73c2ea3144760e82c4a07989727817c3bd10c27ff95e433f8d5380acad49dfeb4f33fc3ed51957374002e0e5c5eae18020490eadec7cac9aad6c506e9482505f063b415727505c0cfc4070f4e63861b7b4537110abc6fd9885b2602a8fb3d20d2d3035bc0567b2990432da6b496db80ec7cd3e0b536d94435d630cc97202ca2c52e12fba461161467f520e867a828aefd6c475b8eff3c4ac498df71c4bd5c76d98e58725466187f619919ddab697ec82137ace83a839d99d546a8dc19cd39841ff9bc0643811f06b223193422e74b11400182918765c113562923ce253e284a44d53ef3e87a2724de43",
        "publicKeyHash": "0x0ea9c777dc7110e5a9e89b13f0cfc540e3845ba120b2b6dc24024d61488d4788",
        "timestamp": 1732900210
      },
      "skippedCommandPrefix": 0,
      "templateId": "0x9ae58060cafdc716d62eb92ebffbf508650995f1d5aa69c9e2910ed4858d82b2"
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