import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "account-recovery/relayer-api/guardian-api-server",
    },
    {
      type: "category",
      label: "account",
      items: [
        {
          type: "doc",
          id: "account-recovery/relayer-api/request-status",
          label: "Request status",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "utility",
      items: [
        {
          type: "doc",
          id: "account-recovery/relayer-api/echo-endpoint",
          label: "Echo endpoint",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "UNTAGGED",
      items: [
        {
          type: "doc",
          id: "account-recovery/relayer-api/acceptance-request",
          label: "Acceptance request",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "account-recovery/relayer-api/recovery-request",
          label: "Recovery request",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "account-recovery/relayer-api/complete-recovery-request",
          label: "Complete recovery request",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "account-recovery/relayer-api/get-account-salt",
          label: "Get account salt",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "account-recovery/relayer-api/inactive-guardian",
          label: "Inactive guardian",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "account-recovery/relayer-api/receive-email",
          label: "Receive email",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Schemas",
      items: [
        {
          type: "doc",
          id: "account-recovery/relayer-api/schemas/requeststatusrequest",
          label: "RequestStatusRequest",
          className: "schema",
        },
        {
          type: "doc",
          id: "account-recovery/relayer-api/schemas/requeststatusresponse",
          label: "RequestStatusResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "account-recovery/relayer-api/schemas/acceptancerequest",
          label: "AcceptanceRequest",
          className: "schema",
        },
        {
          type: "doc",
          id: "account-recovery/relayer-api/schemas/acceptanceresponse",
          label: "AcceptanceResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "account-recovery/relayer-api/schemas/recoveryrequest",
          label: "RecoveryRequest",
          className: "schema",
        },
        {
          type: "doc",
          id: "account-recovery/relayer-api/schemas/recoveryresponse",
          label: "RecoveryResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "account-recovery/relayer-api/schemas/completerecoveryrequest",
          label: "CompleteRecoveryRequest",
          className: "schema",
        },
        {
          type: "doc",
          id: "account-recovery/relayer-api/schemas/completerecoveryresponse",
          label: "CompleteRecoveryResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "account-recovery/relayer-api/schemas/getaccountsaltrequest",
          label: "GetAccountSaltRequest",
          className: "schema",
        },
        {
          type: "doc",
          id: "account-recovery/relayer-api/schemas/getaccountsaltresponse",
          label: "GetAccountSaltResponse",
          className: "schema",
        },
        {
          type: "doc",
          id: "account-recovery/relayer-api/schemas/inactiveguardianrequest",
          label: "InactiveGuardianRequest",
          className: "schema",
        },
        {
          type: "doc",
          id: "account-recovery/relayer-api/schemas/inactiveguardianresponse",
          label: "InactiveGuardianResponse",
          className: "schema",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
