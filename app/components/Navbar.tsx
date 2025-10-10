'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export default function Navbar() {
    const pathname = usePathname();

    const navLinks = [
        { href: '/', label: '🏠 Home', emoji: '🏠' },
        { href: '/mint', label: '🎟️ Mint', emoji: '🎟️' },
        { href: '/my-tickets', label: '🎫 My Tickets', emoji: '🎫' },
        { href: '/scanner', label: '📱 Scanner', emoji: '📱' },
        { href: '/analytics', label: '📊 Analytics', emoji: '📊' },
    ];

    return (
        <nav className="sticky top-0 z-50 bg-gradient-to-r from-purple-900/95 via-blue-900/95 to-indigo-900/95 backdrop-blur-lg border-b-2 border-white/10 shadow-2xl">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    {/* Logo/Brand */}
                    <Link href="/" className="flex items-center space-x-3 group">
                        <div className="text-3xl transform group-hover:scale-110 transition-transform">
                            🥝
                        </div>
                        <div>
                            <h1 className="text-xl md:text-2xl font-black text-white group-hover:text-yellow-300 transition-colors">
                                Pet Kiwi Derby
                            </h1>
                            <p className="text-xs text-gray-300 hidden md:block">
                                International Racing Event
                            </p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-2">
                        {navLinks.map((link) => {
                            const isActive = pathname === link.href;
                            return (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className={`px-4 py-2 rounded-lg font-bold transition-all transform hover:scale-105 ${isActive
                                            ? 'bg-white/20 text-yellow-300 shadow-lg'
                                            : 'text-white hover:bg-white/10'
                                        }`}
                                >
                                    {link.label}
                                </Link>
                            );
                        })}
                    </div>

                    {/* Connect Button */}
                    <div className="hidden md:block">
                        <ConnectButton />
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center space-x-2">
                        <ConnectButton />
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden mt-4 flex flex-wrap gap-2 justify-center">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-3 py-2 rounded-lg text-sm font-bold transition-all ${isActive
                                        ? 'bg-white/20 text-yellow-300 shadow-lg'
                                        : 'text-white bg-white/5 hover:bg-white/10'
                                    }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </nav>
    );
}
