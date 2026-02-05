import {
    Connection,
    LAMPORTS_PER_SOL,
    PublicKey,
    SystemProgram,
    Transaction,
    clusterApiUrl,
    sendAndConfirmTransaction,
} from "@solana/web3.js";
import keyring from "./keyring";
import type { AppNetwork } from "@/store/uiStore";

export const sendSol = async (publicKey: string, to: string, amount: number, network : AppNetwork) => {
    let networkUrl;
    if (network === "DEVNET"){
        networkUrl = clusterApiUrl("devnet");
    }else{
        networkUrl = clusterApiUrl("mainnet-beta")
    }
    const connection = new Connection(networkUrl, {
        commitment: "confirmed",
    });
    const payer = new PublicKey(publicKey);

    const balance = await connection.getBalance(payer);
    const bal = balance / LAMPORTS_PER_SOL;
    if (bal < amount) return;

    const keyPair = keyring.getKeyPair(publicKey);

    if (!keyPair) {
        return "Wallet Not Found"
    }

    try {
        const { blockhash } = await connection.getLatestBlockhash();

        const transaction = new Transaction({
            feePayer: payer,
            recentBlockhash: blockhash,
        });

        transaction.add(
            SystemProgram.transfer({
                fromPubkey: payer,
                toPubkey: new PublicKey(to),
                lamports: amount * LAMPORTS_PER_SOL,
            })
        );
        const signature = await sendAndConfirmTransaction(connection, transaction, [keyPair]);
        return signature;
    } catch (error) {
        console.error(error);
        return "System Error";
    }
};
