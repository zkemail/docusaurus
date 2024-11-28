import { ApiClientProps, RequestParameter } from '../../components/ApiClient';

const acceptanceRequestConfig: ApiClientProps = {
  endpoint: "https://auth-base-sepolia-staging.prove.email/api/acceptanceRequest",
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  parameters: [
    {
      name: "controller_eth_addr",
      type: "string",
      required: true,
      default: "0x29a26b4f4fDA819415Ef2d93255998E8FF864066"
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
      default: "0x0115da5a2d274f63d10e5e839f08f37336c06828ac6b374ee3b13cacb6f7da43"
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
      default: "Recover account 0x8951B5df8Cddbdc5dCA967C96B7Fc38d19685478 from old owner 0x778c4f4ccd65A30A074441b9be6475f20de303d3 to new owner 0x6e8CdBE9CB9A90F75Fe4D5B2F08B9181b04f4Ea9"
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