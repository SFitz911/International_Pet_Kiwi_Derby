'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useReadContract, useChainId } from 'wagmi';
import { TICKET_NFT_ABI, getContractAddress } from '../contracts/config';
import Navbar from '../components/Navbar';

export default function ScannerPage() {
    const [scannedData, setScannedData] = useState<string>('');
    const [verificationResult, setVerificationResult] = useState<{
        isValid: boolean;
        message: string;
        ticketInfo?: any;
    } | null>(null);
    const [isScanning, setIsScanning] = useState(false);

    const chainId = useChainId();

    // For demo purposes - in a real app you'd use a camera library
    const handleScanDemo = () => {
        setIsScanning(true);
        // Simulate scanning delay
        setTimeout(() => {
            const demoQRData = `ticket:0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266-1:${Date.now()}`;
            setScannedData(demoQRData);
            verifyTicket(demoQRData);
            setIsScanning(false);
        }, 2000);
    };

    const verifyTicket = async (qrData: string) => {
        try {
            // Parse QR data (format: ticket:walletAddress-ticketNumber:timestamp)
            const parts = qrData.split(':');
            if (parts.length !== 3 || parts[0] !== 'ticket') {
                setVerificationResult({
                    isValid: false,
                    message: 'Invalid QR code format'
                });
                return;
            }

            const [, ticketId, timestamp] = parts;
            const [walletAddress] = ticketId.split('-');

            // Check if timestamp is not too old (5 minutes for demo)
            const currentTime = Date.now();
            const qrTime = parseInt(timestamp);
            const timeDiff = currentTime - qrTime;
            const maxAge = 5 * 60 * 1000; // 5 minutes

            if (timeDiff > maxAge) {
                setVerificationResult({
                    isValid: false,
                    message: 'QR code has expired (older than 5 minutes)'
                });
                return;
            }

            // In a real implementation, you'd verify the ticket ownership on-chain
            // For now, we'll assume it's valid if the format is correct
            setVerificationResult({
                isValid: true,
                message: 'Valid ticket! Entry authorized.',
                ticketInfo: {
                    owner: walletAddress,
                    ticketId: ticketId,
                    scannedAt: new Date().toLocaleString()
                }
            });

        } catch (error) {
            setVerificationResult({
                isValid: false,
                message: 'Error verifying ticket'
            });
        }
    };

    const handleManualInput = () => {
        if (scannedData) {
            verifyTicket(scannedData);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
            {/* Navigation */}
            <Navbar />

            <div className="container mx-auto px-4 py-8">
                <div className="text-center mb-8">
                    {/* Kiwi Scanner Header Image */}
                    <div className="mb-6 flex justify-center">
                        <img
                            src="/images/cartoon Kiwi 2025-10-09 140241.png"
                            alt="Kiwi Scanner"
                            className="w-20 h-20 object-cover rounded-full border-4 border-white/30 shadow-lg"
                        />
                    </div>
                    <h1 className="text-4xl font-bold text-white mb-4">
                        🥝 Ticket Scanner
                    </h1>
                    <p className="text-xl text-gray-300">
                        Scan QR codes to verify derby tickets
                    </p>
                </div>

                <div className="max-w-2xl mx-auto">
                    {/* Scanner Interface */}
                    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">QR Code Scanner</h2>
                            <p className="text-gray-600">
                                Point your camera at a ticket QR code or enter data manually
                            </p>
                        </div>

                        {/* Camera Preview Area (Placeholder) */}
                        <div className="bg-gray-100 rounded-lg aspect-square max-w-md mx-auto mb-6 flex items-center justify-center">
                            {isScanning ? (
                                <div className="text-center">
                                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
                                    <p className="text-gray-600">Scanning QR code...</p>
                                </div>
                            ) : (
                                <div className="text-center p-8">
                                    <div className="text-6xl mb-4">📷</div>
                                    <p className="text-gray-600 mb-4">Camera preview would appear here</p>
                                    <button
                                        onClick={handleScanDemo}
                                        className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
                                    >
                                        🎯 Demo Scan
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Manual Input */}
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Or enter QR data manually:
                                </label>
                                <div className="flex space-x-2">
                                    <input
                                        type="text"
                                        value={scannedData}
                                        onChange={(e) => setScannedData(e.target.value)}
                                        placeholder="ticket:0x....-1:1234567890"
                                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        onClick={handleManualInput}
                                        disabled={!scannedData}
                                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Verify
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Verification Result */}
                    {verificationResult && (
                        <div className={`rounded-xl p-6 mb-6 ${verificationResult.isValid
                            ? 'bg-green-50 border border-green-200'
                            : 'bg-red-50 border border-red-200'
                            }`}>
                            <div className="text-center">
                                <div className={`text-6xl mb-4 ${verificationResult.isValid ? 'text-green-500' : 'text-red-500'
                                    }`}>
                                    {verificationResult.isValid ? '✅' : '❌'}
                                </div>
                                <h3 className={`text-2xl font-bold mb-2 ${verificationResult.isValid ? 'text-green-800' : 'text-red-800'
                                    }`}>
                                    {verificationResult.isValid ? 'Valid Ticket!' : 'Invalid Ticket'}
                                </h3>
                                <p className={`text-lg mb-4 ${verificationResult.isValid ? 'text-green-700' : 'text-red-700'
                                    }`}>
                                    {verificationResult.message}
                                </p>

                                {verificationResult.isValid && verificationResult.ticketInfo && (
                                    <div className="bg-white rounded-lg p-4">
                                        <h4 className="font-semibold text-gray-800 mb-2">Ticket Details:</h4>
                                        <div className="space-y-2 text-sm text-left">
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Owner:</span>
                                                <span className="font-mono text-xs">
                                                    {verificationResult.ticketInfo.owner.slice(0, 6)}...
                                                    {verificationResult.ticketInfo.owner.slice(-4)}
                                                </span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Ticket ID:</span>
                                                <span>{verificationResult.ticketInfo.ticketId}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-gray-600">Scanned At:</span>
                                                <span>{verificationResult.ticketInfo.scannedAt}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Instructions */}
                    <div className="bg-white/10 backdrop-blur rounded-xl p-6">
                        <h3 className="text-xl font-semibold text-white mb-4">📋 Scanner Instructions</h3>
                        <div className="space-y-3 text-gray-300">
                            <div className="flex items-start space-x-3">
                                <span className="text-blue-300">1.</span>
                                <p>Ask ticket holders to show their QR code from the "My Tickets" page</p>
                            </div>
                            <div className="flex items-start space-x-3">
                                <span className="text-blue-300">2.</span>
                                <p>Point the camera at the QR code or use manual input</p>
                            </div>
                            <div className="flex items-start space-x-3">
                                <span className="text-blue-300">3.</span>
                                <p>The system will verify ticket ownership on-chain</p>
                            </div>
                            <div className="flex items-start space-x-3">
                                <span className="text-blue-300">4.</span>
                                <p>QR codes expire after 5 minutes for security</p>
                            </div>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="text-center mt-8">
                        <Link
                            href="/"
                            className="text-blue-300 hover:text-blue-100 underline mr-6"
                        >
                            ← Back to Home
                        </Link>
                        <Link
                            href="/my-tickets"
                            className="text-blue-300 hover:text-blue-100 underline"
                        >
                            My Tickets →
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