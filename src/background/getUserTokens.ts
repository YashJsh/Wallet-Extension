import type { Connection, PublicKey } from "@solana/web3.js";
import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

export interface UserTokens {
    pubkey: PublicKey;
    mint: string;
    amount: number;
    decimals: number;
}

export const getUserTokens = async (connection : Connection, pubKey : PublicKey)=>{
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(pubKey, {
        programId: TOKEN_PROGRAM_ID
    });
    console.log("TokenAccounts of user are : ", tokenAccounts);
    const tokens: UserTokens[] = tokenAccounts.value
        .map((token) => {
            const info = token.account.data.parsed.info;
            return {
                pubkey: token.pubkey,
                mint: info.mint,
                amount: info.tokenAmount.uiAmount,
                decimals: info.tokenAmount.decimals,
            };
    });
    return tokens;
}
