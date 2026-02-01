import { useEffect } from 'react';
import {
  ChevronDown,
  ScanLine,
  ArrowUpRight,
  ArrowDownLeft,
  RefreshCcw,
  Wallet,
  Clock,
  Settings
} from 'lucide-react';
import { useUIStore } from '@/store/uiStore';
import keyring from '@/background/keyring';
import { copy } from '@/lib/copyToClipboard';
import { getAccountBalance } from '@/background/accountBalance';
import { getTokenPrice } from '@/background/get-prices';

const Dashboard = () => {
  const { setScreen, setPublicKey, publicKey, balance } = useUIStore();

  useEffect(() => {
    const fn = async () => {
      await getTokenPrice();
      console.log("GEnerating KeyPair");
      const key = await keyring.generateSolanaKeyPair();
      if (key) {
        setPublicKey(key.toBase58());
      }
    }
    fn();
  }, [])

  useEffect(() => {
    const getBalance = async () => {
      if (!publicKey) {
        return;
      }
      getAccountBalance(publicKey);
    }
    getBalance();
  }, [publicKey]);

  return (
    <div className="w-[360px] h-[600px] bg-background flex flex-col relative font-sans text-foreground overflow-hidden">

      {/* Top Header */}
      <header className="flex justify-between items-center p-6 shrink-0">
        <button className="w-10 h-10 flex items-center justify-center bg-card rounded-xl border border-border cursor-pointer hover:bg-accent transition" onClick={() => {
          setScreen("INFO")
        }}>
          <Wallet size={20} className="text-muted-foreground" />
        </button>

        <button className="flex items-center gap-2 bg-card hover:bg-accent px-4 py-2 rounded-full transition border border-border shadow-inner">
          <div>

          </div>
          <span className="font-bold text-xs tracking-tighter">SOLANA</span>
        </button>
      </header>

      {/* Hero Balance Section */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 -mt-12">
        <div className="flex items-center gap-2 mb-4 px-3 py-1 bg-accent rounded-full border border-border cursor-pointer hover:bg-accent/80 transition group">
          <span className="text-[10px] font-mono text-muted-foreground group-hover:text-foreground"
            onClick={() => {
              copy(publicKey!);
            }}
          >{publicKey}</span>
        </div>

        <p className="text-muted-foreground text-xs font-bold uppercase tracking-[0.2em] mb-2">Total Balance</p>
        <h1 className="text-2xl font-black tracking-tighter mb-4">{balance} SOL</h1>
      </div>

      {/* Main Action Buttons - Minimalist Row */}
      <div className="px-8 pb-32">
        <div className="grid grid-cols-3 gap-6">
          <div className="flex flex-col items-center gap-3">
            <button className="w-16 h-16 bg-primary hover:bg-primary/90 text-primary-foreground rounded-[22px] flex items-center justify-center shadow-lg active:scale-90 transition-all cursor-pointer"
              onClick={() => {
                setScreen("SENDTOKEN")
              }}
            >
              <ArrowUpRight size={28} />

            </button>
            <span className="text-[10px] font-black tracking-widest text-muted-foreground">SEND</span>
          </div>

          <div className="flex flex-col items-center gap-3">
            <button className="w-16 h-16 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-[22px] flex items-center justify-center border border-border shadow-xl active:scale-90 transition-all cursor-pointer">
              <ArrowDownLeft size={28} />
            </button>
            <span className="text-[10px] font-black tracking-widest text-muted-foreground">RECEIVE</span>
          </div>

          <div className="flex flex-col items-center gap-3">
            <button className="w-16 h-16 bg-secondary hover:bg-secondary/80 text-secondary-foreground rounded-[22px] flex items-center justify-center border border-border shadow-xl active:scale-90 transition-all cursor-pointer"
              onClick={() => {
                setScreen("SWAP")
              }}
            >
              <RefreshCcw size={28} />
            </button>
            <span className="text-[10px] font-black tracking-widest text-muted-foreground">SWAP</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;