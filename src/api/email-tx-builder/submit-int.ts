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
      default: '0x7b46a5DEf73fC75185090A839A28d177d2556626'
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
      default: 'Emit int {int}'
    },
    {
      name: 'commandParams',
      type: 'array',
      required: true,
      default: ['-123']
    },
    {
      name: 'templateId',
      type: 'string',
      required: true,
      default: '2'
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
      default: 'Emit an int'
    },
    {
      name: 'body',
      type: 'string',
      required: true,
      default: 'Emit a int -123'
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