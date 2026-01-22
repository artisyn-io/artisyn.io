import {
    StellarWalletsKit,
    WalletNetwork,
    allowAllModules,
    FREIGHTER_ID,
    ALBEDO_ID,
  } from "@creit.tech/stellar-wallets-kit";
  
  // Initialize Stellar Wallets Kit with Freighter and Albedo support
  export const kit = new StellarWalletsKit({
    network: WalletNetwork.TESTNET, // Change to MAINNET for production
    selectedWalletId: FREIGHTER_ID,
    modules: allowAllModules(),
  });
  
  // Export wallet IDs for reference
  export { FREIGHTER_ID, ALBEDO_ID };