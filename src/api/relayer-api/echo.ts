import { ApiClientProps, RequestParameter } from '../../components/ApiClient';

const echoRequestConfig: ApiClientProps = {
  endpoint: 'https://auth-base-sepolia-staging.prove.email/api/echo',
  method: 'GET',
  headers: {
    'Accept': 'text/plain'
  },
  parameters: [] as RequestParameter[],
  exampleResponse: {
    response: 'Hello, world!'
  },
  testMode: 'live',
  onTest: async () => {
    const response = await fetch('https://auth-base-sepolia-staging.prove.email/api/echo', {
      method: 'GET',
      headers: {
        'Accept': 'text/plain'
      }
    });
    const text = await response.text();
    return { response: text };
  }
};

export default echoRequestConfig;