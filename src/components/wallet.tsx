import React from "react";
import { PlusCircle, Download, ChevronLeft, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUIStore } from "@/store/ui.store";

export const WalletSetupOptions = () => {
  const {setScreen} = useUIStore();
  return (
    <div className="w-[360px] h-[600px] bg-[#1a1b1e] flex flex-col p-6 text-white relative overflow-hidden">
      
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 w-[200px] h-[200px] bg-blue-600/5 blur-[100px] rounded-full" />


      {/* Header Section */}
      <div className="mt-8 mb-10 flex flex-col items-center text-center justify-center">
        <h1 className="text-3xl font-bold mb-3 tracking-tighter uppercase">
          Set up wallet
        </h1>
        <p className="text-gray-400 text-sm leading-relaxed">
          Select how you'd like to get started with{" "}
          <span className="text-white font-semibold">Turbo</span>.
        </p>
      </div>

      {/* Options Container */}
      <div className="space-y-4 flex-1">

        {/* Create New Wallet */}
        <Button
          variant="default"
          className="w-full bg-blue-500 hover:bg-blue-600 py-7 font-semibold "
          onClick={()=>{
            setScreen("MNEMONICDISPLAY")
          }}
          
        >
          Create Wallet
        </Button>

        {/* Import Existing Wallet */}
        <Button
          variant="default"
          className="w-full h-auto py-5 bg-white text-black font-semibold " 
        >
          Import existing wallet
        </Button>

      </div>
    </div>
  );
};

export default WalletSetupOptions;
