import { ApiClientProps, RequestParameter } from '../../components/ApiClient';

const acceptanceRequestConfig: ApiClientProps = {
  endpoint: 'https://auth-base-sepolia-staging.prove.email/api/acceptanceRequest',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  parameters: [
    {
      name: 'controller_eth_addr',
      type: 'string',
      required: true,
      default: '0x...'
    },
    {
      name: 'guardian_email_addr',
      type: 'string',
      required: true,
      default: 'guardian@example.com'
    },
    {
      name: 'account_code',
      type: 'string',
      required: true,
      default: '0x...'
    },
    {
      name: 'template_idx',
      type: 'number',
      required: true,
      default: 0
    },
    {
      name: 'subject',
      type: 'string',
      required: true,
      default: 'Subject Template'
    }
  ] as RequestParameter[],
  exampleResponse: {
    request_id: 'fecfac34-3333-4cd3-bdaa-1b349aea0699',
    subject_params: {
      account_eth_addr: '0x...'
    },
    status: 'success'
  },
  testMode: 'live',
  onTest: async (data) => {
    const response = await fetch('https://auth-base-sepolia-staging.prove.email/api/acceptanceRequest', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }
};

export default acceptanceRequestConfig;
