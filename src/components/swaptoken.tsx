import React, { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronDown, 
  ArrowUpDown, 
  Settings2,
  Zap,
  Info
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useUIStore } from '@/store/ui.store';

const SwapPage = () => {
  const {setScreen} = useUIStore();
  return (
    <div className="w-[360px] h-[600px] bg-[#1a1b1e] flex flex-col p-6 font-sans text-white relative overflow-hidden">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Button className="w-10 h-10 -ml-2 "variant={"ghost"} onClick={()=>{setScreen("HOME")}}>
          <ChevronLeft size={24} />
        </Button>
        <h1 className="text-lg font-bold tracking-tighter uppercase">Swap</h1>
      </div>

      <div className="flex-1 flex flex-col gap-1 relative">
        
        {/* TOP INPUT (PAY) */}
        <div className="bg-[#131417] p-5 rounded-[28px] border border-white/5 group focus-within:border-blue-500/30 transition-colors">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">You Pay</span>
            <span className="text-[10px] font-bold text-blue-400 cursor-pointer hover:underline uppercase">Max: 0.45</span>
          </div>
          <div className="flex items-center justify-between">
            <input 
              type="number" 
              placeholder="0.0" 
              className="bg-transparent border-none text-3xl font-bold p-0 focus:ring-0 w-1/2 placeholder:text-gray-800"
            />
            <button className="flex items-center gap-2 bg-[#25262b] hover:bg-[#2c2d33] py-2 pl-2 pr-3 rounded-2xl border border-white/5 transition shadow-lg">
              <div className="w-6 h-6 rounded-full bg-orange-500 flex items-center justify-center text-[10px] font-black">B</div>
              <span className="font-bold text-sm">BTC</span>
              <ChevronDown size={14} className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* INTERCHANGE BUTTON */}
        {/* This sits exactly in the middle of the two cards */}
        <div className="absolute left-1/2 top-[164px] -translate-x-1/2 -translate-y-1/2 z-20">
          <button 
            className="group w-11 h-11 bg-[#1a1b1e] border-[4px] border-[#1a1b1e] rounded-2xl transition-all active:scale-90"
            onClick={() => console.log("Interchange tokens")}
          >
            <div className="w-full h-full bg-[#25262b] rounded-xl flex items-center justify-center border border-white/10 group-hover:border-blue-500/50 transition-colors">
              <ArrowUpDown size={18} className="text-blue-500 group-hover:rotate-180 transition-transform duration-500" />
            </div>
          </button>
        </div>

        {/* BOTTOM INPUT (RECEIVE) */}
        <div className="bg-[#131417] p-5 rounded-[28px] border border-white/5 pt-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">You Receive</span>
          </div>
          <div className="flex items-center justify-between">
            <input 
              readOnly
              type="number" 
              placeholder="0.0" 
              className="bg-transparent border-none text-3xl font-bold p-0 focus:ring-0 w-1/2 placeholder:text-gray-800 cursor-default"
            />
            <button className="flex items-center gap-2 bg-[#25262b] hover:bg-[#2c2d33] py-2 pl-2 pr-3 rounded-2xl border border-white/5 transition shadow-lg">
              <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-[10px] font-black">E</div>
              <span className="font-bold text-sm">ETH</span>
              <ChevronDown size={14} className="text-gray-500" />
            </button>
          </div>
        </div>

        {/* INFO SECTION */}
        <div className="mt-8 px-2 space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5 text-gray-500">
              <span className="text-xs font-medium">Rate</span>
              <Info size={12} />
            </div>
            <span className="text-xs font-bold text-gray-300">1 BTC = 18.24 ETH</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1.5 text-gray-500">
              <span className="text-xs font-medium">Slippage Tolerance</span>
            </div>
            <span className="text-xs font-bold text-blue-400">0.5%</span>
          </div>
        </div>
      </div>

      {/* ACTION BUTTON */}
      <div className="pb-4">
        <Button className="w-full h-15 bg-blue-600 hover:bg-blue-500 text-white font-black text-base rounded-[20px] shadow-xl shadow-blue-900/20 transition-all active:scale-[0.98]">
          Review Swap
        </Button>
      </div>

    </div>
  );
};

export default SwapPage;