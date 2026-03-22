import axios from "axios";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

const url = import.meta.env.VITE_RPC_URL;
const mainnetUrl = import.meta.env.VITE_RPC_MAINNET_URL;

export interface UserTokens {
    pubkey: string;
    mint: string;
    amount: number;
    decimals: number;
    symbol?: string;
}

const MINT_TO_SYMBOL: Record<string, string> = {
    "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v": "USDC",
    "Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB": "USDT",
    "So11111111111111111111111111111111111111112": "wSOL",
    "mSoLzYCxHdYgdzU16g5QSh3i5K3z3KZK7ytfqcJm7So": "mSOL",
    "JUPyiwrYJFskUPiHa7hkeR8VUtAeFoSYbKedZNsDvCN": "JUP",
    "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263": "BONK",
};

export const getUserTokens = async (publicKey: string, network: string): Promise<UserTokens[]> => {
    const rpcUrl = network === "DEVNET" ? url : mainnetUrl;
    
    const response = await axios.post(rpcUrl, {
        id: '1',
        jsonrpc: "2.0",
        method: "getTokenAccountsByOwner",
        params: [
            publicKey,
            { programId: TOKEN_PROGRAM_ID.toBase58() },
            { encoding: "jsonParsed" }
        ]
    });

    const tokenAccounts = response.data.result.value;
    const tokens: UserTokens[] = tokenAccounts
        .map((token: any) => {
            const info = token.account.data.parsed.info;
            return {
                pubkey: token.pubkey,
                mint: info.mint,
                amount: info.tokenAmount.uiAmount,
                decimals: info.tokenAmount.decimals,
                symbol: MINT_TO_SYMBOL[info.mint] || truncateMint(info.mint),
            };
        })
        .filter((t: UserTokens) => t.amount > 0);
    
    return tokens;
};

function truncateMint(mint: string): string {
    return `${mint.slice(0, 4)}...${mint.slice(-4)}`;
}
