import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { useUIStore } from '@/store/uiStore';
import { getUserTokens } from '@/background/getUserTokens';
import { Loader2 } from 'lucide-react';

const TokenList = () => {
    const { publicKey, network, tokens, setTokens } = useUIStore();
    const [expanded, setExpanded] = useState(false);
    const [loadingTokens, setLoadingTokens] = useState(false);

    const handleToggle = async () => {
        if (!expanded && tokens.length === 0 && publicKey) {
            setLoadingTokens(true);
            try {
                const userTokens = await getUserTokens(publicKey, network);
                setTokens(userTokens);
            } catch (error) {
                console.error("Failed to fetch tokens:", error);
            } finally {
                setLoadingTokens(false);
            }
        }
        setExpanded(!expanded);
    };

    return (
        <div className="w-full items-center flex justify-center">
            <button
                onClick={handleToggle}
                className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
                <span className="text-xs font-medium">
                    {tokens.length > 0 ? `${tokens.length} Token${tokens.length !== 1 ? 's' : ''}` : 'View Tokens'}
                </span>
                {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            </button>

            {expanded && (
                <div className="mt-3 space-y-2 max-h-[200px] overflow-y-auto ">
                    {loadingTokens ? (
                        <div className="flex items-center justify-center py-4">
                            <Loader2 size={20} className="animate-spin text-muted-foreground" />
                        </div>
                    ) : tokens.length === 0 ? (
                        <p className="text-xs text-muted-foreground text-center py-4">No tokens found</p>
                    ) : (
                        tokens.map((token, index) => (
                            <div
                                key={token.mint + index}
                                className="flex items-center justify-between bg-card/50 rounded-xl px-4 py-3 border border-border/50"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                        <span className="text-[10px] font-bold text-primary">
                                            {token.symbol?.slice(0, 2).toUpperCase()}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold">{token.symbol}</p>
                                        <p className="text-[10px] text-muted-foreground font-mono">
                                            {truncateAddress(token.mint)}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold">
                                        {formatAmount(token.amount, token.decimals)}
                                    </p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

function truncateAddress(address: string): string {
    if (address.length <= 16) return address;
    return `${address.slice(0, 8)}...${address.slice(-8)}`;
}

function formatAmount(amount: number, decimals: number): string {
    if (amount === 0) return "0";
    if (decimals === 0) return amount.toString();
    const formatted = amount.toFixed(Math.min(decimals, 6));
    return parseFloat(formatted).toString();
}

export default TokenList;