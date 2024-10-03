'use client'
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import '@solana/wallet-adapter-react-ui/styles.css';

export default function Home() {
  return (
    <ConnectionProvider endpoint="https://devnet.helius-rpc.com/?api-key=90aa40ff-d8d9-465c-8f90-4e74812913a0">
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <Navbar />
          <Hero />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
