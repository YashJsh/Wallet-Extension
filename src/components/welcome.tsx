import { ArrowRight, Zap } from 'lucide-react';
import { Button } from './ui/button';

export const Welcome = () => {
  return (
    <div className="w-[360px] h-[600px] bg-[#1a1b1e] flex flex-col items-center justify-center p-8 relative overflow-hidden font-sans text-white">
      <div className="absolute top-[-10%] left-[-10%] w-[150px] h-[150px] bg-blue-500/10 blur-[80px] rounded-full"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[150px] h-[150px] bg-indigo-500/10 blur-[80px] rounded-full"></div>

    
      <div className="mb-8 relative">
        <div className="w-20 h-20 bg-gradient-to-tr from-blue-600 to-indigo-500 rounded-3xl flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.3)] rotate-3 hover:rotate-0 transition-transform duration-500">
          <Zap size={40} className="text-white fill-current" />
        </div>

        <div className="absolute -inset-4 border border-white/5 rounded-full animate-pulse"></div>
      </div>

      <div className="text-center space-y-3 mb-12">
        <h1 className="text-4xl font-bold tracking-tighter bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent uppercase">
          Turbo
        </h1>
        <p className="text-gray-400 text-sm leading-relaxed max-w-[200px] mx-auto">
          The next generation of <span className="text-blue-400 font-medium">on-chain</span> speed and security.
        </p>
      </div>

      <Button 
        className="bg-blue-600 hover:bg-blue-600"
        onClick={() => console.log("Get Started Clicked")}
      >
        <span>Get Started</span>
        <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
      </Button>

      {/* Secondary Info */}
      <p className="mt-6 text-[11px] text-gray-500 font-medium tracking-wide">
        SECURE • NON-CUSTODIAL • FAST
      </p>

    </div>
  );
};

export default Welcome;