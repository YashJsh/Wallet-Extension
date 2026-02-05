import { useState } from 'react';
import { Zap, Eye, EyeOff, Unlock } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { checkPassword } from '@/background/key-management';
import { useUIStore } from '@/store/uiStore';
import keyring from '@/background/keyring';

export const UnlockWallet = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState<string | null>();
  const [error, setError] = useState<string | null>();
  const { setScreen, setPublicKey, setPass } = useUIStore();

  const handleSubmit = async ()=>{
    if (!password){
        return;
    }    
    const check = checkPassword(password);
    if (!check){
        setError("Password didn't match");
        return;
    }
    const key = await keyring.restoreSolanaWallets(password);
    setPass(password);
    setPublicKey(key!);
    setScreen("HOME");
  }

  return (
    <div className="w-[360px] h-[600px] bg-background flex flex-col p-8 font-sans text-foreground relative overflow-hidden">
      {/* Decorative Background Glows */}
      <div className="absolute top-[-20%] left-[-20%] w-[250px] h-[250px] bg-primary/10 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-[-20%] right-[-20%] w-[250px] h-[250px] bg-primary/10 blur-[100px] rounded-full"></div>

      {/* Center Logo & Branding */}
      <div className="flex-1 flex flex-col items-center justify-center -mt-10">
        <div className="w-20 h-20 bg-primary rounded-[28px] flex items-center justify-center shadow-lg mb-6 transition-transform hover:scale-105 duration-500">
          <Zap size={40} className="text-primary-foreground fill-current" />
        </div>
        <h1 className="text-3xl font-black tracking-tighter mb-2 text-foreground">
          TURBO
        </h1>
        <p className="text-muted-foreground text-xs font-bold tracking-[0.3em] uppercase opacity-80">
          Secure Gateway
        </p>
      </div>

      {/* Lower Password Input Section */}
      <div className="space-y-6 pb-4">
        <div className="space-y-3">
            
          <div className="relative group">
            <Input 
              type={showPassword ? "text" : "password"} 
              placeholder="Enter Password" 
              className="bg-card border-border focus:border-primary/50 focus:ring-1 focus:ring-primary/20 h-14 rounded-2xl pl-12 pr-12 text-sm font-medium transition-all"
              onChange={(e)=>{
                setError(null);
                setPassword(e.target.value);
              }}
            />
            {/* Left Icon */}
            <Unlock className="absolute left-4 top-4.5 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
            
            {/* Right Toggle Icon */}
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4.5 text-muted-foreground hover:text-muted-foreground/80 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {error && <p className='text-xs font-light uppercase text-destructive'>Wrong Password</p>}
          <div className="flex justify-between items-center px-1">
            <button className="text-[11px] font-bold text-primary hover:text-primary/90 transition tracking-wide uppercase">
              Forgot Password?
            </button>
           
          </div>
        </div>

        <Button 
          className="w-full h-14 bg-primary hover:bg-primary/90 text-primary-foreground font-black text-base rounded-2xl shadow-lg transition-all active:scale-[0.98] uppercase tracking-tighter"
          disabled={!password}
          onClick={handleSubmit}
        >
          Unlock Wallet
        </Button>

        <p className="text-center text-[10px] text-muted-foreground font-medium">
          VERSION 1.0.4 • ENCRYPTED SESSION
        </p>
      </div>

    </div>
  );
};

export default UnlockWallet;