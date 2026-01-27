"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useWallet } from "../../../context/WalletProvider";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function ConnectWalletPage() {
  const router = useRouter();
  const { connected, connect } = useWallet();
  const [connectingWallet, setConnectingWallet] = useState<string | null>(null);
  const [hoveredWallet, setHoveredWallet] = useState<string | null>(null);

  useEffect(() => {
    if (connected) {
      router.push("/account-type");
    }
  }, [connected, router]);

  const handleWalletConnect = async (walletId: 'freighter' | 'albedo' | 'lobstr') => {
    try {
      setConnectingWallet(walletId);
      // This now calls the direct connection logic in our Provider
      await connect(walletId); 
    } catch (error) {
      console.error(`${walletId} connection failed:`, error);
      setConnectingWallet(null);
    }
  };

  const walletOptions = [
    { id: 'freighter', name: 'Freighter', logo: '/wallets/freighter-logo.png' },
    { id: 'albedo', name: 'Albedo', logo: '/wallets/albedo-logo.png' },
    { id: 'lobstr', name: 'Lobstr', logo: '/wallets/lobstr-logo.png' },
  ] as const;

  return (
    <div className="min-h-screen flex bg-white">
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md space-y-8">
          <Image src="/Logo.png" alt="Artisyn.io" width={120} height={40} className="h-10 w-auto" />
          
          <div className="space-y-3">
            <h1 className="text-3xl font-bold text-slate-900">Connect your wallet</h1>
            <p className="text-slate-600">Connect a wallet to secure your account and enable trusted interactions.</p>
          </div>

          <div className="bg-blue-50 rounded-lg p-2 overflow-hidden">
            <div className="space-y-2">
              {walletOptions.map((wallet) => (
                <button
                  key={wallet.id}
                  onClick={() => handleWalletConnect(wallet.id)}
                  onMouseEnter={() => setHoveredWallet(wallet.id)}
                  onMouseLeave={() => setHoveredWallet(null)}
                  disabled={connectingWallet !== null}
                  className={`w-full flex items-center gap-3 p-4 rounded-lg transition-all duration-200 relative ${
                    hoveredWallet === wallet.id || connectingWallet === wallet.id ? 'bg-white' : 'bg-transparent'
                  }`}
                >
                  {(hoveredWallet === wallet.id || connectingWallet === wallet.id) && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-10 bg-blue-600 rounded-r" />
                  )}
                  <Image src={wallet.logo} alt={wallet.name} width={40} height={40} className="h-10 w-10 object-contain" />
                  <div className="flex-1 text-left font-medium text-sm text-slate-900">{wallet.name}</div>
                  
                  {connectingWallet === wallet.id ? (
                    <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
                  ) : hoveredWallet === wallet.id ? (
                    <span className="text-sm font-medium text-blue-600">Connect</span>
                  ) : null}
                </button>
              ))}
            </div>

            <div className="bg-black p-4 -mx-2 -mb-2 mt-2">
              <p className="text-xs text-center text-white">
                By connecting your wallet, you agree to our{" "}
                <a href="/terms" className="text-pink-500 hover:underline">Terms and Conditions</a> and{" "}
                <a href="/privacy" className="text-pink-500 hover:underline">Privacy Policy</a>
              </p>
            </div>
          </div>

          <div className="bg-white border border-blue-200 rounded-lg p-4">
            <div className="flex items-start gap-3 text-xs text-slate-600">
              <div className="flex-1 space-y-1">
                <p>• We'll never access your funds</p>
                <p>• Used only for account identity and platform actions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image src="/artisyn.jpg" alt="Artisyn" fill className="object-cover" priority />
      </div>
    </div>
  );
}