"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { kit, FREIGHTER_ID, ALBEDO_ID } from "../lib/stellar-wallets-kit";

interface WalletContextType {
  isConnected: boolean;
  publicKey: string | null;
  connect: () => Promise<void>;
  connectWallet: (walletType: 'freighter' | 'albedo' | 'lobstr') => Promise<void>;
  disconnect: () => void;
  isLoading: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Map wallet types to their IDs
const WALLET_IDS = {
  freighter: FREIGHTER_ID,
  albedo: ALBEDO_ID,
  lobstr: 'lobstr', // Lobstr ID
};

export function WalletProvider({ children }: { children: React.ReactNode }) {
  const [isConnected, setIsConnected] = useState(false);
  const [publicKey, setPublicKey] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Auto-restore wallet connection on mount
  useEffect(() => {
    const restoreConnection = async () => {
      try {
        const storedPublicKey = localStorage.getItem("walletPublicKey");
        const storedWalletId = localStorage.getItem("walletId");

        if (storedPublicKey && storedWalletId) {
          setPublicKey(storedPublicKey);
          setIsConnected(true);
        }
      } catch (error) {
        console.error("Failed to restore wallet connection:", error);
        localStorage.removeItem("walletPublicKey");
        localStorage.removeItem("walletId");
      } finally {
        setIsLoading(false);
      }
    };

    restoreConnection();
  }, []);

  // Connect to a specific wallet directly
  const connectWallet = async (walletType: 'freighter' | 'albedo' | 'lobstr') => {
    try {
      setIsLoading(true);
      
      const walletId = WALLET_IDS[walletType];
      
      // Set the wallet directly
      kit.setWallet(walletId);
      
      // Get public key from the wallet
      const { address } = await kit.getAddress();
      
      // Save to state and localStorage
      setPublicKey(address);
      setIsConnected(true);
      localStorage.setItem("walletPublicKey", address);
      localStorage.setItem("walletId", walletId);
      localStorage.setItem("walletType", walletType);
      
    } catch (error) {
      console.error(`Failed to connect to ${walletType}:`, error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Connect with modal (fallback)
  const connect = async () => {
    try {
      setIsLoading(true);
      
      // Open wallet selection modal
      await kit.openModal({
        onWalletSelected: async (option) => {
          try {
            // Set the selected wallet
            kit.setWallet(option.id);
            
            // Get public key from the wallet
            const { address } = await kit.getAddress();
            
            // Save to state and localStorage
            setPublicKey(address);
            setIsConnected(true);
            localStorage.setItem("walletPublicKey", address);
            localStorage.setItem("walletId", option.id);
          } catch (err) {
            console.error("Wallet connection error:", err);
            throw err;
          }
        },
      });
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = () => {
    setPublicKey(null);
    setIsConnected(false);
    localStorage.removeItem("walletPublicKey");
    localStorage.removeItem("walletId");
    localStorage.removeItem("walletType");
  };

  return (
    <WalletContext.Provider
      value={{ isConnected, publicKey, connect, connectWallet, disconnect, isLoading }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
}