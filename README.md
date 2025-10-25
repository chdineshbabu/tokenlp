# ForgeToken - Solana Token Creation Platform

A modern, user-friendly web application for creating and managing tokens on the Solana blockchain. Built with Next.js, TypeScript, and Solana Web3.js, ForgeToken provides an intuitive interface for token creation, minting, and management.

## 🚀 Features

- **Easy Token Creation**: Create custom tokens on Solana with a simple form interface
- **Token Metadata Support**: Add names, symbols, and images to your tokens
- **Token Minting**: Mint additional tokens to your wallet
- **Token Management**: View and manage all your created tokens in one place
- **Wallet Integration**: Seamless integration with Solana wallets
- **Modern UI**: Beautiful, responsive design with dark/light theme support
- **Real-time Status**: Live updates during token creation and minting processes

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, NextUI
- **Blockchain**: Solana Web3.js, SPL Token
- **Wallet**: Solana Wallet Adapter
- **Icons**: Lucide React
- **Loading**: React Loading Indicators

## 📋 Prerequisites

Before running this application, make sure you have:

- Node.js (version 18 or higher)
- npm or yarn package manager
- A Solana wallet (Phantom, Solflare, etc.)
- Some SOL for transaction fees (on Devnet for testing)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd tokenlp
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

The application is currently configured to use Solana Devnet. The RPC endpoint is set in the main page component:

```typescript
<ConnectionProvider endpoint="https://devnet.helius-rpc.com/?api-key=YOUR_API_KEY">
```

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 🎯 How to Use

### 1. Connect Your Wallet
- Click on the wallet connection button in the navbar
- Select your preferred Solana wallet
- Approve the connection

### 2. Create a Token
- Click "Create Token" button
- Fill in the token details:
  - **Token Name**: The full name of your token
  - **Token Symbol**: A short symbol (e.g., "MAT")
  - **Image URL**: URL to your token's image/logo
  - **Initial Supply**: Number of tokens to mint initially
- Click "Create Token" and approve the transaction

### 3. Manage Your Tokens
- View all your created tokens in the dashboard
- Mint additional tokens using the mint interface
- Explore your tokens on Solana Explorer

## 🏗️ Project Structure

```
tokenlp/
├── app/                    # Next.js app directory
│   ├── globals.css         # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main page component
├── components/             # React components
│   ├── Hero.tsx           # Main dashboard component
│   ├── LandingPage.tsx    # Landing page with features
│   ├── ListToken.tsx      # Token list and management
│   ├── MintToken.tsx      # Token minting component
│   ├── Navbar.tsx         # Navigation bar
│   ├── ThemeSwitch.tsx    # Dark/light theme toggle
│   └── Token.tsx          # Token creation form
├── package.json           # Dependencies and scripts
├── tailwind.config.ts     # Tailwind CSS configuration
└── tsconfig.json          # TypeScript configuration
```

## 🔧 Key Components

### Token Creation (`Token.tsx`)
- Handles the complete token creation process
- Creates mint account, metadata, and initial supply
- Uses Token-2022 program for enhanced features
- Provides real-time status updates

### Token Management (`ListToken.tsx`)
- Displays all user's token accounts
- Shows token metadata (name, symbol, logo)
- Provides minting interface for each token
- Links to Solana Explorer for verification

### Minting (`MintToken.tsx`)
- Allows minting additional tokens
- Validates mint amounts
- Handles transaction processing

## 🌐 Network Configuration

The application is configured for Solana Devnet by default. To switch to Mainnet:

1. Update the RPC endpoint in `app/page.tsx`
2. Ensure you have sufficient SOL for transaction fees
3. Update any hardcoded cluster references

## 🔒 Security Considerations

- Always verify transaction details before signing
- Use Devnet for testing and development
- Never share your private keys or seed phrases
- Be cautious with token creation on Mainnet

## 🐛 Troubleshooting

### Common Issues

1. **Wallet Connection Issues**
   - Ensure your wallet is unlocked
   - Try refreshing the page
   - Check if your wallet supports Solana

2. **Transaction Failures**
   - Verify you have sufficient SOL for fees
   - Check network connectivity
   - Ensure all form fields are properly filled

3. **Token Not Appearing**
   - Wait for transaction confirmation
   - Refresh the page
   - Check Solana Explorer for transaction status

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Solana Foundation for the excellent developer tools
- Next.js team for the amazing framework
- The open-source community for various packages used

## 📞 Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Search existing issues in the repository
3. Create a new issue with detailed information

---

**Happy Token Creating! 🪙✨**