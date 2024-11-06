import { ApiClientProps, RequestParameter } from '../../components/ApiClient';

const requestStatusConfig: ApiClientProps = {
  endpoint: 'https://auth-base-sepolia-staging.prove.email/api/requestStatus',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  },
  parameters: [
    {
      name: 'request_id',
      type: 'string',
      required: true,
      default: ''
    }
  ] as RequestParameter[],
  exampleResponse: {
    status: 2,
    is_success: true,
    email_nullifier: '0x1234567890abcdef...',
    account_salt: '0xabcdef1234567890...'
  },
  testMode: 'live',
  onTest: async (data) => {
    const params = new URLSearchParams(data).toString();
    const response = await fetch(`https://auth-base-sepolia-staging.prove.email/api/requestStatus?${params}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    });
    return response.json();
  }
};

export default requestStatusConfig;
