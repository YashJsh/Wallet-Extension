import { ChevronRight, Plus, Wallet, ChevronLeft } from 'lucide-react';
import keyring from '@/background/keyring';
import { useUIStore } from '@/store/uiStore';

export const WalletManager = () => {
  const keys = keyring.getAllWallets();
  const { setScreen, setSelectedWallet } = useUIStore();

  return (
    <div className="w-[360px] h-[600px] bg-background text-foreground flex flex-col p-6 font-sans relative">

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <ChevronLeft
            size={20}
            className="text-muted-foreground hover:text-foreground cursor-pointer"
            onClick={() => setScreen("HOME")}
          />
          <h1 className="text-2xl font-bold tracking-tight">
            Your Wallets
          </h1>
        </div>

        <p className="text-muted-foreground text-xs mt-1">
          Manage and view your Turbo accounts
        </p>
      </div>

      {/* Wallet List */}
      <div className="flex-1 space-y-3 overflow-y-auto pr-1 scrollbar-hide">
        {keys.map((key, index) => (
          <button
            key={index}
            className="
              w-full group
              bg-primary hover:bg-secondary/80
              border border-border
              p-4 rounded-2xl
              flex items-center justify-between
              transition-all active:scale-[0.98]
            "
            onClick={() => {
              setSelectedWallet(key);
              setScreen('SPECIFIC_ACCOUNT');
            }}
          >
            <div className="flex items-center gap-4">
              <div
                className="
                  w-10 h-10 rounded-xl
                  flex items-center justify-center
                  bg-accent text-accent-foreground
                  group-hover:bg-primary
                  group-hover:text-primary-foreground
                  transition-colors
                "
              >
                <Wallet size={20} />
              </div>

              <div className="text-left">
                <h3 className="text-sm font-bold">
                  Wallet {index + 1}
                </h3>
                <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-tighter">
                  {key.slice(0, 6)}...{key.slice(-4)}
                </span>
              </div>
            </div>

            <ChevronRight
              size={18}
              className="text-muted-foreground group-hover:text-primary-foreground transition-colors"
            />
          </button>
        ))}
      </div>

      {/* Add New Wallet */}
      <div className="pt-6 pb-2">
        <button
          className="
            w-full h-14
            bg-secondary hover:bg-secondary/80
            border border-dashed border-border
            rounded-2xl
            flex items-center justify-center gap-2
            transition-all group
          "
        >
          <div className="p-1 bg-muted rounded-lg group-hover:bg-primary transition-colors">
            <Plus size={16} className="text-primary-" />
          </div>
          <span className="text-sm font-bold text-primary-foreground group-hover:text-primary-foreground/10">
            Create New Wallet
          </span>
        </button>
      </div>
    </div>
  );
};
