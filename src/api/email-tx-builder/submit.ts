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
      default: '0xc3f15f5cc76a86f97ef8bc2d5070b6725d8992ce'
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
      name: 'commandTemplate',
      type: 'string',
      required: true,
      default: 'Emit string {string}'
    },
    {
      name: 'commandParams',
      type: 'array',
      required: true,
      default: ['hello']
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
    id: "fecfac34-3333-4cd3-bdaa-1b349aea0699",
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