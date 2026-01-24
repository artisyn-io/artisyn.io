"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "../../../context/WalletProvider";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function ConnectWalletPage() {
  const router = useRouter();
  const { isConnected, connectWallet, isLoading } = useWallet();
  const [connectingWallet, setConnectingWallet] = useState<string | null>(null);
  const [hoveredWallet, setHoveredWallet] = useState<string | null>(null);

  // Redirect if already connected
  useEffect(() => {
    if (isConnected && !isLoading) {
      router.push("/account-type");
    }
  }, [isConnected, isLoading, router]);

  const handleWalletConnect = async (walletType: 'freighter' | 'albedo' | 'lobstr') => {
    try {
      setConnectingWallet(walletType);
      await connectWallet(walletType);
      // Redirect happens automatically via useEffect
    } catch (error) {
      console.error(`${walletType} connection failed:`, error);
      setConnectingWallet(null);
    }
  };

  // Show loading state while checking connection
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-white">
      {/* Left Side - Connect Wallet Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md space-y-8">
          {/* Logo */}
          <div className="flex justify-start">
            <Image
              src="/Logo.png"
              alt="Artisyn.io"
              width={120}
              height={40}
              className="h-10 w-auto"
            />
          </div>

          {/* Welcome Message */}
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-slate-900">
              Connect your wallet
            </h1>
            <p className="text-slate-600">
              Connect a wallet to secure your account and enable trusted interactions on Artisyn.
            </p>
          </div>

          {/* Wallet Container with Blue Background */}
          <div className="bg-blue-50 rounded-lg p-2">
            {/* Clickable Wallet Options - Small gaps between */}
            <div className="space-y-2">
              {/* Freighter Wallet Card */}
              <button
                onClick={() => handleWalletConnect('freighter')}
                onMouseEnter={() => setHoveredWallet('freighter')}
                onMouseLeave={() => setHoveredWallet(null)}
                disabled={connectingWallet !== null}
                className={`w-full flex items-center gap-3 p-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative ${
                  hoveredWallet === 'freighter' || connectingWallet === 'freighter'
                    ? 'bg-white'
                    : 'bg-transparent'
                }`}
              >
                {/* Blue indicator bar */}
                {(hoveredWallet === 'freighter' || connectingWallet === 'freighter') && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 bg-blue-600 rounded-r"></div>
                )}
                <div className="h-10 w-10 rounded-lg flex items-center justify-center shrink-0">
                  <Image
                    src="/wallets/freighter-logo.png"
                    alt="Freighter"
                    width={40}
                    height={40}
                    className="h-10 w-10 object-contain"
                  />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-sm text-slate-900">
                    Freighter
                  </p>
                </div>
                {hoveredWallet === 'freighter' && connectingWallet !== 'freighter' && (
                  <span className="text-sm font-medium text-blue-600">Connect</span>
                )}
                {connectingWallet === 'freighter' && (
                  <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                )}
              </button>

              {/* Albedo Wallet Card */}
              <button
                onClick={() => handleWalletConnect('albedo')}
                onMouseEnter={() => setHoveredWallet('albedo')}
                onMouseLeave={() => setHoveredWallet(null)}
                disabled={connectingWallet !== null}
                className={`w-full flex items-center gap-3 p-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative ${
                  hoveredWallet === 'albedo' || connectingWallet === 'albedo'
                    ? 'bg-white'
                    : 'bg-transparent'
                }`}
              >
                {/* Blue indicator bar */}
                {(hoveredWallet === 'albedo' || connectingWallet === 'albedo') && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 bg-blue-600 rounded-r"></div>
                )}
                <div className="h-10 w-10 rounded-lg flex items-center justify-center shrink-0">
                  <Image
                    src="/wallets/albedo-logo.png"
                    alt="Albedo"
                    width={40}
                    height={40}
                    className="h-10 w-10 object-contain"
                  />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-sm text-slate-900">
                    Albedo
                  </p>
                </div>
                {hoveredWallet === 'albedo' && connectingWallet !== 'albedo' && (
                  <span className="text-sm font-medium text-blue-600">Connect</span>
                )}
                {connectingWallet === 'albedo' && (
                  <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                )}
              </button>

              {/* Lobstr Wallet Card */}
              <button
                onClick={() => handleWalletConnect('lobstr')}
                onMouseEnter={() => setHoveredWallet('lobstr')}
                onMouseLeave={() => setHoveredWallet(null)}
                disabled={connectingWallet !== null}
                className={`w-full flex items-center gap-3 p-4 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed relative ${
                  hoveredWallet === 'lobstr' || connectingWallet === 'lobstr'
                    ? 'bg-white'
                    : 'bg-transparent'
                }`}
              >
                {/* Blue indicator bar */}
                {(hoveredWallet === 'lobstr' || connectingWallet === 'lobstr') && (
                  <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 bg-blue-600 rounded-r"></div>
                )}
                <div className="h-10 w-10 rounded-lg flex items-center justify-center shrink-0">
                  <Image
                    src="/wallets/lobstr-logo.png"
                    alt="Lobstr"
                    width={40}
                    height={40}
                    className="h-10 w-10 object-contain"
                  />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-sm text-slate-900">
                    Lobstr
                  </p>
                </div>
                {hoveredWallet === 'lobstr' && connectingWallet !== 'lobstr' && (
                  <span className="text-sm font-medium text-blue-600">Connect</span>
                )}
                {connectingWallet === 'lobstr' && (
                  <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                )}
              </button>
            </div>

            {/* Privacy Notice - Black Background Attached to Container */}
            <div className="bg-black p-4">
              <p className="text-xs text-center text-white">
                By connecting your wallet, you agree to our{" "}
                <a href="/terms" className="text-pink-500 hover:underline">
                  Terms and Conditions
                </a>{" "}
                and our{" "}
                <a href="/privacy" className="text-pink-500 hover:underline">
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>

          {/* Warning Section - Below Privacy */}
          <div className="bg-white border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <div className="shrink-0 mt-0.5">
                <svg
                  className="h-5 w-5 text-slate-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex-1 space-y-1 text-xs text-slate-600">
                <p>• We'll never access your funds</p>
                <p>• Used only for account identity and platform actions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src="/artisyn.jpg"
          alt="Artisyn Platform"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}