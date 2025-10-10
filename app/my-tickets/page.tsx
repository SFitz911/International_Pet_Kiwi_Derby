'use client';

import Link from 'next/link';
import { useAccount, useReadContract, useChainId } from 'wagmi';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { TICKET_NFT_ABI, getContractAddress } from '../contracts/config';
import Navbar from '../components/Navbar';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function MyTicketsPage() {
    const { address, isConnected } = useAccount();
    const chainId = useChainId();

    const { data: userBalance, isLoading, refetch } = useReadContract({
        address: getContractAddress(chainId) as `0x${string}`,
        abi: TICKET_NFT_ABI,
        functionName: 'balanceOf',
        args: [address!, BigInt(1)], // Token ID 1 (tickets)
        query: {
            enabled: !!address && isConnected,
            refetchInterval: 3000, // Refetch every 3 seconds to catch new mints
        },
    });

    const generateQRCode = (ticketId: string) => {
        // This would generate a time-limited QR code with the ticket data
        // For now, it's just a placeholder
        return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=ticket:${ticketId}:${Date.now()}`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
            {/* Navigation */}
            <Navbar />
            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    {/* Kiwi Header Image */}
                    <div className="mb-6 flex justify-center">
                        <img
                            src="/images/cartoon Kiwi 2025-10-09 140241.png"
                            alt="Kiwi Ticket Holder"
                            className="w-20 h-20 object-cover rounded-full border-4 border-white/30 shadow-lg"
                        />
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-4">
                        🥝 My Tickets
                    </h1>
                    <p className="text-xl text-gray-300">
                        View and manage your NFT derby tickets
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    {!isConnected ? (
                        <div className="bg-white/10 backdrop-blur rounded-xl p-8 text-center">
                            <h2 className="text-2xl font-bold text-white mb-4">Connect Your Wallet</h2>
                            <p className="text-gray-300 mb-6">
                                Connect your wallet to view your tickets
                            </p>
                            <ConnectButton />
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* Wallet Info */}
                            <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h2 className="text-xl font-bold text-white">Your Wallet</h2>
                                        <p className="text-gray-300 font-mono text-sm">
                                            {address?.slice(0, 6)}...{address?.slice(-4)}
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-gray-300">Total Tickets</p>
                                        <p className="text-2xl font-bold text-white">
                                            {isLoading ? '...' : userBalance?.toString() || '0'}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {/* Refresh Button */}
                            <div className="text-center">
                                <button
                                    onClick={() => refetch()}
                                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                                >
                                    🔄 Refresh Tickets
                                </button>
                                <p className="text-gray-400 text-sm mt-2">
                                    Click to check for newly minted tickets
                                </p>
                            </div>

                            {/* Tickets Display */}
                            {userBalance && userBalance > BigInt(0) ? (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {Array.from({ length: Number(userBalance) }, (_, i) => (
                                        <div key={i} className="bg-white rounded-xl p-6 shadow-lg">
                                            <div className="text-center">
                                                <div className="text-4xl mb-4">🎟️</div>
                                                <h3 className="text-xl font-bold text-gray-800 mb-2">
                                                    Derby Ticket #{i + 1}
                                                </h3>
                                                <p className="text-gray-600 mb-4">
                                                    International Pet Kiwi Derby
                                                </p>

                                                {/* QR Code */}
                                                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                                                    <img
                                                        src={generateQRCode(`${address}-${i + 1}`)}
                                                        alt={`QR Code for ticket ${i + 1}`}
                                                        className="mx-auto"
                                                    />
                                                    <p className="text-xs text-gray-500 mt-2">
                                                        QR Code for entry verification
                                                    </p>
                                                </div>

                                                {/* Ticket Details */}
                                                <div className="text-left space-y-2 text-sm">
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Token ID:</span>
                                                        <span className="font-semibold">1</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Owner:</span>
                                                        <span className="font-mono text-xs">
                                                            {address?.slice(0, 6)}...{address?.slice(-4)}
                                                        </span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-gray-600">Network:</span>
                                                        <span className="font-semibold">
                                                            {chainId === 1337 ? 'Local' : 'Sepolia'}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="bg-white/10 backdrop-blur rounded-xl p-8 text-center">
                                    <div className="text-6xl mb-4">🎭</div>
                                    <h2 className="text-2xl font-bold text-white mb-4">No Tickets Yet</h2>
                                    <p className="text-gray-300 mb-6">
                                        You don't have any derby tickets yet. Mint some to join the fun!
                                    </p>
                                    <Link
                                        href="/mint"
                                        className="inline-block bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold py-3 px-6 rounded-lg hover:from-purple-600 hover:to-blue-600 transition-all"
                                    >
                                        🎟️ Mint Tickets
                                    </Link>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Navigation */}
                    <div className="text-center mt-8">
                        <Link
                            href="/"
                            className="text-blue-300 hover:text-blue-100 underline mr-6"
                        >
                            ← Back to Home
                        </Link>
                        <Link
                            href="/scanner"
                            className="text-blue-300 hover:text-blue-100 underline"
                        >
                            Scanner →
                        </Link>
                    </div>

                    {/* Footer */}
                    <footer className="text-center mt-8 pt-6 border-t border-white/20">
                        <p className="text-gray-400 text-sm">
                            © 2025 International Pet Kiwi Derby. Built by <span className="font-bold text-white">SFitz911</span>
                        </p>
                    </footer>
                </div>
            </div>
        </div>
    );
}