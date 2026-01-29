import React from 'react';
import { 
  ChevronDown, 
  ScanLine, 
  Copy, 
  ArrowUpRight, 
  ArrowDownLeft, 
  RefreshCcw, 
  Wallet, 
  Clock, 
  Settings 
} from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="w-[360px] h-[600px] bg-[#1a1b1e] flex flex-col relative font-sans text-white overflow-hidden">
      
      {/* Top Header */}
      <header className="flex justify-between items-center p-6 shrink-0">
        <div className="w-10 h-10 flex items-center justify-center bg-[#131417] rounded-xl border border-white/5 cursor-pointer hover:bg-gray-800 transition">
          <Wallet size={20} className="text-gray-400" />
        </div>
        
        <button className="flex items-center gap-2 bg-[#131417] hover:bg-gray-800 px-4 py-2 rounded-full transition border border-white/5 shadow-inner">
          <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]"></div>
          <span className="font-bold text-xs tracking-wide">Arbitrum</span>
          <ChevronDown size={14} className="text-gray-500" />
        </button>

        <div className="w-10 h-10 flex items-center justify-center bg-[#131417] rounded-xl border border-white/5 cursor-pointer hover:bg-gray-800 transition">
          <ScanLine size={20} className="text-gray-400" />
        </div>
      </header>

      {/* Hero Balance Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 -mt-12">
        <div className="flex items-center gap-2 mb-4 px-3 py-1 bg-white/5 rounded-full border border-white/5 cursor-pointer hover:bg-white/10 transition group">
          <span className="text-[10px] font-mono text-gray-500 group-hover:text-gray-300">0x234F...2138</span>
          <Copy size={10} className="text-gray-600" />
        </div>

        <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.2em] mb-2">Total Balance</p>
        <h1 className="text-6xl font-black tracking-tighter mb-4">$4,234</h1>
        
        <div className="flex items-center gap-1.5 text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-lg border border-emerald-500/10">
          <span className="text-xs font-bold">+2.1%</span>
        </div>
      </div>

      {/* Main Action Buttons - Minimalist Row */}
      <div className="px-8 pb-32">
        <div className="grid grid-cols-3 gap-6">
          <div className="flex flex-col items-center gap-3">
            <button className="w-16 h-16 bg-blue-600 hover:bg-blue-500 text-white rounded-[22px] flex items-center justify-center shadow-lg shadow-blue-900/20 active:scale-90 transition-all cursor-pointer">
              <ArrowUpRight size={28} />
            </button>
            <span className="text-[10px] font-black tracking-widest text-gray-500">SEND</span>
          </div>

          <div className="flex flex-col items-center gap-3">
            <button className="w-16 h-16 bg-[#25262b] hover:bg-[#2c2d33] text-white rounded-[22px] flex items-center justify-center border border-white/5 shadow-xl active:scale-90 transition-all cursor-pointer">
              <ArrowDownLeft size={28} />
            </button>
            <span className="text-[10px] font-black tracking-widest text-gray-500">RECEIVE</span>
          </div>

          <div className="flex flex-col items-center gap-3">
            <button className="w-16 h-16 bg-[#25262b] hover:bg-[#2c2d33] text-white rounded-[22px] flex items-center justify-center border border-white/5 shadow-xl active:scale-90 transition-all cursor-pointer">
              <RefreshCcw size={28} />
            </button>
            <span className="text-[10px] font-black tracking-widest text-gray-500">SWAP</span>
          </div>
        </div>
      </div>

      {/* Simplified Bottom Nav */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center px-10">
        <nav className="w-full bg-[#131417]/90 backdrop-blur-xl border border-white/5 rounded-3xl py-4 flex justify-around items-center shadow-2xl">
          <button className="text-blue-500">
            <Wallet size={22} fill="currentColor" />
          </button>
          <button className="text-gray-600 hover:text-gray-400 transition">
            <Clock size={22} />
          </button>
          <button className="text-gray-600 hover:text-gray-400 transition">
            <Settings size={22} />
          </button>
        </nav>
      </div>

    </div>
  );
};

export default Dashboard;