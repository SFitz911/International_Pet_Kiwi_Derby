'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import Navbar from './components/Navbar';

export default function Home() {
    const router = useRouter();

    const handleDemoMint = () => {
        // Navigate to mint page with demo parameter
        router.push('/mint?demo=true');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
            {/* Navigation */}
            <Navbar />

            {/* Animated background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 left-10 text-6xl opacity-20 animate-bounce">🏁</div>
                <div className="absolute top-40 right-20 text-5xl opacity-20 animate-pulse">🎉</div>
                <div className="absolute bottom-40 left-20 text-5xl opacity-20 animate-bounce delay-100">🥝</div>
                <div className="absolute bottom-20 right-40 text-6xl opacity-20 animate-pulse delay-200">🏆</div>
            </div>

            <div className="container mx-auto px-4 py-8 relative z-10">
                {/* Hero Section with Cool Kiwi */}
                <div className="text-center mb-12">
                    <div className="relative inline-block">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 blur-3xl opacity-50 animate-pulse"></div>
                        <img
                            src="/images/cool kiwi.png"
                            alt="Cool Kiwi Champion"
                            className="relative w-72 h-72 md:w-96 md:h-96 rounded-full border-8 border-white/30 shadow-2xl mx-auto transform hover:scale-105 transition-transform duration-300 object-cover"
                        />
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black text-white mb-4 mt-8 drop-shadow-2xl animate-bounce">
                        🥝 INTERNATIONAL PET KIWI DERBY 🏁
                    </h1>
                    <p className="text-2xl md:text-3xl text-yellow-300 mb-2 font-bold animate-pulse">
                        The Most EPIC Race in the Southern Hemisphere!
                    </p>
                    <p className="text-lg md:text-xl text-gray-200 italic px-4">
                        (Disclaimer: No kiwis were harmed in the making of this event... but dignity was definitely lost)
                    </p>
                </div>

                {/* Main Content Card */}
                <div className="max-w-5xl mx-auto bg-white/10 backdrop-blur-xl rounded-3xl p-6 md:p-10 mb-8 border-4 border-purple-400/50 shadow-2xl">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 text-center">
                        🎪 WHAT IS THIS MADNESS?! 🎪
                    </h2>

                    <div className="text-base md:text-lg text-gray-100 space-y-4 mb-8">
                        <p className="text-center text-xl md:text-2xl font-bold text-yellow-300 mb-4">
                            Picture this: Adorable, chubby, flightless birds RACING for GLORY! 🏃‍♂️💨
                        </p>

                        <div className="grid md:grid-cols-2 gap-6 my-8">
                            <div className="bg-gradient-to-br from-pink-500/20 to-purple-500/20 rounded-xl p-6 border-2 border-pink-400/50">
                                <p className="text-xl font-bold mb-3">🥝 THE COMPETITORS:</p>
                                <p>Highly trained* pet kiwis from around the world! These majestic creatures waddle at speeds of up to... *checks notes* ... 2 mph!</p>
                                <p className="text-sm italic mt-2">*"Trained" means they showed up and didn't fall asleep</p>
                            </div>

                            <div className="bg-gradient-to-br from-blue-500/20 to-green-500/20 rounded-xl p-6 border-2 border-blue-400/50">
                                <p className="text-xl font-bold mb-3">🏆 THE STAKES:</p>
                                <p>ETERNAL GLORY! A shiny medal! Unlimited grubs! And most importantly... bragging rights that their kiwi is faster than YOUR kiwi!</p>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 rounded-xl p-6 border-2 border-yellow-400/50 my-6">
                            <p className="text-xl md:text-2xl font-bold mb-3 text-center">🎫 YOUR TICKET = NFT = ACCESS TO HISTORY!</p>
                            <p className="text-center">Each ticket is a LIMITED EDITION NFT that proves you witnessed the most adorable sporting event ever created! Only 500 lucky humans get to attend!</p>
                        </div>

                        <div className="flex justify-center gap-4 md:gap-8 my-8 flex-wrap">
                            <img
                                src="/images/Running Kiwi 2025-10-09 140108.png"
                                alt="Running Kiwi"
                                className="w-24 h-24 md:w-36 md:h-36 rounded-full border-4 border-green-400 shadow-lg animate-bounce object-cover"
                            />
                            <img
                                src="/images/cartoon Kiwi 2025-10-09 140241.png"
                                alt="Cartoon Kiwi"
                                className="w-24 h-24 md:w-36 md:h-36 rounded-full border-4 border-blue-400 shadow-lg animate-pulse object-cover"
                            />
                            <img
                                src="/images/Kiwi 1 025-10-09 140435.png"
                                alt="Kiwi Champion"
                                className="w-24 h-24 md:w-36 md:h-36 rounded-full border-4 border-purple-400 shadow-lg animate-bounce delay-100 object-cover"
                            />
                        </div>
                    </div>

                    {/* CTA Buttons */}
                    <div className="flex gap-4 justify-center flex-wrap mb-8">
                        <Link
                            href="/mint"
                            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black py-4 md:py-5 px-6 md:px-10 rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all text-lg md:text-xl shadow-2xl transform hover:scale-110 hover:rotate-1"
                        >
                            🎟️ MINT YOUR TICKET NOW!
                        </Link>
                        <button
                            onClick={handleDemoMint}
                            className="bg-gradient-to-r from-green-600 to-emerald-600 text-white font-black py-4 md:py-5 px-6 md:px-10 rounded-2xl hover:from-green-700 hover:to-emerald-700 transition-all text-lg md:text-xl shadow-2xl transform hover:scale-110 hover:rotate-1"
                        >
                            🎯 DEMO MINT 1 TICKET
                        </button>
                        <Link
                            href="/my-tickets"
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-black py-4 md:py-5 px-6 md:px-10 rounded-2xl hover:from-blue-700 hover:to-cyan-700 transition-all text-lg md:text-xl shadow-2xl transform hover:scale-110 hover:-rotate-1"
                        >
                            🎫 MY TICKETS
                        </Link>
                        <Link
                            href="/scanner"
                            className="bg-gradient-to-r from-orange-600 to-red-600 text-white font-black py-4 md:py-5 px-6 md:px-10 rounded-2xl hover:from-orange-700 hover:to-red-700 transition-all text-lg md:text-xl shadow-2xl transform hover:scale-110 hover:rotate-1"
                        >
                            📱 SCAN TICKETS
                        </Link>
                    </div>
                </div>

                {/* Features Grid */}
                <div className="mt-12 grid md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
                    <div className="bg-gradient-to-br from-purple-500/30 to-pink-500/30 backdrop-blur-xl rounded-2xl p-6 md:p-8 border-2 border-purple-400 transform hover:scale-105 transition-transform">
                        <div className="text-5xl md:text-6xl mb-4">🏆</div>
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-3">EPIC COMPETITION</h3>
                        <p className="text-gray-200">Watch kiwis waddle, stumble, and occasionally run in vaguely the right direction! It's THRILLING!</p>
                    </div>

                    <div className="bg-gradient-to-br from-blue-500/30 to-cyan-500/30 backdrop-blur-xl rounded-2xl p-6 md:p-8 border-2 border-blue-400 transform hover:scale-105 transition-transform">
                        <div className="text-5xl md:text-6xl mb-4">💎</div>
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-3">NFT COLLECTIBLES</h3>
                        <p className="text-gray-200">Your ticket is blockchain-certified proof that you support adorable bird athletics!</p>
                    </div>

                    <div className="bg-gradient-to-br from-green-500/30 to-emerald-500/30 backdrop-blur-xl rounded-2xl p-6 md:p-8 border-2 border-green-400 transform hover:scale-105 transition-transform">
                        <div className="text-5xl md:text-6xl mb-4">🎉</div>
                        <h3 className="text-xl md:text-2xl font-bold text-white mb-3">LIMITED ACCESS</h3>
                        <p className="text-gray-200">Only 500 tickets exist! You'll be part of an ELITE group of kiwi racing enthusiasts!</p>
                    </div>
                </div>

                {/* The Legendary Disclaimer */}
                <div className="max-w-4xl mx-auto bg-red-900/40 backdrop-blur-xl rounded-3xl p-6 md:p-8 border-4 border-red-500 shadow-2xl mb-8">
                    <h3 className="text-2xl md:text-3xl font-black text-yellow-300 mb-4 text-center animate-pulse">
                        ⚠️ THE RED CABLE CAR RULE ⚠️
                    </h3>
                    <div className="bg-black/30 rounded-xl p-4 md:p-6 border-2 border-red-400">
                        <p className="text-base md:text-lg text-white mb-4 leading-relaxed">
                            <span className="font-bold text-red-400">ATTENTION DERBY ATTENDEES:</span> Should the legendary <span className="text-red-400 font-bold">RED CABLE CAR</span> appear during the race, and should any spectator capture photographic evidence of said cable car, the following OFFICIAL RULES shall be enacted:
                        </p>
                        <ul className="space-y-3 text-sm md:text-base text-white">
                            <li className="flex items-start">
                                <span className="text-xl md:text-2xl mr-3">🚡</span>
                                <span>The <span className="font-bold underline">CURRENT WINNER</span> shall be IMMEDIATELY DISQUALIFIED for allowing a cable car to upstage their kiwi!</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-xl md:text-2xl mr-3">🎭</span>
                                <span>The <span className="font-bold underline">FORMER LOSER</span> may claim victory, BUT ONLY after performing a <span className="font-bold text-yellow-300">WORTHY HAKA</span> before the judges!</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-xl md:text-2xl mr-3">💪</span>
                                <span>Said Haka must include: fierce facial expressions, enthusiastic leg slapping, intimidating war cries, and at least 37% commitment to the performance!</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-xl md:text-2xl mr-3">📸</span>
                                <span className="italic">Photo evidence of the Red Cable Car must be submitted within 5 minutes or the rule is void. No photoshop. We're watching. 👁️</span>
                            </li>
                        </ul>
                        <p className="text-center text-yellow-300 font-bold mt-6 text-lg md:text-xl">
                            The Cable Car has spoken. So it shall be.
                        </p>
                    </div>
                </div>

                {/* Footer Fun */}
                <div className="text-center text-gray-300 text-sm space-y-2 pb-8">
                    <p className="text-base md:text-lg">🥝 Kiwi Derby: Where dignity goes to waddle away 🥝</p>
                    <p className="italic px-4">No actual kiwis know they're in a race. They think it's just a really long walk to get snacks.</p>
                    <p className="text-xs opacity-50">Powered by blockchain. Fueled by chaos. Approved by confused kiwis worldwide.</p>
                    <p className="text-sm mt-4 border-t border-white/20 pt-4">
                        © 2025 International Pet Kiwi Derby. Built by <span className="font-bold text-white">SFitz911</span>
                    </p>
                </div>
            </div>
        </div>
    );
}