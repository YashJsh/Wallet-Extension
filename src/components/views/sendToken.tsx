import {
    ChevronLeft,
    ArrowRight
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUIStore } from '@/store/uiStore';

export const SendToken = () => {
    const {setScreen} = useUIStore();
    return (
        <div className="w-[360px] h-[600px] bg-[#1a1b1e] flex flex-col p-6 font-sans text-white relative overflow-hidden">

            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
                <button className="w-10 h-10 -ml-2 flex items-center justify-center rounded-full hover:bg-white/5 transition text-gray-400 hover:text-white"
                onClick={()=>{
                    setScreen("HOME")
                }}>
                    <ChevronLeft size={24} />
                </button>
                <h1 className="text-lg font-bold tracking-tight">Send SOL</h1>
            </div>

            <div className="flex-1 flex flex-col gap-5">

                {/* RECIPIENT ADDRESS INPUT */}
                <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">
                        Recipient Address
                    </label>
                    <div className="relative group">
                        <Input
                            placeholder="Address"
                            className="bg-[#131417] border-gray-800 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 h-14 rounded-2xl  text-sm font-medium transition-all placeholder:text-gray-700"
                        />
                    </div>
                </div>

                {/* AMOUNT INPUT */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center ml-1">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em]">
                            Amount
                        </label>
                        <span className="text-[10px] font-bold text-gray-600">
                            Balance: 12.4 SOL
                        </span>
                    </div>
                    <div className="relative group">
                        <Input
                            type="number"
                            placeholder="0.00"
                            className="bg-[#131417] border-gray-800 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 h-20 rounded-[24px] text-3xl font-bold transition-all placeholder:text-gray-800"
                        />
                    </div>
                </div>
            </div>
            {/* FOOTER ACTION */}
            <div className="pb-4">
                <Button className="w-full h-15 bg-blue-600 hover:bg-blue-500 text-white font-black text-base rounded-[20px] shadow-xl shadow-blue-900/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2">
                    <span>Send SOL</span>
                    <ArrowRight size={18} />
                </Button>
            </div>

        </div>
    );
};

export default SendToken;