'use client'
import Hero from "@/components/Hero";
import LandingPage from "@/components/LandingPage";
import Navbar from "@/components/Navbar";
import { ConnectionProvider, WalletProvider } from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import '@solana/wallet-adapter-react-ui/styles.css';
import { useState } from "react";

export default function Home() {
  const [hero, setHero] = useState(true)
  return (
    <ConnectionProvider endpoint="https://devnet.helius-rpc.com/?api-key=90aa40ff-d8d9-465c-8f90-4e74812913a0">
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          {hero ? <LandingPage onClose={() => setHero(false)}/> :
            <div className="bg-white dark:bg-black transition-all delay-75 text-black dark:text-gray-200 mx-6 lg:mx-96 my-16">
              <Navbar />
              <Hero />
            </div>}
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}
