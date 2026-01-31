import { PublicKey, VersionedTransaction } from "@solana/web3.js";
import axios from "axios";

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
                'x-api-key': process.env.JUPITER_API_KEY,
            },
        }
    );
    console.log(JSON.stringify(quoteResponse.data, null, 2));
    return quoteResponse;
}

export const swapTransaction = async (quoteResponse : any, keyPair : { publicKey : string, secretKey : Uint8Array})=>{
    const swapTransaction = await axios.post(
        "https://api.jug.ag/swap/v1/swap",
        {
            quoteResponse : quoteResponse.data,
            userPublicKey : new PublicKey(keyPair.publicKey),
        },
        {
                headers: {
                    'x-api-key': process.env.JUPITER_API_KEY,
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