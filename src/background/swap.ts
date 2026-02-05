import { PublicKey, VersionedTransaction } from "@solana/web3.js";
import axios from "axios";

const API_KEY = import.meta.env.VITE_JUPITER_API_KEY;

export const tokens = {
    sol : "So11111111111111111111111111111111111111112",
    usdc : "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"
}

export const getQuote = async (
    inputMint : string,
    outputMint : string,
    amount : number,
    slippageBps : number
)=>{
    
    const quoteResponse = await axios.get(
        'https://api.jup.ag/swap/v1/quote?' +
        `inputMint=${inputMint}` +
        `&outputMint=${outputMint}` +
        `&amount=${amount}` +
        `&slippageBps=${slippageBps}` +
        '&restrictIntermediateTokens=true'
        ,
        {
            headers: {
                'x-api-key': API_KEY,
            },
        }
    );
    const data = {
        outAmount : quoteResponse.data.outAmount,
        slippage : quoteResponse.data.slippageBps,
        inAmount : quoteResponse.data.inAmount,
        platformFee : quoteResponse.data.platformFee,
        routeTaken : quoteResponse.data.routePlan[0].swapInfo.label
    }
    return { quoteResponse, data};
}

export const swapTransaction = async (quoteResponse : any, keyPair : { publicKey : PublicKey, secretKey : Uint8Array})=>{
    const swapTransaction = await axios.post(
        "https://api.jug.ag/swap/v1/swap",
        {
            quoteResponse : quoteResponse.data,
            userPublicKey : new PublicKey(keyPair.publicKey),
        },
        {
                headers: {
                    'x-api-key': API_KEY,
                },
        }
    )
    const swap = swapTransaction.data.swapTransaction;
    const transaction = VersionedTransaction.deserialize(Buffer.from(swap, 'base64'));
    console.log(transaction);

    transaction.sign([{
        publicKey : new PublicKey(keyPair.publicKey),
        secretKey : keyPair.secretKey
    }]);

    const transactionBinary = transaction.serialize();
    console.log(transactionBinary);
    return transactionBinary;
}