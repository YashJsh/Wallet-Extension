import { useState } from 'react';
import { ChevronLeft, Eye, Copy, AlertTriangle, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useUIStore } from '@/store/uiStore';
import keyring from '@/background/keyring';

export const MnemonicDisplay = () => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [copied, setCopied] = useState(false);
  const {setScreen} = useUIStore();

  const data = keyring;
  const mnemonic = data.generateMnemonic();

  const words = mnemonic.split(" ");

  // Example mnemonic phrase
  const handleCopy = () => {
    navigator.clipboard.writeText(words.join(" "));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-[360px] h-[600px] bg-[#1a1b1e] flex flex-col p-6 font-sans text-white relative overflow-hidden">
      
      {/* Back Button */}
      <button className="w-10 h-10 -ml-2 flex items-center justify-center rounded-full hover:bg-white/5 transition text-gray-400">
        <ChevronLeft size={24} />
      </button>

      {/* Header Section */}
      <div className="mt-4 mb-6">
        <h1 className="text-2xl font-bold mb-2">Secret Recovery Phrase</h1>
        <p className="text-gray-400 text-xs leading-relaxed">
          This phrase is the <span className="text-blue-400 font-bold">ONLY</span> way to recover your wallet. Write it down and store it safely.
        </p>
      </div>

      {/* Mnemonic Grid Container */}
      <div className="relative group flex-1">
        <div className={`grid grid-cols-3 gap-2 transition-all duration-500 ${!isRevealed ? 'blur-md select-none scale-[0.98]' : 'blur-0'}`}>
          {words.map((word, index) => (
            <div 
              key={index} 
              className="bg-[#131417] border border-gray-800 rounded-xl p-2.5 flex items-center gap-2"
            >
              <span className="text-[10px] text-gray-600 font-mono w-4">{index + 1}</span>
              <span className="text-sm font-medium text-gray-200">{word}</span>
            </div>
          ))}
        </div>

        {/* Reveal Overlay */}
        {!isRevealed && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#1a1b1e]/40 rounded-2xl backdrop-blur-sm border border-white/5">
            <button 
              onClick={() => setIsRevealed(true)}
              className="flex flex-col items-center gap-3 group/btn"
            >
              <div className="p-4 bg-blue-600 rounded-full shadow-lg shadow-blue-900/40 group-hover/btn:scale-110 transition-transform">
                <Eye size={24} />
              </div>
              <span className="text-sm font-bold tracking-wide">Click to reveal</span>
            </button>
          </div>
        )}
      </div>

      {/* Warning Box */}
      <div className="mt-6 p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex gap-3">
        <AlertTriangle size={18} className="text-amber-500 shrink-0" />
        <p className="text-[11px] text-amber-200/80 leading-normal">
          Never share this phrase. Anyone with these words can take your funds forever.
        </p>
      </div>

      {/* Footer Actions */}
      <div className="mt-6 space-y-3">
        <button 
          onClick={handleCopy}
          className="w-full flex items-center justify-center gap-2 py-2 text-sm font-semibold text-gray-400 hover:text-white transition"
        >
          {copied ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
          {copied ? "Copied to clipboard" : "Copy to clipboard"}
        </button>

        <Button 
          disabled={!isRevealed}
          className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-2xl disabled:opacity-50 transition-all"
          onClick={()=>{
            setScreen("CREATEPASSWORD")
          }}
        >
          I've saved it safely
        </Button>
      </div>

    </div>
  );
};

export default MnemonicDisplay;