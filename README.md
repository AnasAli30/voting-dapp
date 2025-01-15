# Voting DApp

A decentralized voting application built on the Ethereum Base chain. This DApp ensures secure, transparent, and tamper-proof voting through blockchain technology.

## Live Demo

Check out the live version here: [Voting DApp](https://voting-dapp-t749.vercel.app/)

## Features

- **Secure Voting:** Votes are recorded on the blockchain, preventing tampering.
- **Transparent Process:** Real-time vote tracking ensures transparency.
- **Smart Contract Integration:** Fully decentralized with smart contract support.
- **User-Friendly Interface:** Simple and intuitive design for easy navigation.

## Tech Stack

- **Frontend:** React.js  
- **Backend:** Node.js, MongoDB  
- **Blockchain:** Ethereum Base chain

## Working

The Voting DApp operates with three distinct user roles, each with specific functionalities:

### 1. **Election Commission**
- Deploys the smart contract on the Ethereum Base chain.
- Has the authority to **start** and **end** the voting process.
- Declares the **final results** after voting concludes.
- Shares the smart contract address with voters and candidates for registration.

### 2. **Candidate**
- Registers on the platform using the provided smart contract address.
- Can be voted for by registered voters.
- Participates in the election process transparently.

### 3. **Voter**
- Registers on the platform using the provided smart contract address.
- Can cast a vote for any registered candidate.
- Ensures secure and verifiable voting through the blockchain.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/AnasAli30/voting-dapp
   cd voting-dapp
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   ```

## Usage

1. **Connect MetaMask** to the Ethereum Base chain.
2. **Deploy the smart contract** using Remix or Hardhat.
3. **Access the DApp** or [Live Demo](https://voting-dapp-t749.vercel.app/).
4. **Register as Election Commission, Candidate, or Voter** using the provided smart contract address.
5. **Start the voting process** (Election Commission).
6. **Vote for candidates** (Voter) and **track results** in real-time.
7. **Declare results** once voting is complete (Election Commission).

## Folder Structure

```
├── src/           # React frontend
├── contract/        # Smart contracts
├── server/           # Backend server (Node.js, MongoDB)
├── package.json
└── README.md
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License.

## Contact

For any inquiries or feedback, reach out to [Anas Ali] at [[anasali12665@gmail.com](mailto:anasali12665@gmail.com)].

