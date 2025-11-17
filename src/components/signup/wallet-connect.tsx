import { AccountRole, ProfileFormValues } from "@/types/sigup.types";

interface WalletConnectProps {
  role: AccountRole;
  profileData: ProfileFormValues;
  onConnect: () => void;
  isLoading?: boolean;
}

export default function WalletConnect({
  role,
  onConnect,
  isLoading = false,
}: WalletConnectProps) {
  const isCurator = role === "curator";

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-white rounded-2xl border border-gray-200 p-8 shadow-sm">
        <h1 className="text-2xl font-bold mb-3 text-gray-900">
          Connect Your Wallet
        </h1>
        <p className="text-gray-600 text-sm mb-4">
          You need to connect your wallet to access the curator dashboard
        </p>

        <p className="text-gray-700 text-sm leading-relaxed mb-6">
          {isCurator
            ? "As a curator, you'll be able to add and verify artisans on the platform. Premium curators can verify artisans for additional trust."
            : "As a finder, you'll be able to discover and find artisans that match your preferences."}
        </p>

        {/* Connect Wallet Button */}
        <button
          onClick={onConnect}
          disabled={isLoading}
          className={`
            w-full py-3 rounded-full font-semibold transition-all text-base
            ${
              isLoading
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }
          `}
        >
          {isLoading ? "Connecting..." : "Connect Wallet"}
        </button>
      </div>
    </div>
  );
}
