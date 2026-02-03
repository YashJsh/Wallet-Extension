import { create } from "zustand";

type Screen =
  | "ONBOARDING"
  | "CREATEPASSWORD"
  | "WALLETSETUP"
  | "MNEMONICDISPLAY"
  | "UNLOCK"
  | "HOME"
  | "SEND"
  | "RECIEVE"
  | "SWAP"
  | "APPROVE"
  | "SENDTOKEN"
  | "INFO"
  | "SPECIFIC_ACCOUNT"
  ;

type AppStatus = "BOOTING" | "LOCKED" | "UNLOCKED";
export type AppNetwork = "MAINNET" | "DEVNET";

type UIState = {
  screen: Screen;
  setScreen: (s: Screen) => void;

  appStatus: AppStatus;
  setAppStatus: (s: AppStatus) => void;

  loading: boolean;
  setLoading: (v: boolean) => void;

  publicKey: string | null;
  setPublicKey: (publicKey: string) => void;

  balance: number;
  setBalance: (balance: number) => void;

  selectedWallet : string | null;
  setSelectedWallet : (publicKey : string)=> void;

  network : AppNetwork;
  setNetwork : (s : AppNetwork)=>void
};

export const useUIStore = create<UIState>((set) => ({
  screen: "ONBOARDING",
  appStatus: "BOOTING",
  loading: false,

  publicKey: null,
  balance: 0,
  selectedWallet : null,

  network : "MAINNET",

  setNetwork : (network : AppNetwork) => set({network : network}),
  setScreen: (screen) => set({ screen }),
  setLoading: (loading) => set({ loading }),

  setPublicKey: (publicKey) =>
    set({ publicKey }),

  setBalance: (balance) =>
    set({ balance }),

  setAppStatus: (appStatus) =>
    set({ appStatus }),

  setSelectedWallet : (publicKey : string)=>{
    set({
      selectedWallet : publicKey
    })
  }
}));

