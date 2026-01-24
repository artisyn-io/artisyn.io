"use client";

import { useWallet } from "../../../context/WalletProvider";
import { Button } from "../../../components/ui/button";
import { useRouter } from "next/navigation";

export default function AccountTypePage() {
  const { publicKey, disconnect } = useWallet();
  const router = useRouter();

  const handleDisconnect = () => {
    disconnect();
    router.push("/connect-wallet");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-2">Account Type Selection</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Choose your account type to continue
          </p>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 space-y-4">
          <div className="text-sm">
            <p className="font-medium mb-1">Connected Wallet:</p>
            <p className="text-slate-600 dark:text-slate-400 break-all font-mono text-xs">
              {publicKey}
            </p>
          </div>

          <Button onClick={handleDisconnect} variant="outline" className="w-full">
            Disconnect Wallet
          </Button>
        </div>

        <p className="text-center text-sm text-slate-500">
          This is a placeholder page. The account type selection will be implemented in a future task.
        </p>
      </div>
    </div>
  );
}