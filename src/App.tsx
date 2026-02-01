import './App.css'
import ConfirmTransaction from './components/flows/sign/confirmSwap'
import MnemonicDisplay from './components/flows/onboarding/createMnemonic'
import Dashboard from './components/views/dashboard'
import CreatePassword from './components/flows/onboarding/password'
import SwapPage from './components/views/swaptoken'
import WalletSetupOptions from './components/views/wallet'
import { Welcome } from './components/flows/onboarding/welcome'
import { useUIStore } from './store/uiStore'
import { useEffect } from 'react'
import UnlockWallet from './components/flows/auth/unlock'
import SendToken from './components/views/sendToken'


function App(){
  const {screen, appStatus, setScreen, setAppStatus} = useUIStore();

   useEffect(() => {
    const vaultExists = localStorage.getItem("Passcode");

    if (vaultExists) {
      setAppStatus("LOCKED");
      setScreen("UNLOCK");
    } else {
      setAppStatus("UNLOCKED");
      setScreen("ONBOARDING");
    }
  }, []);

  if (appStatus === "BOOTING") {
    return <div className="text-white">Loading…</div>;
  }

  switch (screen) {
    case "ONBOARDING":
      return <Welcome />;
    case "CREATEPASSWORD":
      return <CreatePassword />;
    case "WALLETSETUP":
      return <WalletSetupOptions />;
    case "MNEMONICDISPLAY":
      return <MnemonicDisplay />;
    case "HOME":
      return <Dashboard/>
    case "SWAP":
      return <SwapPage />;
    case "APPROVE":
      return <ConfirmTransaction />;
    case "UNLOCK":
      return <UnlockWallet />
    case "SENDTOKEN":
      return <SendToken/>
    default:
      return null;
  }
}

export default App
