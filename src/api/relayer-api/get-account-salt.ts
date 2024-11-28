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
      default: '0115da5a2d274f63d10e5e839f08f37336c06828ac6b374ee3b13cacb6f7da43'
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

    return { account_salt: await response.text() };
  }
};

export default getAccountSaltConfig;
