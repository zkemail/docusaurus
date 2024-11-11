import { ApiClientProps, RequestParameter } from '../../components/ApiClient';

const getAccountSaltConfig: ApiClientProps = {
  endpoint: 'https://auth-base-sepolia-staging.prove.email/api/getAccountSalt',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  parameters: [
    {
      name: 'account_code',
      type: 'string',
      required: true,
      default: '0x...'
    },
    {
      name: 'email_addr',
      type: 'string',
      required: true,
      default: 'email@example.com'
    }
  ] as RequestParameter[],
  exampleResponse: {
    account_salt: '0xabcdef1234567890...'
  },
  testMode: 'live',
  onTest: async (data) => {
    const response = await fetch('https://auth-base-sepolia-staging.prove.email/api/getAccountSalt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }
};

export default getAccountSaltConfig;
