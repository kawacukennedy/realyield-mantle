import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { WagmiProvider } from './WagmiProvider';
import ErrorBoundary from './components/ErrorBoundary';
import Toast from './components/Toast';
import ClientWrapper from './components/ClientWrapper';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
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
  other: {
    'theme-color': '#00BFFF',
    'color-scheme': 'dark light',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0E141B' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&display=swap"
          as="style"
          onLoad="this.onload=null;this.rel='stylesheet'"
        />
        <noscript>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Geist+Mono:wght@100..900&display=swap"
          />
        </noscript>
        {/* Preload critical assets */}
        <link rel="dns-prefetch" href="//ipfs.io" />
        <link rel="dns-prefetch" href="//gateway.ipfs.io" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-bg-dark text-text`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-white focus:rounded-md focus:shadow-lg"
        >
          Skip to main content
        </a>
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
