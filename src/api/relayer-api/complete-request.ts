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
      default: '0x8951B5df8Cddbdc5dCA967C96B7Fc38d19685478'
    },
    {
      name: 'controller_eth_addr',
      type: 'string',
      required: true,
      default: '0x29a26b4f4fDA819415Ef2d93255998E8FF864066'
    },
    {
      name: 'complete_calldata',
      type: 'string',
      required: true,
      default: '0x0000000000000000000000008951b5df8cddbdc5dca967c96b7fc38d1968547800000000000000000000000000000000000000000000000000000000000000400000000000000000000000000000000000000000000000000000000000000064e318b52b0000000000000000000000000000000000000000000000000000000000000001000000000000000000000000778c4f4ccd65a30a074441b9be6475f20de303d30000000000000000000000006e8cdbe9cb9a90f75fe4d5b2f08b9181b04f4ea900000000000000000000000000000000000000000000000000000000'
    }
  ] as RequestParameter[],
  exampleResponse: {
    message: 'Recovery completed'
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
