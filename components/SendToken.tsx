import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import React from 'react'

function SendToken() {
    const {wallet} = useWallet()
    const {connection} = useConnection();
  return (
    <div>{wallet?.adapter.publicKey}</div>
  )
}

export default SendToken


