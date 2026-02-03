import {
  ChevronLeft,
  ArrowUpDown,
  Loader2,
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useUIStore } from '@/store/uiStore';
import { useEffect, useState } from "react";
import { getQuote, swapTransaction, tokens } from '@/background/swap';
import keyring from '@/background/keyring';

const TOKEN_DECIMALS: Record<string, number> = {
  SOL: 9,
  USDC: 6,
};

const SwapPage = () => {
  const { setScreen, balance, publicKey, loading, setLoading } = useUIStore();
  const [topToken, setTopToken] = useState("SOL");
  const [bottomToken, setBottomToken] = useState("USDC");
  const [bottomTokenRate, setBottomTokenRate] = useState("");
  const [topValue, setTopValue] = useState("");
  const [bottomValue, setBottomValue] = useState("");
  const [transferVia, setTransferVia] = useState("");
  const [quote, setQuote] = useState<any>();

  const getValue = async () => {
    if (!topValue || topValue === "0") return;

    const topDecimals = TOKEN_DECIMALS[topToken];
    const bottomDecimals = TOKEN_DECIMALS[bottomToken];

    const amount = Math.floor(Number(topValue) * 10 ** topDecimals);
    const slippage = 50;

    let inputMint = null;
    let outputMint = null;

    if (topToken === "SOL") {
      inputMint = tokens.sol;
      outputMint = tokens.usdc;
    } else {
      inputMint = tokens.usdc;
      outputMint = tokens.sol;
    }

    const response = await getQuote(inputMint, outputMint, amount, slippage);

    // Convert outAmount based on output decimals
    const outAmount = Number(response.data.outAmount);
    const convertedOut = outAmount / 10 ** bottomDecimals;

    setBottomValue(convertedOut.toString());
    setBottomTokenRate(Number(response.data.tokenValue).toFixed(2));
    setTransferVia(response.data.routeTaken);
    setQuote(response.quoteResponse);
  };

  useEffect(() => {
    getValue();
  }, [topValue, topToken]);

  const handleSwapTokens = () => {
    const currentTopToken = topToken;
    const currentBottomToken = bottomToken;

    setTopToken(currentBottomToken);
    setBottomToken(currentTopToken);

    const currentBottomValue = bottomValue;
    setTopValue(currentBottomValue);
    setBottomValue("");

    if (currentBottomValue) {
      getValue();
    }
  };

  const sendSwap = async () => {
    setLoading(true);
    if (!publicKey) return;

    const keyPair = keyring.getKeyPair(publicKey);
    if (!keyPair) return;

    await swapTransaction(quote, keyPair);
    setLoading(false);
    setScreen("HOME");
  };

  return (
    <div className="w-[360px] h-[600px] bg-background flex flex-col p-6 font-sans text-foreground relative overflow-hidden">

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <Button className="w-10 h-10 -ml-2 " variant={"ghost"} onClick={() => { setScreen("HOME") }}>
          <ChevronLeft size={24} />
        </Button>
        <h1 className="text-lg font-bold tracking-tighter uppercase">Swap</h1>
      </div>

      <div className="flex-1 flex flex-col gap-1 relative">

        {/* TOP INPUT (PAY) */}
        <div className="bg-card p-5 rounded-[28px] border border-border group focus-within:border-primary/30 transition-colors">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">You Pay</span>
          </div>
          <div className="flex items-center justify-between">
            <input
              value={topValue}
              onChange={(e) => {
                const val = e.target.value;
                setTopValue(val);
              }}
              placeholder="0.0"
              className={`bg-transparent border-none text-3xl font-bold p-0  w-full outline-none ${balance < Number(topValue) ? "text-destructive" : "text-foreground"}`}
            />
            <Button variant={"ghost"}>
              {topToken}
            </Button>
          </div>
        </div>

        {/* SWAP BUTTON */}
        <div className="flex justify-center items-center mt-[-10px] z-10">
          <Button
            variant="outline"
            className="rounded-full bg-card border border-border"
            onClick={handleSwapTokens}
          >
            <ArrowUpDown size={18} />
          </Button>
        </div>

        {/* BOTTOM INPUT (RECEIVE) */}
        <div className="bg-card p-5 rounded-[28px] border border-border pt-8">
          <div className="flex justify-between items-center mb-3">
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">You Receive</span>
          </div>
          <div className="flex items-center justify-between">
            <input
              readOnly
              value={bottomValue}
              placeholder="0.0"
              className="bg-transparent border-none text-3xl font-bold p-0  w-full placeholder:text-muted-foreground outline-none text-green-500"
            />
            <Button variant={"ghost"}>
              {bottomToken}
            </Button>
          </div>
        </div>

        {/* INFO SECTION */}
        {
          bottomValue && <div className="mt-8 px-2 space-y-2">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <span className="text-xs font-medium capitalize tracking-tighter">conversion</span>
              </div>
              <span className="text-xs font-bold text-foreground/80">
                1 SOL ~ {bottomTokenRate} USDC
              </span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <span className="text-xs font-medium">Slippage Tolerance</span>
              </div>
              <span className="text-xs font-bold text-primary">0.5%</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <span className="text-xs font-medium">Route</span>
              </div>
              <span className="text-xs font-bold text-primary">{transferVia}</span>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <span className="text-xs font-medium">Platform Fee</span>
              </div>
              <span className="text-xs font-bold">null</span>
            </div>
          </div>
        }
      </div>

      {/* ACTION BUTTON */}
      <div className="pb-4">
        <Button 
          className="w-full h-15 bg-primary hover:bg-primary/90 text-primary-foreground font-black text-base rounded-[20px] shadow-lg transition-all active:scale-[0.98]"
          onClick={sendSwap}
          disabled={loading}
        >
          {loading ? <Loader2 className="animate-spin" /> : "Swap"}
        </Button>
      </div>
    </div>
  );
};

export default SwapPage;
