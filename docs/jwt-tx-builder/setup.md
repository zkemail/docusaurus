---
title: Setup Guide | JWT Transaction Builder
sidebar_label: Setup Guide
description: Complete guide to setting up the JWT Transaction Builder frontend, including Google OAuth configuration, API endpoints, and smart contract integration
keywords: [frontend setup, JWT implementation, Google OAuth, API endpoints, smart contract integration, Next.js configuration, environment setup, proof submission, security considerations, development guide]
---

# Setup

This guide explains how to set up the JWT Transaction Builder frontend for handling JWT-based transactions.

## Prerequisites

- Node.js 16+
- npm or yarn
- Google OAuth Client ID

## Installation

Install the required dependencies:

```bash
npm install @chakra-ui/react @chakra-ui/icons @emotion/react @emotion/styled
npm install @zk-email/relayer-utils axios viem framer-motion
```

## Project Structure

Create the following directory structure:

```
jwt-tx-builder/
├── app/
│   ├── layout.tsx
│   ├── page.tsx 
│   └── globals.css
├── pages/
│   └── api/
│       ├── generateCircuitInputs.ts
│       ├── proxyJwtProver.ts
│       └── submitProofToContract.ts
├── public/
│   └── JwtVerifier.json
└── package.json
```

## Configuration

### Environment Variables

Create a `.env.local` file:

```
PRIVATE_KEY=your_private_key_here
GOOGLE_CLIENT_ID=your_google_client_id_here
```

### Next.js Configuration 

Create `next.config.mjs`:


```
/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (!isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                dns: false,
                buffer: false,
                stream: false,
            };
        }
        return config;
    },
};

```


## Core Components

### Main Page Implementation

The main page handles JWT generation and proof verification:


```
...
export default function Home() {
  const [command, setCommand] = useState("");
  const [jwt, setJwt] = useState("");
  const [error, setError] = useState("");
  const [proof, setProof] = useState(null);

  const [stepStatuses, setStepStatuses] = useState([
    "idle",
    "idle",
    "idle",
    "idle",
  ]);
  const steps = [
    { title: "JWT Generation", description: "Generating JWT" },
    { title: "Proof Generation", description: "Starting proof generation" },
    { title: "Proof Complete", description: "Proof generation completed" },
    {
      title: "Submit to Contract",
      description: "Submitting proof to contract",
    },
  ];

  const handleCredentialResponse = async (response: any) => {
    try {
      const jwt = response.credential;
      console.log("JWT:", jwt);
      const decodedHeader = JSON.parse(
        Buffer.from(response.credential.split(".")[0], "base64").toString(
          "utf-8"
        )
      );
      const decodedPayload = JSON.parse(
        Buffer.from(response.credential.split(".")[1], "base64").toString(
          "utf-8"
        )
      );
      console.log("Decoded Header:", decodedHeader);
      console.log("Decoded Payload:", decodedPayload);
      setJwt(jwt);
      setError("");
      setStepStatuses(() => ["success", "idle", "idle"]);
      const pubkeys = await axios.get(
        "https://www.googleapis.com/oauth2/v3/certs"
      );
      const pubkey = pubkeys.data.keys.find(
        (key: any) => key.kid === decodedHeader.kid
      );

      const result = await generateProof(jwt, {
        n: pubkey.n,
        e: 65537,
      });
      if (result) {
        const { proof, pub_signals } = result;
        await submitProofToContract(
          proof,
          pub_signals,
          decodedHeader,
          decodedPayload
        );
      } else {
        throw new Error("Failed to generate proof");
      }
    } catch (error) {
      console.error("Error decoding JWT:", error);
      setError("Failed to process the sign-in response. Please try again.");
      setStepStatuses(() => ["failed", "idle", "idle"]);
    }
  };
```


## API Endpoints

### Circuit Input Generation

Create an API endpoint for generating circuit inputs:


```
import { NextApiRequest, NextApiResponse } from "next";
import { generateJWTVerifierInputs } from "@zk-email/jwt-tx-builder-helpers/dist/input-generators";
import { genAccountCode } from "@zk-email/relayer-utils";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        const { jwt, pubkey, maxMessageLength } = req.body;

        if (!jwt || !pubkey || !maxMessageLength) {
            return res.status(400).json({ error: "Missing required fields" });
        }

        const accountCode = await genAccountCode();
        const circuitInputs = await generateJWTVerifierInputs(
            jwt,
            pubkey,
            accountCode,
            {
                maxMessageLength,
            }
        );

        res.status(200).json(circuitInputs);
    } catch (error) {
        console.error("Error generating circuit inputs:", error);
        res.status(500).json({ error: "Failed to generate inputs" });
    }
}

```


### JWT Prover Proxy

Set up a proxy endpoint for the JWT prover service:


```
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        const response = await axios.post(
            "https://zkemail--jwt-prover-v0-1-4-flask-app.modal.run/prove/jwt",
            req.body,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        res.status(200).json(response.data);
    } catch (error) {
        console.error("Error proxying request to JWT prover:", error);

        if (axios.isAxiosError(error)) {
            if (error.response) {
                res.status(error.response.status).json({
                    error: "Error from JWT prover service",
                    message: error.response.data,
                    status: error.response.status,
                });
            } else if (error.request) {
                res.status(503).json({
                    error: "No response from JWT prover service",
                    message: "The service might be down or unreachable",
                });
            } else {
                res.status(500).json({
                    error: "Error setting up request to JWT prover",
                    message: error.message,
                });
            }
        } else {
            res.status(500).json({
                error: "Unknown error occurred",
                message:
                    "An unexpected error occurred while processing the request",
            });
        }
    }
}
```


### Contract Submission

Create an endpoint for submitting proofs to the contract:


```
import { NextApiRequest, NextApiResponse } from "next";
import { createPublicClient, http, createWalletClient } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { baseSepolia } from "viem/chains";
import { config } from "dotenv";
import { encodeAbiParameters, parseAbiParameters } from "viem";

import { abi as contractABI } from "../../public/JwtVerifier.json";
const contractAddress = "0x04Dd7D48dbe268A957A7aED7FA6206D833c6A3bF";

config();
const privateKey = process.env.PRIVATE_KEY;

if (!privateKey) {
    throw new Error("PRIVATE_KEY environment variable is not set");
}

const publicClient = createPublicClient({
    chain: baseSepolia,
    transport: http(),
});

const walletClient = createWalletClient({
    chain: baseSepolia,
    transport: http(),
});

const account = privateKeyToAccount(`0x${privateKey}`);
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== "POST") {
        res.setHeader("Allow", ["POST"]);
        return res.status(405).end(`Method ${req.method} Not Allowed`);
    }

    try {
        console.log("Request body:", req.body);
        const { proof, pub_signals, header, payload } = req.body;
        console.log("Proof:", proof);
        console.log("Pub signals:", pub_signals);

        if (!proof || !pub_signals) {
            return res.status(400).json({
                error: "Missing proof or pub_signals in request body",
            });
        }

        const jwtProof = {
            domainName: `${header.kid}|${payload.iss}|${payload.azp}`,
            publicKeyHash: `0x${BigInt(pub_signals[3]).toString(16).padStart(64, "0")}`,
            timestamp: BigInt(pub_signals[5]).toString(),
            maskedCommand: payload.nonce,
            emailNullifier: `0x${BigInt(pub_signals[4]).toString(16).padStart(64, "0")}`,
            accountSalt: `0x${BigInt(pub_signals[26]).toString(16).padStart(64, "0")}`,
            isCodeExist: pub_signals[30] == 1,
            proof: encodeAbiParameters(
                parseAbiParameters("uint256[2], uint256[2][2], uint256[2]"),
                [
                    proof.pi_a.slice(0, 2).map(BigInt),
                    [
                        [BigInt(proof.pi_b[0][1]), BigInt(proof.pi_b[0][0])],
                        [BigInt(proof.pi_b[1][1]), BigInt(proof.pi_b[1][0])],
                    ],
                    proof.pi_c.slice(0, 2).map(BigInt),
                ]
            ),
        };
        console.log("JWT proof:", jwtProof);

        const gas = 1000000;

        const { request } = await publicClient.simulateContract({
            account,
            address: contractAddress,
            abi: contractABI,
            functionName: "verifyEmailProof",
            args: [jwtProof],
            gas: BigInt(gas),
        });
        console.log("Contract request:", request);
        const hash = await walletClient.writeContract(request);
        console.log("Transaction hash:", hash);
        const receipt = await publicClient.waitForTransactionReceipt({ hash });
        console.log("Transaction receipt:", receipt);

        res.status(200).json({
            message: "Proof submitted successfully",
            transactionHash: hash,
            blockNumber: receipt.blockNumber.toString(),
        });
    } catch (error) {
        console.error("Error submitting proof to contract:", error);
        res.status(500).json({
            error: "Failed to submit proof to contract",
            message:
                error instanceof Error
                    ? error.message
                    : "Unknown error occurred",
        });
    }
}
```


## Contract Integration

Ensure you have the contract ABI in `public/JwtVerifier.json`. The contract interface should match:


```
        {
            "type": "function",
            "name": "verifyEmailProof",
            "inputs": [
                {
                    "name": "proof",
                    "type": "tuple",
                    "internalType": "struct EmailProof",
                    "components": [
                        {
                            "name": "domainName",
                            "type": "string",
                            "internalType": "string"
                        },
                        {
                            "name": "publicKeyHash",
                            "type": "bytes32",
                            "internalType": "bytes32"
                        },
                        {
                            "name": "timestamp",
                            "type": "uint256",
                            "internalType": "uint256"
                        },
                        {
                            "name": "maskedCommand",
                            "type": "string",
                            "internalType": "string"
                        },
                        {
                            "name": "emailNullifier",
                            "type": "bytes32",
                            "internalType": "bytes32"
                        },
                        {
                            "name": "accountSalt",
                            "type": "bytes32",
                            "internalType": "bytes32"
                        },
                        {
                            "name": "isCodeExist",
                            "type": "bool",
                            "internalType": "bool"
                        },
                        {
                            "name": "proof",
                            "type": "bytes",
                            "internalType": "bytes"
                        }
                    ]
                }
            ],
            "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
            "stateMutability": "view"
```


## Google OAuth Setup

1. Go to Google Cloud Console
2. Create a new project
3. Enable Google Sign-In API
4. Create OAuth 2.0 credentials
5. Add authorized JavaScript origins:
   - `http://localhost:3000` (development)
   - Your production domain

## Running the Application

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Usage Flow

1. User enters a command
2. Google Sign-In generates a JWT
3. Circuit inputs are generated
4. Proof is created via prover service
5. Proof is submitted to smart contract

## Security Considerations

- Store private keys securely
- Validate all user inputs
- Use environment variables for sensitive data
- Implement rate limiting on API endpoints
- Validate JWT signatures and expiration

For detailed implementation examples, refer to the code snippets in the frontend directory.
