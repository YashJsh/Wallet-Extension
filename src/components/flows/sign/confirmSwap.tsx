import { 
  ChevronLeft, 
  ArrowRight, 
  Zap, 
  ShieldCheck, 
  Info,
  AlertCircle
} from 'lucide-react';
import { Button } from "@/components/ui/button";

const ConfirmTransaction = () => {
  return (
    <div className="w-[360px] h-[600px] bg-background flex flex-col p-6 font-sans text-foreground relative overflow-hidden">
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button className="w-10 h-10 -ml-2 flex items-center justify-center rounded-full hover:bg-accent transition text-muted-foreground">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold">Confirm Swap</h1>
      </div>

      {/* Transaction Summary Card */}
      <div className="flex-1 space-y-6">
        <div className="bg-card rounded-[28px] p-6 border border-border relative">
          <div className="flex justify-between items-center mb-6">
            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center font-black text-lg">B</div>
              <span className="text-xs font-bold text-muted-foreground">0.02 BTC</span>
            </div>
            
            <div className="flex flex-col items-center">
               <div className="p-2 bg-secondary rounded-full border border-border">
                 <ArrowRight size={20} className="text-primary" />
               </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center font-black text-lg">E</div>
              <span className="text-xs font-bold text-muted-foreground">0.36 ETH</span>
            </div>
          </div>

          <div className="h-px bg-border w-full mb-6" />

          {/* Details List */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground font-medium">Network Fee</span>
              <div className="flex items-center gap-1.5">
                <Zap size={12} className="text-yellow-500" />
                <span className="text-xs font-bold">$1.42</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground font-medium">Estimated Time</span>
              <span className="text-xs font-bold text-foreground/80">~ 30 seconds</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
                <span>Price Impact</span>
                <Info size={12} className="opacity-50" />
              </div>
              <span className="text-xs font-bold text-emerald-500">0.01%</span>
            </div>
          </div>
        </div>

        {/* Security / Simulation Check */}
        <div className="bg-emerald-500/5 border border-emerald-500/20 rounded-2xl p-4 flex gap-3">
          <ShieldCheck size={20} className="text-emerald-500 shrink-0" />
          <div className="flex flex-col gap-0.5">
            <span className="text-xs font-bold text-emerald-500">Transaction Secure</span>
            <p className="text-[10px] text-emerald-200/60 leading-tight">
              Simulation successful. No malicious contracts detected in this swap.
            </p>
          </div>
        </div>

        {/* Warning (Optional) */}
        <div className="flex items-center gap-2 px-2">
          <AlertCircle size={14} className="text-muted-foreground" />
          <p className="text-[10px] text-muted-foreground font-medium">
            Quotes refresh automatically every 15s.
          </p>
        </div>
      </div>

      {/* Footer Actions */}
      <div className="grid grid-cols-2 gap-3 pb-2">
        <Button 
          variant="outline" 
          className="h-14 bg-transparent border-border hover:bg-accent text-muted-foreground font-bold rounded-2xl"
        >
          Cancel
        </Button>
        <Button 
          className="h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-black rounded-2xl shadow-lg"
        >
          Confirm
        </Button>
      </div>

    </div>
  );
};

export default ConfirmTransaction;