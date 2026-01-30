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

type UIState = {
  screen: Screen;
  setScreen: (s: Screen) => void;
  loading: boolean;
  setLoading: (v: boolean) => void;
};

export const useUIStore = create<UIState>((set) => ({
  screen: "ONBOARDING",
  loading: false,
  setScreen: (screen) => set({ screen }),
  setLoading: (loading) => set({ loading }),
}));