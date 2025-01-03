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
      default: '0x0000000000000000000000000000000000000000'
    },
    {
      name: 'accountCode',
      type: 'string',
      required: true,
      default: '0x1162ebff40918afe5305e68396f0283eb675901d0387f97d21928d423aaa0b10'
    },
    {
      name: 'codeExistsInEmail',
      type: 'boolean',
      required: true,
      default: false
    },
    {
      name: 'commandTemplate',
      type: 'string',
      required: true,
      default: 'Emit ethereum address {ethAddr}'
    },
    {
      name: 'commandParams',
      type: 'array',
      required: true,
      default: ['0x6956856464EaA434f22B42642e9089fF8e5C9cE9']
    },
    {
      name: 'templateId',
      type: 'string',
      required: true,
      default: '4'
    },
    {
      name: 'emailAddress',
      type: 'string',
      required: true,
      default: 'name@email.com'
    },
    {
      name: 'subject',
      type: 'string',
      required: true,
      default: 'Emit ethereum address'
    },
    {
      name: 'body',
      type: 'string',
      required: true,
      default: 'Emit a ethereum address 0x6956856464EaA434f22B42642e9089fF8e5C9cE9'
    },
    {
      name: 'chain',
      type: 'string',
      required: true,
      default: 'baseSepolia'
    }
  ] as RequestParameter[],
  exampleResponse: {
    id: "fecfac34-3333-4cd3-bdaa-1b349aea0699",
    message: "email sent",
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