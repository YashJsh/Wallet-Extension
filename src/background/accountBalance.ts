import axios from "axios";

export const getAccountBalance = async (publicKey: string) => {
    const response = await axios.post("https://solana-devnet.g.alchemy.com/v2/9PcqvNgkWVNP-WgjqzII7", {
        id: '1',
        jsonrpc: "2.0",
        method: "getBalance",
        params: [publicKey]
    });
    return response.data.result.value;
}