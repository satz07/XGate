# XGate (Web3Auth + Account abstraction)

XGate is a powerful utility designed to facilitate the use of Smart Accounts (account abstraction) and enable gasless transactions through Etherspot Paymaster. This repository demonstrates the seamless integration of cutting-edge technologies like Web3Auth, Modular SDK, and various other tools for managing and interacting with smart contracts efficiently.

XGate simplifies the onboarding process for users into the Web3 ecosystem by offering a user experience similar to Web2 platforms. By providing a complete abstraction of the complexities typically associated with Web3, XGate ensures a smooth and frictionless transition for both users and developers, making it easier to integrate decentralized technologies into your applications.

With XGate, developers can onboard users quickly, reduce gas fees through paymaster services, and leverage advanced account abstraction features, enabling a more intuitive and cost-effective interaction with the blockchain.


## Prerequisites

Ensure you have the following dependencies installed:

- **Node.js** version: `v18.17.0`
- **NVM (Node Version Manager)**: You can install Node.js version `v18.17.0` using NVM.

## Getting Started

Follow the steps below to set up the project on your local machine:

1. **Clone the Repository**  
   Open your terminal and run the following command to clone the repository:  
    ```bash
    git clone https://github.com/satz07/XGate.git

2. **Navigate into the Project Directory**  
   After cloning the repository, navigate into the project directory by running:  
   ```bash
   cd XGate

3. **Set Node.js Version**  
   Ensure you're using the correct Node.js version. If you're using **NVM**, switch to the required version by running:  
   ```bash
   nvm use v18.17.0
   If you don't have this version installed, run:  

   ```bash
   nvm install v18.17.0

4. **Install Dependencies**  
   Once the correct Node.js version is set, install the necessary dependencies by running:  
   ```bash
   npm install

5. **Run the Development Server**  
   Start the development server by running the following command:  
   ```bash
   npm run dev

6. **Access the Application**  
   After the server starts, open your browser and navigate to:  
   `http://localhost:3000`

## Configuration

Before running the application, make sure you configure the `SmartAccount.tsx` file. Update the following variables:

```typescript
const clientId = "WEB3AuthID";           // Your Web3Auth client ID
const recipient = "Recipient of Token";  // The recipient address for the tokens
const erc20TokenAddress = "TOKEN_ADDRESS"; // Address of the ERC20 token contract
const erc721TokenAddress = "TOKEN_ADDRESS"; // Address of the ERC721 token contract
const apiKey = "arka_public_key";        // Your API key
const CHAIN_ID = 51;                     // Chain ID for XDC Apothem network
```

Note: You should replace hardcoded values with environment variables as a future improvement.

## Whitelist Your Smart Account (SA) for Paymaster Gasless Transactions

To enable gasless transactions using Etherspot’s Paymaster service, your Smart Account (SA) must be whitelisted.

Use the following link to whitelist your SA:  
[Whitelist an Address](https://etherspot.fyi/arka/api-calls/whitelist-an-address-v2)

### In the request body, use the following details:

```json
{
  "apiKey": "arka_public_key",
  "chainId": 51,
  "address": "Your Smart Account Address"
}
```

Submit the request. If successful, you should receive a 200 response with the message:

```json
{
  "message": "Successfully whitelisted"
}
```

### Note: This is the initial release aimed at supporting projects that require a Web3 + Account Abstraction (AA) solution for immediate use.
This utility will continue to evolve with additional features and integrations, driven by the needs and interests of the users and community.