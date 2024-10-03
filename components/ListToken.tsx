import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { TOKEN_2022_PROGRAM_ID, AccountLayout, getTokenMetadata } from '@solana/spl-token';
import { TokenAccountsFilter } from '@solana/web3.js';
import { useRouter } from 'next/navigation';

export default function TokenList() {
    const router = useRouter()
    const [accounts, setAccounts] = useState([]);
    
    const { wallet } = useWallet();
    const { connection } = useConnection();
    const publicKey = wallet?.adapter.publicKey;

    async function getMetadata(mintAddress: any) {
        const metadata = await getTokenMetadata(connection, mintAddress);
        return metadata;
    }
    useEffect(() => {
        const getTokenAcc = async () => {
            if (!publicKey) return;

            const tokenAccounts = await connection.getTokenAccountsByOwner(publicKey, {
                programId: TOKEN_2022_PROGRAM_ID,
            } as TokenAccountsFilter);

            const accountList = await Promise.all(
                tokenAccounts.value.map(async (account) => {
                    const accountData = AccountLayout.decode(account.account.data);
                    const mintAddress = accountData.mint;
                    return getMetadata(mintAddress)
                        .then((metadata) => {
                            return {
                                pubkey: account.pubkey.toBase58(),
                                mint: mintAddress,
                                amount: accountData.amount.toString(),
                                logo:'/placeholder.svg',
                                name: metadata?.name || 'Token Name',
                                symbol: metadata?.symbol || 'TOKEN',
                            };
                        });
                })
            );

            setAccounts(accountList);
        };

        getTokenAcc();
    }, [publicKey, connection]);

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-xl font-bold mb-4">Your Token Accounts:</h1>
            <table className="min-w-full">
                <thead>
                    <tr>
                        <th className="border-b py-2 px-4 text-left">No</th>
                        <th className="border-b py-2 px-4">Logo</th>
                        <th className="border-b py-2 px-4">Name</th>
                        <th className="border-b py-2 px-4">Symbol</th>
                        <th className="border-b py-2 px-4 text-right">Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {accounts.length > 0 ? (
                        accounts.map((token, index) => (
                            <tr key={token.pubkey} className="">
                                <td className="border-b py-2 px-4 font-medium">{index + 1}</td>
                                <td className="border-b py-2 px-4">
                                    <Image
                                        src={token.logo}
                                        alt={`${token.name} logo`}
                                        width={32}
                                        height={32}
                                        className="rounded-full"
                                    />
                                </td>
                                <td className="border-b py-2 px-4">{token.name}</td>
                                <td className="border-b py-2 px-4">{token.symbol}</td>
                                <td className="border-b py-2 px-4 text-right">{token.amount.toLocaleString()}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5} className="border-b py-2 px-4 text-center">
                                No token accounts found.<br/>
                                <button className='p-2 px-4 my-4 bg-black rounded-lg hover:scale-105 transition-all delay-75 dark:bg-white text-white dark:text-black'>Create Token</button>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
