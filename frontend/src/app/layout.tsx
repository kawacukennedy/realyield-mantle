import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WagmiProvider } from './WagmiProvider';
import ErrorBoundary from './components/ErrorBoundary';
import Toast from './components/Toast';
import ClientWrapper from './components/ClientWrapper';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RealYield - Compliant On-Chain Yield Vaults",
  description: "Tokenize real-world cash flows, pool into KYC-gated yield vaults, distribute audited yield on Mantle. Secure, compliant, and privacy-focused.",
  keywords: "DeFi, RWA, Yield Vaults, Mantle, Blockchain, KYC, Compliance",
  authors: [{ name: "RealYield Team" }],
  creator: "RealYield",
  publisher: "RealYield",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://realyield.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "RealYield - Compliant On-Chain Yield Vaults",
    description: "Tokenize real-world cash flows, pool into KYC-gated yield vaults, distribute audited yield on Mantle.",
    url: 'https://realyield.vercel.app',
    siteName: 'RealYield',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'RealYield - Compliant On-Chain Yield Vaults',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "RealYield - Compliant On-Chain Yield Vaults",
    description: "Tokenize real-world cash flows, pool into KYC-gated yield vaults, distribute audited yield on Mantle.",
    images: ['/og-image.png'],
    creator: '@realyield',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
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
        <ErrorBoundary>
          <WagmiProvider>
            <ClientWrapper>
              {children}
              <Toast />
            </ClientWrapper>
          </WagmiProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
