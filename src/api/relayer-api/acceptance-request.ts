import { ApiClientProps, RequestParameter } from '../../components/ApiClient';

const acceptanceRequestConfig: ApiClientProps = {
  endpoint: "/api/acceptanceRequest",
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  parameters: [
    {
      name: "controller_eth_addr",
      type: "string",
      required: true,
      default: "0x0000000000000000000000000000000000000000"
    },
    {
      name: "guardian_email_addr",
      type: "string",
      required: true,
      default: "guardian@example.com"
    },
    {
      name: "account_code",
      type: "string",
      required: true,
      default: "0x0000000000000000000000000000000000000000000000000000000000000000"
    },
    {
      name: "template_idx",
      type: "number",
      required: true,
      default: 0
    },
    {
      name: "command",
      type: "string",
      required: true,
      description: "The command to execute",
      default: ""
    }
  ] as RequestParameter[],
  exampleResponse: {
    request_id: 12345,
    command_params: [
      {
        type: "string",
        value: "example_param"
      }
    ]
  },
  testMode: "live",
  onTest: async (data) => {
    const response = await fetch('/api/acceptanceRequest', {
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