import React from 'react';
import { 
  ChevronDown, 
  ScanLine, 
  Copy, 
  ArrowUpRight, 
  ArrowDownLeft, 
  RefreshCcw, 
  Search, 
  Wallet, 
  Clock, 
  Settings 
} from 'lucide-react';

const Dashboard = () => {
  return (
    <div className="w-[360px] h-[600px] bg-[#1a1b1e] flex flex-col relative font-sans text-white overflow-hidden">
      
      {/* Header */}
      <header className="flex justify-between items-center p-4 pt-5 shrink-0">
        <div className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition">
          <Wallet size={18} className="text-gray-400" />
        </div>
        
        <button className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-full transition cursor-pointer">
          <div className="w-4 h-4 rounded-full bg-blue-500"></div>
          <span className="font-semibold text-sm">Arbitrum</span>
          <ChevronDown size={16} className="text-gray-400" />
        </button>

        <div className="w-8 h-8 flex items-center justify-center bg-gray-800 rounded-lg cursor-pointer hover:bg-gray-700 transition">
          <ScanLine size={18} className="text-gray-400" />
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto pb-24 scrollbar-hide">
        
        {/* Balance Section */}
        <div className="px-4 pb-2 mt-2">
          <div className="bg-[#131417] rounded-[32px] p-7 text-center border border-gray-800/50 shadow-sm relative overflow-hidden">
             {/* Subtle internal glow */}
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-blue-500/5 blur-3xl"></div>
            
            <div className="flex items-center justify-center gap-2 mb-2 text-gray-500 text-[10px] tracking-widest uppercase font-bold">
              Turbo Wallet
            </div>
            <div className="flex items-center justify-center gap-2 mb-6 text-gray-500 text-xs group cursor-pointer">
              <span className="group-hover:text-gray-300 transition font-mono">0x234F...2138</span>
              <Copy size={12} className="group-hover:text-white transition" />
            </div>

            <h1 className="text-4xl font-bold mb-3 tracking-tight">$4,234.50</h1>
            
            <div className="inline-flex items-center gap-1.5 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/20">
              <span className="text-green-500 text-xs font-bold">+2.1%</span>
              <span className="text-gray-500 text-[10px] font-medium">$88.91 today</span>
            </div>
          </div>
        </div>

        {/* Action Buttons Grid */}
        <div className="px-4 py-4">
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: 'SEND', icon: <ArrowUpRight size={20} /> },
              { label: 'RECEIVE', icon: <ArrowDownLeft size={20} /> },
              { label: 'SWAP', icon: <RefreshCcw size={20} /> }
            ].map((item) => (
              <button key={item.label} className="flex flex-col items-center justify-center bg-[#25262b] hover:bg-[#2c2d33] active:scale-95 p-4 rounded-2xl transition group cursor-pointer border border-transparent hover:border-gray-700">
                <div className="mb-2 p-2.5 bg-black/40 rounded-full group-hover:scale-110 group-hover:bg-blue-500/20 transition-all">
                  <div className="text-blue-400 group-hover:text-blue-300">
                    {item.icon}
                  </div>
                </div>
                <span className="text-[10px] font-black tracking-widest text-gray-400 group-hover:text-white">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Assets Section */}
        <div className="bg-[#151619] min-h-[300px] rounded-t-[32px] mt-2 px-4 pt-7 pb-4 border-t border-white/5">
          {/* Custom Tabs */}
          <div className="flex justify-between items-center mb-6 px-2">
            <div className="flex gap-6">
              <button className="text-white font-bold border-b-2 border-blue-500 pb-2 text-sm">Tokens</button>
              <button className="text-gray-500 font-bold pb-2 hover:text-gray-300 transition text-sm">NFTs</button>
              <button className="text-gray-500 font-bold pb-2 hover:text-gray-300 transition text-sm">Activity</button>
            </div>
            <Search size={18} className="text-gray-500 cursor-pointer hover:text-white transition" />
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center z-10 px-6">
        <div className="w-full bg-[#25262b]/95 backdrop-blur-xl border border-white/10 rounded-3xl py-3 px-8 flex justify-between items-center shadow-2xl">
          <button className="text-blue-400 flex flex-col items-center gap-1">
            <Wallet size={20} fill="currentColor" />
          </button>
          <button className="text-gray-500 hover:text-gray-300 transition">
            <Clock size={20} />
          </button>
          <button className="text-gray-500 hover:text-gray-300 transition">
            <Settings size={20} />
          </button>
        </div>
      </div>
      
      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#1a1b1e] to-transparent pointer-events-none"></div>

    </div>
  );
};

export default Dashboard;