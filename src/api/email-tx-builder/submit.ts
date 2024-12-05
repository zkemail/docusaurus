import { ApiClientProps, RequestParameter } from '../../components/ApiClient';

const submitCommandConfig: ApiClientProps = {
  endpoint: 'https://relayer.zk.email/api/submit',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  parameters: [
    {
      name: 'dkimContractAddress',
      type: 'string',
      required: true,
      default: '0x688b9f8Ee489D5fDE22819b1c2906d1403566836'
    },
    {
      name: 'accountCode',
      type: 'string',
      required: true,
      default: '0x22a2d51a892f866cf3c6cc4e138ba87a8a5059a1d80dea5b8ee8232034a105b0'
    },
    {
      name: 'codeExistsInEmail',
      type: 'boolean',
      required: true,
      default: true
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
      default: ['Hello']
    },
    {
      name: 'templateId',
      type: 'string',
      required: true,
      default: '0x25d6c3eada7b2926c822bbfebfc3173123afb205cf093a8cae6622a56712f8a'
    },
    {
      name: 'emailAddress',
      type: 'string',
      required: true,
      default: 'suegamisora@gmail.com'
    },
    {
      name: 'subject',
      type: 'string',
      required: true,
      default: 'Hello'
    },
    {
      name: 'body',
      type: 'string',
      required: true,
      default: 'Sending a hello'
    },
    {
      name: 'chain',
      type: 'string',
      required: true,
      default: 'baseSepolia'
    }
  ] as RequestParameter[],
  exampleResponse: {
    message: "email sent",
    id: "3fb8c30d-5004-4e3c-aa1f-d32407e740ad",
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