
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

const WalletExtension = () => {
  // Mock data to match the screenshot
  const tokens = [
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      price: '$62,291.59',
      change: '+0.89%',
      balance: '0.037',
      value: '$2,321.01',
      color: 'bg-orange-500'
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      price: '$3,428.42',
      change: '+0.57%',
      balance: '0.55',
      value: '$1,871.23',
      color: 'bg-indigo-500'
    },
    {
      symbol: 'USDT',
      name: 'Tether',
      price: '$1.00',
      change: '+0.01%',
      balance: '22',
      value: '$22.00',
      color: 'bg-emerald-500'
    }
  ];

  return (
    // EXTENSION ROOT: 
    // - Fixed width/height (standard extension size is 360x600)
    // - Removed rounded corners on the container itself (the browser window is the frame)
    // - Overflow hidden to prevent body scrollbars
    <div className="w-[360px] h-[600px] bg-[#1a1b1e] flex flex-col relative font-sans text-white overflow-hidden border-0">

        
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

      {/* Main Content Scrollable Area */}
      {/* We use flex-1 and overflow-y-auto here to allow scrolling ONLY this part if content gets long */}
      <div className="flex-1 overflow-y-auto pb-24 scrollbar-hide">
        
        {/* Main Wallet Card */}
        <div className="px-4 pb-2 mt-2">
          <div className="bg-[#131417] rounded-3xl p-6 text-center border border-gray-800/50 shadow-sm">
            <div className="flex items-center justify-center gap-2 mb-2 text-gray-400 text-xs tracking-widest uppercase font-semibold">
              Wallet 1
            </div>
            <div className="flex items-center justify-center gap-2 mb-6 text-gray-500 text-xs group cursor-pointer">
              <span className="group-hover:text-gray-300 transition">0x234F...2138</span>
              <Copy size={12} className="group-hover:text-white transition" />
            </div>

            <h1 className="text-4xl font-bold mb-2 tracking-tight">$4,234</h1>
            
            <div className="inline-flex items-center gap-1 bg-green-500/10 px-2 py-1 rounded-md border border-green-500/20">
              <span className="text-green-500 text-xs font-bold">+2.1%</span>
              <span className="text-gray-400 text-xs">$88.91</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-4 py-4">
          <div className="grid grid-cols-3 gap-3">
            <button className="flex flex-col items-center justify-center bg-[#25262b] hover:bg-[#2c2d33] active:scale-95 p-3 rounded-2xl transition group cursor-pointer border border-transparent hover:border-gray-700">
              <div className="mb-2 p-2 bg-black/40 rounded-full group-hover:scale-110 transition">
                <ArrowUpRight size={20} className="text-blue-400" />
              </div>
              <span className="text-[11px] font-bold tracking-wide text-gray-300 group-hover:text-white">SEND</span>
            </button>
            <button className="flex flex-col items-center justify-center bg-[#25262b] hover:bg-[#2c2d33] active:scale-95 p-3 rounded-2xl transition group cursor-pointer border border-transparent hover:border-gray-700">
              <div className="mb-2 p-2 bg-black/40 rounded-full group-hover:scale-110 transition">
                <ArrowDownLeft size={20} className="text-blue-400" />
              </div>
              <span className="text-[11px] font-bold tracking-wide text-gray-300 group-hover:text-white">RECEIVE</span>
            </button>
            <button className="flex flex-col items-center justify-center bg-[#25262b] hover:bg-[#2c2d33] active:scale-95 p-3 rounded-2xl transition group cursor-pointer border border-transparent hover:border-gray-700">
              <div className="mb-2 p-2 bg-black/40 rounded-full group-hover:scale-110 transition">
                <RefreshCcw size={20} className="text-blue-400" />
              </div>
              <span className="text-[11px] font-bold tracking-wide text-gray-300 group-hover:text-white">SWAP</span>
            </button>
          </div>
        </div>

        {/* Tokens List Section */}
        <div className="bg-[#151619] min-h-[300px] rounded-t-3xl mt-2 px-4 pt-6 pb-4">
          {/* Tabs */}
          <div className="flex justify-between items-center mb-6 px-1">
            <div className="flex gap-5">
              <button className="text-white font-bold border-b-2 border-blue-500 pb-1 text-sm">Tokens</button>
              <button className="text-gray-500 font-bold pb-1 hover:text-gray-300 transition text-sm">NFTs</button>
              <button className="text-gray-500 font-bold pb-1 hover:text-gray-300 transition text-sm">Activity</button>
            </div>
            <Search size={16} className="text-gray-400 cursor-pointer hover:text-white transition" />
          </div>

          {/* List */}
          <div className="space-y-1">
            {tokens.map((token, index) => (
              <div key={index} className="flex justify-between items-center group cursor-pointer hover:bg-white/5 p-3 rounded-xl transition border border-transparent hover:border-white/5">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${token.color} flex items-center justify-center text-white font-bold shadow-lg ring-2 ring-[#151619]`}>
                    {token.symbol[0]}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-bold text-sm">{token.name}</span>
                    <div className="flex gap-2 text-xs">
                      <span className="text-gray-400">{token.price}</span>
                      <span className="text-green-500 bg-green-500/10 px-1 rounded">{token.change}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-bold text-sm">{token.balance} {token.symbol}</span>
                  <span className="text-gray-400 text-xs">{token.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating Bottom Nav - Fixed at bottom */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center z-10 pointer-events-none">
        <div className="bg-[#25262b]/95 backdrop-blur-xl border border-white/10 rounded-full px-6 py-3 flex items-center gap-8 shadow-[0_8px_32px_rgba(0,0,0,0.5)] pointer-events-auto">
          <button className="flex flex-col items-center gap-1 text-blue-400 group">
            <Wallet size={20} className="fill-current" />
            <span className="text-[10px] font-bold">Wallet</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-300 transition group">
            <Clock size={20} className="group-hover:scale-110 transition"/>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-500 hover:text-gray-300 transition group">
            <Settings size={20} className="group-hover:rotate-45 transition"/>
          </button>
        </div>
      </div>
      
      {/* Bottom Gradient Fade for scrolling */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#1a1b1e] to-transparent pointer-events-none"></div>

    </div>
  );
};

export default WalletExtension;