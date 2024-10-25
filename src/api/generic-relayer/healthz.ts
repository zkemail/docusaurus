import { ApiTesterProps, RequestParameter } from '../../components/ApiTester';

const healthzConfig: ApiTesterProps = {
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