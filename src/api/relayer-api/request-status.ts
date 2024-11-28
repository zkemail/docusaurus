import { ApiClientProps, RequestParameter } from '../../components/ApiClient';

const requestStatusConfig: ApiClientProps = {
  endpoint: "https://auth-base-sepolia-staging.prove.email/api/requestStatus",
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  parameters: [
    {
      name: "request_id",
      type: "number", 
      required: true,
      default: 3641160587
    }
  ],
  exampleResponse: {
    request_id: 3641160587,
    status: "Pending",
    is_success: false,
    email_nullifier: "null",
    account_salt: "0x18bd7926ed1e2b026aafb3a7c540ff2af37733f8c12005a36e565ba99a9a091e"
  },
  testMode: "live",
  onTest: async (data) => {
    const response = await fetch('https://auth-base-sepolia-staging.prove.email/api/requestStatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    console.log(response);
    return response.json();
  }
};

export default requestStatusConfig;