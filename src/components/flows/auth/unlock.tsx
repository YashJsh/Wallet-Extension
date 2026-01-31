import { useState } from 'react';
import { Zap, Eye, EyeOff, Unlock, HelpCircle } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { checkPassword } from '@/background/key-management';
import { useUIStore } from '@/store/uiStore';

export const UnlockWallet = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState<string | null>();
  const [error, setError] = useState<string | null>();
  const { setScreen } = useUIStore();

  const handleSubmit = ()=>{
    if (!password){
        return;
    }    
    const check = checkPassword(password);
    if (!check){
        setError("Password didn't match");
        return;
    }
    setScreen("HOME");
  }

  return (
    <div className="w-[360px] h-[600px] bg-[#1a1b1e] flex flex-col p-8 font-sans text-white relative overflow-hidden">
      
      {/* Decorative Background Glows */}
      <div className="absolute top-[-20%] left-[-20%] w-[250px] h-[250px] bg-blue-600/10 blur-[100px] rounded-full"></div>
      <div className="absolute bottom-[-20%] right-[-20%] w-[250px] h-[250px] bg-indigo-600/10 blur-[100px] rounded-full"></div>

      {/* Center Logo & Branding */}
      <div className="flex-1 flex flex-col items-center justify-center -mt-10">
        <div className="w-20 h-20 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-[28px] flex items-center justify-center shadow-[0_0_40px_rgba(37,99,235,0.25)] mb-6 transition-transform hover:scale-105 duration-500">
          <Zap size={40} className="text-white fill-current" />
        </div>
        <h1 className="text-3xl font-black tracking-tighter mb-2 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent">
          TURBO
        </h1>
        <p className="text-gray-500 text-xs font-bold tracking-[0.3em] uppercase opacity-80">
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
              className="bg-[#131417] border-gray-800 focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 h-14 rounded-2xl pl-12 pr-12 text-sm font-medium transition-all"
              onChange={(e)=>{
                setError(null);
                setPassword(e.target.value);
              }}
            />
            {/* Left Icon */}
            <Unlock className="absolute left-4 top-4.5 text-gray-600 group-focus-within:text-blue-500 transition-colors" size={18} />
            
            {/* Right Toggle Icon */}
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4.5 text-gray-600 hover:text-gray-400 transition-colors"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
          {error && <p className='text-xs font-light uppercase text-red-500'>Wrong Password</p>}
          <div className="flex justify-between items-center px-1">
            <button className="text-[11px] font-bold text-blue-500 hover:text-blue-400 transition tracking-wide uppercase">
              Forgot Password?
            </button>
           
          </div>
        </div>

        <Button 
          className="w-full h-14 bg-blue-600 hover:bg-blue-500 text-white font-black text-base rounded-2xl shadow-xl shadow-blue-900/20 transition-all active:scale-[0.98] uppercase tracking-tighter"
          disabled={!password}
          onClick={handleSubmit}
        >
          Unlock Wallet
        </Button>

        <p className="text-center text-[10px] text-gray-700 font-medium">
          VERSION 1.0.4 • ENCRYPTED SESSION
        </p>
      </div>

    </div>
  );
};

export default UnlockWallet;