import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "generic-relayer/api-reference/generic-relayer-api",
    },
    {
      type: "category",
      label: "UNTAGGED",
      items: [
        {
          type: "doc",
          id: "generic-relayer/api-reference/health-check",
          label: "Health check",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "generic-relayer/api-reference/submit-a-transaction",
          label: "Submit a transaction",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "generic-relayer/api-reference/get-transaction-status",
          label: "Get transaction status",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
