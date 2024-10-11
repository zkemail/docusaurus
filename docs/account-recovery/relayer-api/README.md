# Relayer API Documentation

## Introduction

The Relayer API allows you to integrate ZK Email Account Recovery into your application. It provides endpoints for managing accounts, guardians, processing emails, and initiating recovery requests.

To see an interactive example of this API in practice, you can see [demo frontend code here](https://github.com/zkemail/email-recovery-demo) and [try the flow yourself here](https://recovery.prove.email/).

## Base URL

The base URL for all API endpoints is:

```
https://auth.prove.email
```

## Authentication

Some endpoints may require authentication. Please refer to the specific endpoint documentation for details on authentication requirements.

## Core Functionality

The Relayer API offers several key functionalities:

1. Account Management
2. Guardian Operations
3. Email Processing
4. Recovery Requests
5. Status Checks

## Available Endpoints

Here's a quick overview of some key endpoints:

- `GET /api/echo`: A simple echo endpoint for testing connectivity
- `POST /api/requestStatus`: Check the status of a request
- `POST /api/acceptanceRequest`: Submit an acceptance request
- `POST /api/recoveryRequest`: Initiate a recovery request
- `POST /api/completeRequest`: Complete a recovery request
- `POST /api/getAccountSalt`: Retrieve the salt for an account
- `POST /api/inactiveGuardian`: Mark a guardian as inactive

For a complete list of endpoints and their detailed documentation, please refer to the individual endpoint pages in this documentation.

## Request and Response Formats

Most endpoints accept and return JSON data. Be sure to set the appropriate `Content-Type` header in your requests:

```
Content-Type: application/json
```
