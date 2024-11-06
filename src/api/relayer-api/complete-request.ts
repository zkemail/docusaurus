import { ApiClientProps, RequestParameter } from '../../components/ApiClient';

const completeRequestConfig: ApiClientProps = {
  endpoint: 'https://auth-base-sepolia-staging.prove.email/api/completeRequest',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  parameters: [
    {
      name: 'account_eth_addr',
      type: 'string',
      required: true,
      default: '0x...'
    },
    {
      name: 'controller_eth_addr',
      type: 'string',
      required: true,
      default: '0x...'
    },
    {
      name: 'complete_calldata',
      type: 'string',
      required: true,
      default: '0x...'
    }
  ] as RequestParameter[],
  exampleResponse: {
    status: 'success',
    message: 'Recovery completed successfully.'
  },
  testMode: 'live',
  onTest: async (data) => {
    const response = await fetch('https://auth-base-sepolia-staging.prove.email/api/completeRequest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }
};

export default completeRequestConfig;
