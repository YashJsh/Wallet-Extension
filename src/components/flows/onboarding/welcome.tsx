import { ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUIStore } from '@/store/uiStore';

export const Welcome = () => {
  const { setScreen } = useUIStore();
  return (
    <div className="w-[380px] h-[600px] bg-background flex flex-col items-center justify-center p-8 relative overflow-hidden font-sans text-foreground">
      <div className="absolute top-[-10%] left-[-10%] w-[150px] h-[150px] bg-primary/10 blur-[80px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[150px] h-[150px] bg-primary/10 blur-[80px] rounded-full"></div>

    
      <div className="mb-8 relative">
        <div className="w-20 h-20 bg-primary rounded-3xl flex items-center justify-center shadow-lg rotate-3 hover:rotate-0 transition-transform duration-500">
          <Zap size={40} className="text-primary-foreground fill-current" />
        </div>

        <div className="absolute -inset-4 border border-border rounded-full animate-pulse"></div>
      </div>

      <div className="text-center space-y-3 mb-12">
        <h1 className="text-4xl font-bold tracking-tighter text-foreground uppercase">
          Turbo
        </h1>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-[200px] mx-auto">
          The next generation of <span className="text-primary font-medium">on-chain</span> speed and security.
        </p>
      </div>

      <Button 
        className="bg-primary hover:bg-primary/90 cursor-pointer"
        onClick={() => setScreen("WALLETSETUP")}
      >
        <span>Get Started</span>
        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </Button>

      {/* Secondary Info */}
      <p className="mt-6 text-[11px] text-muted-foreground font-medium tracking-wide">
        SECURE • NON-CUSTODIAL • FAST
      </p>
    </div>
  );
};

export default Welcome;