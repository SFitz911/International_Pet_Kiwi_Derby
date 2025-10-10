import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
    title: 'International Pet Kiwi Derby - NFT Tickets',
    description: 'Web3 ticket system for the International Pet Kiwi Derby event',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Providers>
                    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
                        <nav className="bg-white shadow-sm border-b">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="flex justify-between h-16">
                                    <div className="flex items-center">
                                        <h1 className="text-xl font-bold text-gray-900">
                                            🥝 International Pet Kiwi Derby
                                        </h1>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <a href="/" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                                            Mint
                                        </a>
                                        <a href="/my-tickets" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                                            My Tickets
                                        </a>
                                        <a href="/scanner" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                                            Scanner
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </nav>
                        <main className="py-8">
                            {children}
                        </main>
                    </div>
                </Providers>
            </body>
        </html>
    )
}