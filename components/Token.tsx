'use client'

import { createAssociatedTokenAccountInstruction, createInitializeMetadataPointerInstruction, createInitializeMintInstruction, ExtensionType, getAssociatedTokenAddress, getMintLen, LENGTH_SIZE, TOKEN_2022_PROGRAM_ID, TOKEN_PROGRAM_ID, TYPE_SIZE } from '@solana/spl-token'
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { Keypair, SystemProgram, Transaction } from '@solana/web3.js'
import { createInitializeInstruction, pack } from '@solana/spl-token-metadata';

import { useState } from 'react'

export default function Token() {
  const [tokenName, setTokenName] = useState('')
  const [tokenSymbol, setTokenSymbol] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [initialSupply, setInitialSupply] = useState('')
  const [isCreating, setIsCreating] = useState(false)
  const {wallet} = useWallet();
  const {connection} = useConnection();
  async function createToken(){
      const mintKeypair = Keypair.generate();
      const metadata = {
          mint: mintKeypair.publicKey,
          name: tokenName,
          symbol: tokenSymbol,
          uri: imageUrl,
          additionalMetadata: [],
      };
      console.log(mintKeypair.publicKey,metadata)
      const mintLen = getMintLen([ExtensionType.MetadataPointer]);
      const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metadata).length;

      const lamports = await connection.getMinimumBalanceForRentExemption(mintLen + metadataLen);
      const transaction = new Transaction().add(
        SystemProgram.createAccount({
            fromPubkey: wallet?.adapter.publicKey,
            newAccountPubkey: mintKeypair.publicKey,
            space: mintLen,
            lamports,
            programId: TOKEN_2022_PROGRAM_ID,
        }),
        createInitializeMetadataPointerInstruction(mintKeypair.publicKey,  wallet?.adapter.publicKey, mintKeypair.publicKey, TOKEN_2022_PROGRAM_ID),
        createInitializeMintInstruction(mintKeypair.publicKey, 9,  wallet?.adapter.publicKey, null, TOKEN_2022_PROGRAM_ID),
        createInitializeInstruction({
            programId: TOKEN_2022_PROGRAM_ID,
            mint: mintKeypair.publicKey,
            metadata: mintKeypair.publicKey,
            name: metadata.name,
            symbol: metadata.symbol,
            uri: metadata.uri,
            mintAuthority:  wallet?.adapter.publicKey,
            updateAuthority:  wallet?.adapter.publicKey,
        }),
    );
        
    transaction.feePayer =  wallet?.adapter.publicKey;
    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    transaction.partialSign(mintKeypair);

    await wallet?.adapter.sendTransaction(transaction, connection);
    const associatedTokenAccount = await getAssociatedTokenAddress(
        mintKeypair.publicKey, 
        wallet?.adapter.publicKey,  
        false,            
        TOKEN_2022_PROGRAM_ID 
      );
        const associateTransaction = new Transaction().add(
          createAssociatedTokenAccountInstruction(
            wallet?.adapter.publicKey,     
            associatedTokenAccount, 
            wallet?.adapter.publicKey,     
            mintKeypair.publicKey,       
            TOKEN_2022_PROGRAM_ID        
          )
        );
    transaction.feePayer = wallet?.adapter.publicKey;
    transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;
    await wallet?.adapter.sendTransaction(associateTransaction, connection)

  console.log(`Token created: ${mintKeypair.publicKey.toBase58()}`);
  console.log(`Associated Token Account: ${associatedTokenAccount.toBase58()}`);

  }
  const handleCreateToken = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsCreating(true)
    createToken()
  }


  return (
    <div className="lg:w-[50%] rounded-lg">
      <h2 className="text-4xl font-poppins font-bold mb-2">Create Solana Token</h2>
      <p className=" mb-4">Enter the details for your new token</p>
      <form onSubmit={handleCreateToken}>
        <div className="space-y-4">
          <div>
            <label htmlFor="tokenName" className="block text-sm font-medium ">
              Token Name
            </label>
            <input 
              id="tokenName" 
              type="text" 
              placeholder="My Awesome Token" 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={tokenName}
              onChange={(e) => setTokenName(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="tokenSymbol" className="block text-sm font-medium">
              Token Symbol
            </label>
            <input 
              id="tokenSymbol" 
              type="text" 
              placeholder="MAT" 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={tokenSymbol}
              onChange={(e) => setTokenSymbol(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium">
              Image URL
            </label>
            <input 
              id="imageUrl" 
              type="url" 
              placeholder="https://example.com/token-image.png" 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
          </div>

          <div>
            <label htmlFor="initialSupply" className="block text-sm font-medium ">
              Initial Supply
            </label>
            <input 
              id="initialSupply" 
              type="number" 
              placeholder="000000" 
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              value={initialSupply}
              onChange={(e) => setInitialSupply(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="mt-6">
          <button 
            type="submit" 
            className={`w-full px-4 py-2 font-bold bg-black dark:bg-white text-white dark:text-black rounded hover:scale-105 transition-all delay-75 ${
              isCreating ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isCreating}
          >
            {isCreating ? 'Creating...' : 'Create Token'}
          </button>
        </div>
      </form>
    </div>
  )
}
