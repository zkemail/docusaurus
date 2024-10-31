import { ApiClientProps, RequestParameter } from '../../components/ApiClient';

const healthzConfig: ApiClientProps = {
  endpoint: 'https://relayer.zk.email/api/healthz',
  method: 'GET',
  headers: {
    'Content-Type': 'application/json'
  },
  parameters: [] as RequestParameter[],
  exampleResponse: {
    message: 'Hello from ZK Email!',
    status: 'success'
  },
  testMode: 'live',
  onTest: async () => {
    const response = await fetch('https://relayer.zk.email/api/healthz', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  }
};

export default healthzConfig;