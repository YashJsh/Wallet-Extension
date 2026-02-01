import { ChevronRight, Plus, Wallet, ShieldCheck, Copy, ChevronLeft } from 'lucide-react';
import keyring from '@/background/keyring';
import { useUIStore } from '@/store/uiStore';

export const WalletManager = () => {
    const keys = keyring.getAllWallets();
    const { setScreen, setSelectedWallet } = useUIStore();

  return (
    <div className="w-[360px] h-[600px] bg-[#1a1b1e] flex flex-col p-6 font-sans text-white relative">
        
      <div className="mb-8">
        <div className='flex items-center gap-2 '>
            <ChevronLeft size={20} onClick={()=>{
                setScreen("HOME")
            }}/>
            <h1 className="text-2xl font-bold tracking-tight">Your Wallets</h1>
        </div>
        
        <p className="text-gray-500 text-xs mt-1">Manage and view your Turbo accounts</p>
      </div>

      {/* Wallet List */}
      <div className="flex-1 space-y-3 overflow-y-auto pr-1 scrollbar-hide">
        {keys.map((key, index) => (
          <button 
            key={index}
            className="w-full group bg-[#131417] hover:bg-[#25262b] border border-white/5 p-4 rounded-2xl flex items-center justify-between transition-all active:scale-[0.98]
            "
            onClick={()=>{
                setSelectedWallet(key);
                setScreen("SPECIFIC_ACCOUNT");
            }}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-blue-600/10 rounded-xl flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Wallet size={20} />
              </div>
              <div className="text-left">
                <h3 className="text-sm font-bold">{index}</h3>
                <span className="text-[10px] font-mono text-gray-500 uppercase tracking-tighter">
                  {key.slice(0, 6)}...{key.slice(-4)}
                </span>
              </div>
            </div>
            <ChevronRight size={18} className="text-gray-700 group-hover:text-white transition-colors" />
          </button>
        ))}
      </div>

      {/* Add New Wallet Button */}
      <div className="pt-6 pb-2">
        <button 
          className="w-full h-14 bg-[#25262b] hover:bg-[#2c2d33] border border-dashed border-gray-700 rounded-2xl flex items-center justify-center gap-2 group transition-all"
        >
          <div className="p-1 bg-gray-800 rounded-lg group-hover:bg-blue-600 transition-colors">
            <Plus size={16} />
          </div>
          <span className="text-sm font-bold text-gray-400 group-hover:text-white">Create New Wallet</span>
        </button>
      </div>
    </div>
  );
};