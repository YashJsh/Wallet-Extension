import { useState } from 'react';
import { Copy, Droplets, ArrowLeft, Check, Loader2 } from 'lucide-react'; // Added Loader2
import { useUIStore } from '@/store/uiStore';
import { copy } from '@/lib/copyToClipboard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { getAirDrop } from '@/background/get-devnet-sol';
import { toast } from 'sonner';

const ReceiveToken = () => {
  // Destructure loading and setLoading from your store
  const { publicKey, network, setScreen, loading, setLoading } = useUIStore();
  const [rpcUrl, setRpcUrl] = useState('');
  const [amount, setAmount] = useState('1');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    copy(publicKey!);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset copy icon after 2s
  };

  const requestAirdrop = async () => {
    if (!publicKey) return;

    setLoading(true); // Start Loading
    try {
    toast("Requesting Airdrop");
      console.log(`Requesting ${amount} SOL on ${rpcUrl || 'Devnet'}`);
      const response = await getAirDrop(Number(amount), publicKey, rpcUrl);
      
      toast("Airdrop successfull");
      // Assuming a truthy response or a specific success property indicates success
      if (response) {
        setScreen("HOME"); // Navigate back on success
      }

    } catch (error : any) {
      console.error("Airdrop failed:", error);
      toast("Airdrop Failed", error)
    } finally {
      setLoading(false); // Stop Loading regardless of outcome
    }
  };

  return (
    <div className="w-[360px] h-[600px] bg-background flex flex-col p-6 text-foreground font-sans">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => setScreen("HOME")}
          disabled={loading} // Prevent navigation while loading
          className="p-2 hover:bg-accent rounded-full transition disabled:opacity-50"
        >
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-xl font-black tracking-tighter italic">RECEIVE</h2>
      </div>

      {network === 'MAINNET' ? (
        /* MAINNET VIEW */
        <div className="flex-1 flex flex-col items-center justify-center space-y-8">
          <div className="w-full space-y-2">
            <p className="text-[10px] font-black text-muted-foreground tracking-widest uppercase ml-1">
              Your Wallet Address
            </p>
            <div className="p-4 bg-secondary/50 rounded-2xl border border-border break-all font-mono text-xs relative group">
              {publicKey}
            </div>
            <Button 
              onClick={handleCopy}
              className="w-full h-12 rounded-2xl font-bold gap-2"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? "COPIED" : "COPY ADDRESS"}
            </Button>
          </div>
        </div>
      ) : (
        /* DEVNET VIEW */
        <div className="flex-1 flex flex-col space-y-6">
          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
            <p className="text-amber-500 text-[11px] font-bold leading-tight">
              You are on Devnet. You can request test tokens to this address.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-muted-foreground tracking-widest">
                CUSTOM RPC (OPTIONAL)
              </label>
              <Input 
                placeholder="https://api.devnet.solana.com" 
                value={rpcUrl}
                disabled={loading}
                onChange={(e) => setRpcUrl(e.target.value)}
                className="bg-card border-border h-12 rounded-xl"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-muted-foreground tracking-widest">
                AMOUNT (SOL)
              </label>
              <Input 
                type="number"
                value={amount}
                disabled={loading}
                onChange={(e) => setAmount(e.target.value)}
                className="bg-card border-border h-12 rounded-xl"
              />
            </div>

            <div className="pt-4">
              <Button 
                onClick={requestAirdrop}
                variant="secondary"
                disabled={loading} // Disable button while loading
                className="w-full h-14 rounded-2xl font-black gap-2 border border-border shadow-lg"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    PROCESSING...
                  </>
                ) : (
                  <>
                    <Droplets size={20} />
                    GET DEVNET SOL
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="mt-auto pb-4">
             <button 
              onClick={handleCopy}
              disabled={loading}
              className="w-full py-3 text-[10px] font-bold text-muted-foreground hover:text-foreground transition underline decoration-dotted disabled:opacity-50"
            >
              COPY WALLET ADDRESS INSTEAD
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReceiveToken;