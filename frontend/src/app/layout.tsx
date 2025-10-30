import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WagmiProvider } from './WagmiProvider';
import { ThemeProvider } from 'next-themes';
import ErrorBoundary from './components/ErrorBoundary';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RealYield",
  description: "Compliant On-Chain Yield Vaults for Real-World Assets on Mantle",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class">
          <ErrorBoundary>
            <WagmiProvider>
              {children}
            </WagmiProvider>
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
