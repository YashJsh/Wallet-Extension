import {
    Connection,
    LAMPORTS_PER_SOL,
    PublicKey,
    clusterApiUrl
} from "@solana/web3.js";


const getAirDrop = async (amount: number, address: string, customRpcUrl: string) => {
    const connectionUrl = customRpcUrl.trim() !== ""
        ? customRpcUrl
        : clusterApiUrl("devnet");
    const connection = new Connection(connectionUrl, "confirmed");
    const receiver = new PublicKey(address);
    const airdropAmount = amount * LAMPORTS_PER_SOL;
    const signature = await connection.requestAirdrop(receiver, airdropAmount);
    return signature;
}

export { getAirDrop }
