'use client';

import { useEffect, useState } from 'react';
import { useReadContract, useChainId } from 'wagmi';
import { formatEther } from 'viem';
import Navbar from '../components/Navbar';
import { TICKET_NFT_ABI, getContractAddress } from '../contracts/config';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export default function AnalyticsPage() {
    const chainId = useChainId();
    const [ethToUsd, setEthToUsd] = useState<number | null>(null);

    const TICKET_PRICE_ETH = 0.001;
    const MAX_SUPPLY = 500;
    const DEV_FEE_PERCENT = 7;
    const CITY_FEE_PERCENT = 3;
    const TOTAL_FEE_PERCENT = 10;

    // Fetch total minted tickets
    const { data: totalMinted, isLoading: loadingMinted } = useReadContract({
        address: getContractAddress(chainId) as `0x${string}`,
        abi: TICKET_NFT_ABI,
        functionName: 'totalMinted',
    });

    // Fetch ETH to USD conversion
    useEffect(() => {
        const fetchEthPrice = async () => {
            try {
                const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd');
                if (!response.ok) throw new Error('Failed to fetch price');
                const data = await response.json();
                setEthToUsd(data?.ethereum?.usd || 2500);
            } catch (error) {
                console.error('Failed to fetch ETH price:', error);
                setEthToUsd(2500);
            }
        };

        fetchEthPrice();
        const interval = setInterval(fetchEthPrice, 60000); // Update every minute
        return () => clearInterval(interval);
    }, []);

    // Calculate metrics
    const ticketsSold = Number(totalMinted || 0);
    const ticketsRemaining = MAX_SUPPLY - ticketsSold;
    const percentageSold = ((ticketsSold / MAX_SUPPLY) * 100).toFixed(2);

    const totalRevenue = ticketsSold * TICKET_PRICE_ETH;
    const devProfit = totalRevenue * (DEV_FEE_PERCENT / 100);
    const cityProfit = totalRevenue * (CITY_FEE_PERCENT / 100);
    const eventProfit = totalRevenue * (1 - TOTAL_FEE_PERCENT / 100);

    const potentialRevenue = MAX_SUPPLY * TICKET_PRICE_ETH;
    const remainingRevenue = ticketsRemaining * TICKET_PRICE_ETH;

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
            <Navbar />

            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="mb-6 flex justify-center">
                        <div className="text-6xl animate-pulse">📊</div>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                        🥝 Derby Analytics Dashboard
                    </h1>
                    <p className="text-xl text-gray-300">
                        Real-time ticket sales and revenue distribution
                    </p>
                </div>

                {/* Main Stats Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-8 max-w-6xl mx-auto">
                    {/* Tickets Sold */}
                    <div className="bg-gradient-to-br from-green-500/30 to-emerald-500/30 backdrop-blur-xl rounded-2xl p-6 border-2 border-green-400 shadow-2xl">
                        <div className="text-4xl mb-3">🎫</div>
                        <h3 className="text-lg font-semibold text-gray-200 mb-2">Tickets Sold</h3>
                        <p className="text-4xl font-black text-white mb-1">{ticketsSold}</p>
                        <p className="text-sm text-green-300">out of {MAX_SUPPLY} total</p>
                        <div className="mt-4 bg-black/20 rounded-full h-3 overflow-hidden">
                            <div
                                className="bg-gradient-to-r from-green-400 to-emerald-400 h-full transition-all duration-500"
                                style={{ width: `${percentageSold}%` }}
                            ></div>
                        </div>
                        <p className="text-right text-xs text-gray-300 mt-1">{percentageSold}% sold</p>
                    </div>

                    {/* Tickets Remaining */}
                    <div className="bg-gradient-to-br from-orange-500/30 to-red-500/30 backdrop-blur-xl rounded-2xl p-6 border-2 border-orange-400 shadow-2xl">
                        <div className="text-4xl mb-3">⏳</div>
                        <h3 className="text-lg font-semibold text-gray-200 mb-2">Tickets Remaining</h3>
                        <p className="text-4xl font-black text-white mb-1">{ticketsRemaining}</p>
                        <p className="text-sm text-orange-300">
                            {ticketsRemaining === 0 ? 'SOLD OUT! 🎉' : 'hurry before they\'re gone!'}
                        </p>
                        <div className="mt-4 pt-4 border-t border-white/20">
                            <p className="text-xs text-gray-300">Potential Revenue</p>
                            <p className="text-lg font-bold text-white">
                                {remainingRevenue.toFixed(3)} ETH
                            </p>
                            {ethToUsd && (
                                <p className="text-sm text-gray-400">
                                    ≈ ${(remainingRevenue * ethToUsd).toFixed(2)} USD
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Total Revenue */}
                    <div className="bg-gradient-to-br from-purple-500/30 to-pink-500/30 backdrop-blur-xl rounded-2xl p-6 border-2 border-purple-400 shadow-2xl">
                        <div className="text-4xl mb-3">💰</div>
                        <h3 className="text-lg font-semibold text-gray-200 mb-2">Total Revenue</h3>
                        <p className="text-4xl font-black text-white mb-1">
                            {totalRevenue.toFixed(3)} ETH
                        </p>
                        {ethToUsd && (
                            <p className="text-sm text-purple-300">
                                ≈ ${(totalRevenue * ethToUsd).toFixed(2)} USD
                            </p>
                        )}
                        <div className="mt-4 pt-4 border-t border-white/20">
                            <p className="text-xs text-gray-300">Maximum Potential</p>
                            <p className="text-lg font-bold text-white">
                                {potentialRevenue.toFixed(3)} ETH
                            </p>
                        </div>
                    </div>
                </div>

                {/* Profit Distribution */}
                <div className="max-w-6xl mx-auto mb-8">
                    <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-10 border-2 border-white/20 shadow-2xl">
                        <h2 className="text-3xl font-bold text-white mb-6 text-center">
                            💵 Profit Distribution
                        </h2>

                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            {/* Event Profit */}
                            <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl p-6 border border-blue-400/50">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-xl font-bold text-white">Event Profits</h3>
                                    <span className="text-2xl">🎪</span>
                                </div>
                                <div className="text-3xl font-black text-blue-300 mb-2">
                                    {(TOTAL_FEE_PERCENT === 10 ? 90 : 100 - TOTAL_FEE_PERCENT)}%
                                </div>
                                <div className="space-y-1">
                                    <p className="text-2xl font-bold text-white">
                                        {eventProfit.toFixed(4)} ETH
                                    </p>
                                    {ethToUsd && (
                                        <p className="text-lg text-gray-300">
                                            ≈ ${(eventProfit * ethToUsd).toFixed(2)} USD
                                        </p>
                                    )}
                                </div>
                                <p className="text-sm text-gray-300 mt-3">
                                    Funds the derby event, prizes, venue, kiwi care & operations
                                </p>
                            </div>

                            {/* Dev Profit */}
                            <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl p-6 border border-green-400/50">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-xl font-bold text-white">Dev Team</h3>
                                    <span className="text-2xl">👨‍💻</span>
                                </div>
                                <div className="text-3xl font-black text-green-300 mb-2">
                                    {DEV_FEE_PERCENT}%
                                </div>
                                <div className="space-y-1">
                                    <p className="text-2xl font-bold text-white">
                                        {devProfit.toFixed(4)} ETH
                                    </p>
                                    {ethToUsd && (
                                        <p className="text-lg text-gray-300">
                                            ≈ ${(devProfit * ethToUsd).toFixed(2)} USD
                                        </p>
                                    )}
                                </div>
                                <p className="text-sm text-gray-300 mt-3">
                                    Platform development, maintenance & future improvements
                                </p>
                            </div>

                            {/* City Profit */}
                            <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl p-6 border border-yellow-400/50">
                                <div className="flex items-center justify-between mb-3">
                                    <h3 className="text-xl font-bold text-white">City Profits</h3>
                                    <span className="text-2xl">🏙️</span>
                                </div>
                                <div className="text-3xl font-black text-yellow-300 mb-2">
                                    {CITY_FEE_PERCENT}%
                                </div>
                                <div className="space-y-1">
                                    <p className="text-2xl font-bold text-white">
                                        {cityProfit.toFixed(4)} ETH
                                    </p>
                                    {ethToUsd && (
                                        <p className="text-lg text-gray-300">
                                            ≈ ${(cityProfit * ethToUsd).toFixed(2)} USD
                                        </p>
                                    )}
                                </div>
                                <p className="text-sm text-gray-300 mt-3">
                                    Wellington city tourism & local community initiatives
                                </p>
                            </div>
                        </div>

                        {/* Visual Breakdown */}
                        <div className="bg-black/30 rounded-xl p-6 border border-white/10">
                            <h3 className="text-lg font-bold text-white mb-4 text-center">Revenue Split Visualization</h3>
                            <div className="flex h-12 rounded-lg overflow-hidden shadow-lg">
                                <div
                                    className="bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-sm"
                                    style={{ width: '90%' }}
                                >
                                    Event 90%
                                </div>
                                <div
                                    className="bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold text-sm"
                                    style={{ width: '7%' }}
                                >
                                    Dev 7%
                                </div>
                                <div
                                    className="bg-gradient-to-r from-yellow-500 to-orange-500 flex items-center justify-center text-white font-bold text-sm"
                                    style={{ width: '3%' }}
                                >
                                    City 3%
                                </div>
                            </div>
                            <p className="text-center text-gray-300 text-sm mt-3">
                                Automatic split on every ticket sale via smart contract
                            </p>
                        </div>
                    </div>
                </div>

                {/* Additional Metrics */}
                <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-8">
                    {/* Contract Info */}
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                        <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                            <span className="mr-2">📜</span>
                            Smart Contract Info
                        </h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center pb-2 border-b border-white/10">
                                <span className="text-gray-300">Contract Address:</span>
                                <span className="text-white font-mono text-sm">
                                    {getContractAddress(chainId).slice(0, 6)}...{getContractAddress(chainId).slice(-4)}
                                </span>
                            </div>
                            <div className="flex justify-between items-center pb-2 border-b border-white/10">
                                <span className="text-gray-300">Network:</span>
                                <span className="text-white font-semibold">
                                    {chainId === 11155111 ? 'Sepolia Testnet' : `Chain ${chainId}`}
                                </span>
                            </div>
                            <div className="flex justify-between items-center pb-2 border-b border-white/10">
                                <span className="text-gray-300">Token Standard:</span>
                                <span className="text-white font-semibold">ERC-1155</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300">Contract Balance:</span>
                                <span className="text-white font-semibold">
                                    {totalRevenue.toFixed(4)} ETH
                                </span>
                            </div>
                        </div>
                        <a
                            href={`https://sepolia.etherscan.io/address/${getContractAddress(chainId)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 block w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg text-center transition-colors"
                        >
                            View on Etherscan →
                        </a>
                    </div>

                    {/* Sales Statistics */}
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/20">
                        <h3 className="text-2xl font-bold text-white mb-4 flex items-center">
                            <span className="mr-2">📈</span>
                            Sales Statistics
                        </h3>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center pb-2 border-b border-white/10">
                                <span className="text-gray-300">Ticket Price:</span>
                                <span className="text-white font-semibold">
                                    {TICKET_PRICE_ETH} ETH
                                    {ethToUsd && (
                                        <span className="text-sm text-gray-400 ml-2">
                                            (${(TICKET_PRICE_ETH * ethToUsd).toFixed(2)})
                                        </span>
                                    )}
                                </span>
                            </div>
                            <div className="flex justify-between items-center pb-2 border-b border-white/10">
                                <span className="text-gray-300">Average Sale:</span>
                                <span className="text-white font-semibold">
                                    {ticketsSold > 0 ? (totalRevenue / ticketsSold).toFixed(4) : '0'} ETH/ticket
                                </span>
                            </div>
                            <div className="flex justify-between items-center pb-2 border-b border-white/10">
                                <span className="text-gray-300">Sellout Progress:</span>
                                <span className="text-white font-semibold">{percentageSold}%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-gray-300">Status:</span>
                                <span className={`font-bold ${ticketsRemaining === 0 ? 'text-red-400' : 'text-green-400'}`}>
                                    {ticketsRemaining === 0 ? '🔴 SOLD OUT' : '🟢 AVAILABLE'}
                                </span>
                            </div>
                        </div>
                        {ticketsRemaining > 0 && ticketsRemaining <= 50 && (
                            <div className="mt-4 bg-yellow-500/20 border border-yellow-400 rounded-lg p-3">
                                <p className="text-yellow-300 text-sm font-bold text-center">
                                    ⚠️ Only {ticketsRemaining} tickets left!
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Fun Stats */}
                <div className="max-w-6xl mx-auto">
                    <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl rounded-2xl p-6 border-2 border-purple-400/50 shadow-2xl">
                        <h3 className="text-2xl font-bold text-white mb-4 text-center">
                            🎉 Fun Facts
                        </h3>
                        <div className="grid md:grid-cols-4 gap-4 text-center">
                            <div>
                                <p className="text-3xl font-black text-yellow-300">{ticketsSold}</p>
                                <p className="text-sm text-gray-300">Happy Kiwi Fans</p>
                            </div>
                            <div>
                                <p className="text-3xl font-black text-green-300">
                                    {(ticketsSold * 2).toFixed(0)}
                                </p>
                                <p className="text-sm text-gray-300">Total Kiwi Waddles Expected</p>
                            </div>
                            <div>
                                <p className="text-3xl font-black text-blue-300">
                                    {Math.ceil(ticketsSold / 10)}
                                </p>
                                <p className="text-sm text-gray-300">Buckets of Grubs Fed</p>
                            </div>
                            <div>
                                <p className="text-3xl font-black text-purple-300">∞</p>
                                <p className="text-sm text-gray-300">Adorable Moments</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="text-center mt-8 pt-6 border-t border-white/20">
                    <p className="text-gray-400 text-sm">
                        © 2025 International Pet Kiwi Derby. Built by <span className="font-bold text-white">SFitz911</span>
                    </p>
                </footer>
            </div>
        </div>
    );
}
