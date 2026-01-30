import './App.css'
import ConfirmTransaction from './components/confirmSwap'
import MnemonicDisplay from './components/createMnemonic'
import Dashboard from './components/dasboard'
import CreatePassword from './components/password'
import SwapPage from './components/swaptoken'
import WalletSetupOptions from './components/wallet'
import { Welcome } from './components/welcome'
import { useUIStore } from './store/ui.store'


function App(){
  const {screen} = useUIStore();

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
    default:
      return null;
  }

  return (
    <div>
      <Welcome/>
      <CreatePassword/>
      <WalletSetupOptions/>
      <MnemonicDisplay/>
      <Dashboard/>
      <SwapPage/>
      <ConfirmTransaction/>
    </div>
  )
}

export default App
