import './App.css'
import ConfirmTransaction from './components/confirmSwap'
import MnemonicDisplay from './components/createMnemonic'
import Dashboard from './components/dasboard'
import CreatePassword from './components/password'
import SwapPage from './components/swaptoken'
import WalletSetupOptions from './components/wallet'
import WalletExtension from './components/walletExtension'
import { Welcome } from './components/welcome'

function App(){
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
