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
  ;

type AppStatus = "BOOTING" | "LOCKED" | "UNLOCKED";

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
};

export const useUIStore = create<UIState>((set) => ({
  screen: "ONBOARDING",
  appStatus: "BOOTING",
  loading: false,

  publicKey: null,
  balance: 0,

  setScreen: (screen) => set({ screen }),
  setLoading: (loading) => set({ loading }),

  setPublicKey: (publicKey) =>
    set({ publicKey }),

  setBalance: (balance) =>
    set({ balance }),

  setAppStatus: (appStatus) =>
    set({ appStatus }),
}));
