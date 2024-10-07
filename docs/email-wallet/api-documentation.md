# API Documentation

## Relayer API Documentation

### Environment Setup

Ensure you have a `.env` file or other definition with your chosen relayer endpoint. We have provided a sample one here.

```
RELAYER_API_URL=https://relayerapi.emailwallet.org
```

When you want more flexibility, you can deploy your own relayer via the [Relayer Infrastructure](relayer-infrastructure.md).

### Core API Endpoints

These endpoints concern basic universal features like sending ERC20s and ERC721s. You can see how to hit this or staging APIs for [account recovery](../account-recovery/relayer-api.md) or [oauth login](../login-with-zk-email-oauth-api.md) in those specific docs. For safe signers, simply adding an email wallet address to a Safe Wallet on Base Sepolia will automatically trigger the [email-based signer](https://prove.email/docs/2fa) flow -- to make that multichain, please reach out to the team.

#### Create Account

**Endpoint:**

```
POST /api/createAccount
```

**Request Body:**

```json
{
  "email_addr": "user@example.com"
}
```

**Example:**

```typescript
const createAccount = async (email) => {
  const response = await fetch(`${RELAYER_API_URL}/api/createAccount`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email_addr: email }),
  });
  const textResponse = await response.text();
  console.log("Parsed response:", textResponse);
  return textResponse != "0x" ? textResponse : "";
};

createAccount('user@example.com')
  .then(address => console.log('Account Address:', address))
  .catch(error => console.error('Error:', error));
```

#### Check if Account is Created

**Endpoint:**

```
POST /api/isAccountCreated
```

**Request Body:**

```json
{
  "email_addr": "user@example.com"
}
```

**Example:**

```typescript
const isAccountCreated = async (email) => {
  const response = await fetch(`${RELAYER_API_URL}/api/isAccountCreated`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email_addr: email }),
  });
  const text = await response.text();
  return text == "true" ? "Account exists" : "Account does not exist";
};

isAccountCreated('user@example.com')
  .then(status => console.log('Account Status:', status))
  .catch(error => console.error('Error:', error));
```

#### Send Asset

**Endpoint:**

```
POST /api/send
```

**Request Body:**

```json
{
  "email_addr": "user@example.com",
  "amount": 100,
  "token_id": "token123",
  "recipient_addr": "recipient@example.com",
  "is_recipient_email": true
}
```

**Example:**

```typescript
const sendAsset = async (amountString, tokenId, recipientAddr) => {
  const email = localStorage.getItem("loggedInUser") || "";
  const isRecipientEmail = recipientAddr.includes("@");
  const amount = parseFloat(amountString);

  const response = await fetch(`${RELAYER_API_URL}/api/send`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email_addr: email,
      amount,
      token_id: tokenId,
      recipient_addr: recipientAddr,
      is_recipient_email: isRecipientEmail,
    }),
  });
  const data = await response.text();
  return data ? "Asset sent successfully" : "Failed to send asset";
};

sendAsset('100', 'token123', 'recipient@example.com')
  .then(status => console.log('Send Status:', status))
  .catch(error => console.error('Error:', error));
```

#### Recover Account Code

**Endpoint:**

```
POST /api/recoverAccountCode
```

**Request Body:**

```json
{
  "email_addr": "user@example.com"
}
```

**Example:**

```typescript
const recoverAccountCode = async (email) => {
  const response = await fetch(`${RELAYER_API_URL}/api/recoverAccountCode`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email_addr: email }),
  });
  const data = await response.text();
  return data
    ? "Account key recovery email sent"
    : "Failed to send account key recovery email";
};

recoverAccountCode('user@example.com')
  .then(status => console.log('Recovery Status:', status))
  .catch(error => console.error('Error:', error));
```

#### Get Wallet Address

**Endpoint:**

```
POST /api/getWalletAddress
```

**Request Body:**

```json
{
  "email_addr": "user@example.com",
  "account_code": "<characters with 256 bits of entropy>"
}
```

**Example:**

```typescript
const getWalletAddress = async (email, accountKey) => {
  let code = accountKey.startsWith("0x") ? accountKey : `0x${accountKey}`;
  const response = await fetch(`${RELAYER_API_URL}/api/getWalletAddress`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email_addr: email, account_code: code }),
  });
  const data = await response.text();
  return data || "Failed to fetch address, no address found";
};

getWalletAddress('user@example.com', 'accountKey123')
  .then(address => console.log('Wallet Address:', address))
  .catch(error => console.error('Error:', error));
```

#### Transfer NFT

**Endpoint:**

```
POST /api/nftTransfer
```

**Request Body:**

```json
{
  "email_addr": "user@example.com",
  "nft_id": 123,
  "nft_addr": "0xNFTContractAddress",
  "recipient_addr": "recipient@example.com",
  "is_recipient_email": true
}
```

**Example:**

```typescript
const transferNFT = async (nftId, nftAddr, recipientAddr) => {
  const email = localStorage.getItem("loggedInUser") || "";
  const isRecipientEmail = recipientAddr.includes("@");

  const response = await fetch(`${RELAYER_API_URL}/api/nftTransfer`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email_addr: email,
      nft_id: Number(nftId),
      nft_addr: nftAddr,
      recipient_addr: recipientAddr,
      is_recipient_email: isRecipientEmail,
    }),
  });
  const data = await response.text();
  return data ? "NFT transferred successfully" : "Failed to transfer NFT";
};

transferNFT('nft123', '0xNFTContractAddress', 'recipient@example.com')
  .then(status => console.log('Transfer Status:', status))
  .catch(error => console.error('Error:', error));
```
