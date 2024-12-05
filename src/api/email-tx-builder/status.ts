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
        "accountCode": "0x22a2d51a892f866cf3c6cc4e138ba87a8a5059a1d80dea5b8ee8232034a105b0",
        "body": "Sending a hello",
        "chain": "baseSepolia",
        "codeExistsInEmail": true,
        "commandParams": [
          "Hello"
        ],
        "commandTemplate": "Emit string {string}",
        "dkimContractAddress": "0x688b9f8ee489d5fde22819b1c2906d1403566836",
        "emailAddress": "suegamisora@gmail.com",
        "subject": "Hello",
        "templateId": "0x25d6c3eada7b2926c822bbfebfc3173123afb205cf093a8cae6622a56712f8a"
      },
      "id": "3fb8c30d-5004-4e3c-aa1f-d32407e740ad",
      "status": "Finished",
      "updatedAt": "2024-12-05T09:45:19.407908"
    },
    "response": {
      "commandParams": ["0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000548656c6c6f000000000000000000000000000000000000000000000000000000"],
      "proof": {
        "accountSalt": "0x063af3f23578fa141d9712dc52db0bc0b4cd1ccbad06c06001dc519d1f3fa834",
        "domainName": "gmail.com",
        "emailNullifier": "0x1b1288ca5d19ae51422bcb3d17c09369ef294551a596b306ad25417838d55e2b",
        "isCodeExist": true,
        "maskedCommand": "Emit string Hello",
        "proof": "0x02ebf92fbaad266a84e4168dee4657b41c230056ca2c8176584eb3ef2a4a10a02f212727586cfcefc9e61be75a939663248b69f6dc8d7bd9de0d6216c2e64a3a2852c1e39da6101ffc8439bc7d25ee0b5575d7220b1694f826fd3b49574835350f0fce11ecf02223ab7a814307a248e2ba417a02024cb4465f9b50a6e47e6c7c0c7246f4205ed2df1c358fe1ac51bf24c0213473632499d12393e599244b82c40998d555f96248848f0e38f18f528081c8059ceb36d4b88fa50031b1b2f9b8bf0d58d2710c09f7f8b046c77773c4c95ae4b324beb1c0a57d901595c8f4bd07193009afdbe60e998132924d5973c02ad6ec8780ff27202f661c99b528d73eb797",
        "publicKeyHash": "0x0ea9c777dc7110e5a9e89b13f0cfc540e3845ba120b2b6dc24024d61488d4788",
        "timestamp": 1733391958
      },
      "skippedCommandPrefix": 0,
      "templateId": "0x25d6c3eada7b2926c822bbfebfc3173123afb205cf093a8cae6622a56712f8a"
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