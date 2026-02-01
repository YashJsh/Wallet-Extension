import React, { useEffect, useState } from 'react';
import { ChevronLeft, Copy, Eye, EyeOff, Key, ShieldAlert } from 'lucide-react';
import { copy } from '@/lib/copyToClipboard';
import { useUIStore } from '@/store/uiStore';
import keyring from '@/background/keyring';
import { Keypair, type PublicKey } from '@solana/web3.js';

export const SpecificWalletAccount = () => {
  const [showSensitive, setShowSensitive] = useState(false);
  const { selectedWallet, setScreen } = useUIStore();
  const [pair, setPair] = useState<{
  publicKey: PublicKey;
  secretKey: Uint8Array;
} | null>(null);


  useEffect(()=>{
    const wallet = keyring.getKeyPair(selectedWallet!);
    if (!wallet){
        return;
    }
    setPair(wallet);
  }, [selectedWallet])

  return (
    <div className="w-[360px] h-[600px] bg-[#1a1b1e] flex flex-col p-6 font-sans text-white relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button onClick={()=>{
            setScreen('INFO')
        }} className="w-10 h-10 -ml-2 flex items-center justify-center rounded-full hover:bg-white/5 transition text-gray-400">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold">Wallet</h1>
      </div>

      <div className="flex-1 space-y-5 overflow-y-auto pr-1">
        
        {/* Public Key Section */}
        <div className="space-y-2">
          <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Public Key</label>
          <div className="bg-[#131417] p-4 rounded-2xl border border-white/5 flex items-center justify-between group">
            <p className="text-xs font-mono text-gray-300 break-all leading-relaxed mr-4">
              {selectedWallet}
            </p>
            <button onClick={() => copy(selectedWallet!)} className="shrink-0 text-gray-600 hover:text-blue-400 transition">
              <Copy size={16} />
            </button>
          </div>
        </div>

        {/* Sensitive Info Section */}
        <div className="space-y-2 pt-2">
          <div className="flex justify-between items-center ml-1">
            <label className="text-[10px] font-black text-red-500/80 uppercase tracking-widest flex items-center gap-1">
              <ShieldAlert size={10} /> Sensitive Info
            </label>
            <button 
              onClick={() => setShowSensitive(!showSensitive)}
              className="text-[10px] font-bold text-blue-500 hover:text-blue-400 transition uppercase"
            >
              {showSensitive ? "Hide Info" : "Reveal Info"}
            </button>
          </div>

          {/* Private Key */}
          <div className="bg-[#131417] p-4 rounded-2xl border border-white/5 space-y-2 relative">
             <span className="text-[9px] font-bold text-gray-600 uppercase tracking-wider">Private Key</span>
             <div className="flex items-center justify-between">
                <p className={`text-xs font-mono break-all transition-all duration-300 ${showSensitive ? 'text-gray-300 blur-0' : 'text-transparent blur-md select-none'}`}>
                    {Buffer.from(pair?.secretKey!).toString('hex')}
                </p>
                {showSensitive && (
                  <button onClick={() => copy(Buffer.from(pair?.secretKey!).toString('hex'))} className="text-gray-600 hover:text-blue-400">
                    <Copy size={16} />
                  </button>
                )}
             </div>
          </div>

          {/* Mnemonic Phrase */}
          {/* <div className="bg-[#131417] p-4 rounded-2xl border border-white/5 space-y-3 relative">
             <span className="text-[9px] font-bold text-gray-600 uppercase tracking-wider">Recovery Phrase</span>
             <div className={`grid grid-cols-3 gap-2 transition-all duration-300 ${showSensitive ? 'blur-0' : 'blur-md select-none'}`}>
                {.mnemonic.split(' ').map((word, i) => (
                  <div key={i} className="bg-white/5 rounded-lg p-1.5 flex gap-2">
                    <span className="text-[9px] text-gray-600 font-bold">{i + 1}</span>
                    <span className="text-[11px] font-medium">{word}</span>
                  </div>
                ))}
             </div>
          </div> */}
        </div>
      </div>

      {/* Safety Warning */}
      <div className="mt-4 p-4 bg-red-500/5 border border-red-500/10 rounded-2xl">
        <p className="text-[10px] text-red-400/80 leading-normal text-center">
          <strong>NEVER</strong> share your Private Key or Recovery Phrase. Turbo support will never ask for them.
        </p>
      </div>
    </div>
  );
};