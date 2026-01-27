'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { Horizon, Networks, Asset, TransactionBuilder, Operation, Memo, BASE_FEE } from '@stellar/stellar-sdk';
import { ISupportedWallet } from "@creit.tech/stellar-wallets-kit";
import { kit as getKitInstance } from '@/lib/stellar-wallets-kit';

const Server = Horizon.Server;

export interface Balance {
  balance: string;
  asset_type: string;
  asset_code?: string;
  asset_issuer?: string;
}

export interface PaymentOptions {
  to: string;
  amount: string;
  asset?: 'XLM' | { code: string; issuer: string };
  memo?: string;
  secret?: string;
}

interface WalletContextState {
  connected: boolean;
  publicKey?: string;
  walletName?: string;
  balances: Balance[];
  connect: (walletId?: string) => Promise<void>; // Updated signature
  disconnect: () => void;
  refreshBalances: () => Promise<void>;
  sendPayment?: (opts: PaymentOptions) => Promise<Horizon.HorizonApi.SubmitTransactionResponse>;
}

interface WalletConfigContextState {
  horizonUrl: string;
  network: string;
}

const WalletContext = createContext<WalletContextState | undefined>(undefined);
const WalletConfigContext = createContext<WalletConfigContextState | undefined>(undefined);

export function WalletProvider({
  children,
  horizonUrl = 'https://horizon-testnet.stellar.org',
  network = Networks.TESTNET
}: { children: ReactNode; horizonUrl?: string; network?: string }) {
  const [connected, setConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string>();
  const [walletName, setWalletName] = useState<string>();
  const [balances, setBalances] = useState<Balance[]>([]);
  const [server] = useState(() => new Server(horizonUrl));

  const handleWalletSelection = useCallback(async (id: string, name: string) => {
    const kit = getKitInstance();
    kit.setWallet(id);
    const { address } = await kit.getAddress();

    setPublicKey(address);
    setWalletName(name);
    setConnected(true);

    if (typeof window !== 'undefined') {
      localStorage.setItem('stellar_wallet_connected', 'true');
      localStorage.setItem('stellar_wallet_id', id);
      localStorage.setItem('stellar_wallet_address', address);
      localStorage.setItem('stellar_wallet_name', name);
    }

    try {
      const account = await server.accounts().accountId(address).call();
      setBalances(account.balances);
    } catch (e) {
      setBalances([]);
    }
  }, [server]);

  const connect = useCallback(async (walletId?: string) => {
    try {
      const kit = getKitInstance();
      
      if (walletId) {
        // Direct Connection (No Modal)
        // Find the module name for the UI state
        const modules = (kit as any).options?.modules || [];
        const target = modules.find((m: any) => m.id === walletId);
        await handleWalletSelection(walletId, target?.name || walletId);
      } else {
        // Fallback to Modal
        await kit.openModal({
          modalTitle: "Connect to your favorite wallet",
          onWalletSelected: async (option: ISupportedWallet) => {
            await handleWalletSelection(option.id, option.name);
          },
        });
      }
    } catch (error: any) {
      // Improve visibility into what the SDK is actually throwing
      console.error("Connection failed raw value:", error);
      console.error("Connection failed details:", {
        message: error?.message,
        code: error?.code,
        name: error?.name,
        stack: error?.stack,
      });
      try {
        console.error("Connection failed JSON:", JSON.stringify(error));
      } catch {
        // ignore JSON stringify errors
      }

      // Always rethrow an Error instance so callers get a consistent shape
      throw error instanceof Error
        ? error
        : new Error(error?.message || "Wallet connection failed");
    }
  }, [handleWalletSelection]);

  const disconnect = useCallback(async () => {
    await getKitInstance().disconnect();
    setConnected(false);
    setPublicKey(undefined);
    setWalletName(undefined);
    setBalances([]);
    localStorage.clear();
  }, []);

  const refreshBalances = useCallback(async () => {
    if (!publicKey) return;
    try {
      const account = await server.accounts().accountId(publicKey).call();
      setBalances(account.balances);
    } catch (e) {
      setBalances([]);
    }
  }, [publicKey, server]);

  return (
    <WalletConfigContext.Provider value={{ horizonUrl, network }}>
      <WalletContext.Provider value={{ connected, publicKey, walletName, balances, connect, disconnect, refreshBalances }}>
        {children}
      </WalletContext.Provider>
    </WalletConfigContext.Provider>
  );
}

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) throw new Error('useWallet must be used within WalletProvider');
  return context;
};