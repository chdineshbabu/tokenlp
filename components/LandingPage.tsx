import React from "react";
import { ArrowRight, Coins, Zap, Shield } from "lucide-react";

export default function LandingPage({onClose}) {
  return (
    <div className="min-h-screen px-56 bg-gradient-to-b from-gray-900 to-slate-900 text-white">
      <header className="container mx-auto px-4 py-8">
        <nav className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">ForgeToken</h1>

        </nav>
      </header>

      <main className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="text-center justify-center items-center flex flex-col py-28">
          <h2 className="text-5xl font-bold mb-4 animate-fade-in-up">Forge Your Future on Solana</h2>
          <p className="text-xl mb-8 animate-fade-in-up animation-delay-200">
            Create and mint tokens on the Solana blockchain with ease
          </p>
          <button onClick={onClose} className="bg-white text-purple-900 px-6 py-3 w-fit rounded-md text-lg font-bold flex items-center justify-center hover:bg-purple-100 transition animate-fade-in-up animation-delay-400">
            Get Started
            <ArrowRight className="ml-2" />
          </button>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <h3 className="text-3xl font-bold text-center mb-12">Why Choose ForgeToken?</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Coins className="w-12 h-12 mb-4" />,
                title: "Easy Token Creation",
                description: "Create custom tokens on Solana in minutes with our intuitive interface.",
              },
              {
                icon: <Zap className="w-12 h-12 mb-4" />,
                title: "Lightning-Fast Minting",
                description: "Mint tokens at the speed of Solana - faster than ever before.",
              },
              {
                icon: <Shield className="w-12 h-12 mb-4" />,
                title: "Secure and Reliable",
                description: "Built on Solana's secure infrastructure for peace of mind.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-white bg-opacity-10 p-6 rounded-lg text-center animate-fade-in-up"
                style={{ animationDelay: `${(index + 1) * 200}ms` }}
              >
                {feature.icon}
                <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20">
          <h3 className="text-3xl font-bold text-center mb-12">How It Works</h3>
          <div className="max-w-3xl mx-auto">
            {[
              "Connect your Solana wallet",
              "Define your token's properties",
              "Create your token with one click",
              "Start minting and distributing",
            ].map((step, index) => (
              <div key={index} className="flex items-center mb-8 animate-fade-in-left" style={{ animationDelay: `${index * 200}ms` }}>
                <div className="bg-purple-500 rounded-full w-10 h-10 flex items-center justify-center mr-4">
                  {index + 1}
                </div>
                <p className="text-lg">{step}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center justify-center items-center flex flex-col py-28
        
        
        
        
        
        
        ">
          <h3 className="text-3xl font-bold mb-4">Ready to Forge Your Token?</h3>
          <p className="text-xl mb-8">Join the future of decentralized finance on Solana</p>
          <button onClick={onClose} className="bg-white text-purple-900 px-6 py-3 rounded-md text-lg font-bold flex items-center justify-center hover:bg-purple-100 transition">
            Launch App
            <ArrowRight className="ml-2" />
          </button>
        </section>
      </main>

      <footer className="container mx-auto px-4 py-8 text-center">
        <p>&copy; 2024 ForgeToken. All rights reserved.</p>
      </footer>
    </div>
  );
}
