import { ApiClientProps, RequestParameter } from '../../components/ApiClient';

const requestStatusConfig: ApiClientProps = {
  endpoint: "/api/requestStatus",
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  parameters: [
    {
      name: "request_id",
      type: "number", 
      required: true,
      default: 0
    }
  ],
  exampleResponse: {
    request_id: 12345,
    status: 1,
    is_success: false,
    email_nullifier: "0x1234...",
    account_salt: "0xabcd..."
  },
  testMode: "live",
  onTest: async (data) => {
    const response = await fetch('/api/requestStatus', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }
};

export default requestStatusConfig;