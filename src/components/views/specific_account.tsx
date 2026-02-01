import { useEffect, useState } from 'react';
import { ChevronLeft, Copy, ShieldAlert } from 'lucide-react';
import { copy } from '@/lib/copyToClipboard';
import { useUIStore } from '@/store/uiStore';
import keyring from '@/background/keyring';
import { type PublicKey } from '@solana/web3.js';

export const SpecificWalletAccount = () => {
  const [showPublic, setShowPublic] = useState(false);
  const [showPrivate, setShowPrivate] = useState(false);

  const { selectedWallet, setScreen } = useUIStore();
  const [pair, setPair] = useState<{
    publicKey: PublicKey;
    secretKey: Uint8Array;
  } | null>(null);

  useEffect(() => {
    if (!selectedWallet) return;
    const wallet = keyring.getKeyPair(selectedWallet);
    if (wallet) setPair(wallet);
  }, [selectedWallet]);

  return (
    <div className="w-[360px] h-[600px] bg-background text-foreground flex flex-col p-6 font-sans relative overflow-hidden">

      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => setScreen('INFO')}
          className="w-10 h-10 -ml-2 flex items-center justify-center rounded-full hover:bg-secondary transition text-muted-foreground"
        >
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold">Wallet</h1>
      </div>

      <div className="flex-1 space-y-6 overflow-y-auto pr-1">

        {/* Sensitive Info */}
        <div className="space-y-3">
          <label className="text-[10px] font-black text-destructive uppercase tracking-widest flex items-center gap-1">
            <ShieldAlert size={10} /> Sensitive Info
          </label>

          {/* Public Key */}
          <div className="space-y-2">
            <button
              onClick={() => setShowPublic(!showPublic)}
              className="w-full bg-card border border-border rounded-xl px-4 py-3 text-left hover:bg-accent transition"
            >
              <span className="text-xs font-bold">
                {showPublic ? 'Hide Public Key' : 'Reveal Public Key'}
              </span>
            </button>

            {showPublic && (
              <div className="bg-card p-4 rounded-2xl border border-border flex items-center justify-between">
                <p className="text-xs font-mono text-muted-foreground break-all mr-4">
                  {pair?.publicKey.toBase58()}
                </p>
                <button
                  onClick={() => copy(pair?.publicKey.toBase58()!)}
                  className="text-muted-foreground hover:text-primary transition"
                >
                  <Copy size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Private Key */}
          <div className="space-y-2">
            <button
              onClick={() => setShowPrivate(!showPrivate)}
              className="w-full bg-card border border-border rounded-xl px-4 py-3 text-left hover:bg-accent transition"
            >
              <span className="text-xs font-bold text-destructive">
                {showPrivate ? 'Hide Private Key' : 'Reveal Private Key'}
              </span>
            </button>

            {showPrivate && (
              <div className="bg-card p-4 rounded-2xl border border-border flex items-center justify-between">
                <p className="text-xs font-mono text-muted-foreground break-all mr-4">
                  {pair && Buffer.from(pair.secretKey).toString('hex')}
                </p>
                <button
                  onClick={() =>
                    copy(Buffer.from(pair!.secretKey).toString('hex'))
                  }
                  className="text-muted-foreground hover:text-primary transition"
                >
                  <Copy size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Safety Warning */}
      <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-2xl">
        <p className="text-[10px] text-destructive leading-normal text-center">
          <strong>NEVER</strong> share your Private Key or Recovery Phrase. Turbo
          support will never ask for them.
        </p>
      </div>
    </div>
  );
};
