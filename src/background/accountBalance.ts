import { useUIStore } from "@/store/uiStore";
import axios from "axios";

export const getAccountBalance = async (publicKey: string, network : string) => {
    if (network == "DEVNET") {
        const response = await axios.post("https://solana-devnet.g.alchemy.com/v2/9PcqvNgkWVNP-WgjqzII7", {
            id: '1',
            jsonrpc: "2.0",
            method: "getBalance",
            params: [publicKey]
        });
        console.log("BALANCE IS : ", response.data.result.value);
        return response.data.result.value;
    }
    else {
        const response = await axios.post("https://solana-mainnet.g.alchemy.com/v2/9PcqvNgkWVNP-WgjqzII7", {
            id: '1',
            jsonrpc: "2.0",
            method: "getBalance",
            params: [publicKey]
        });
        return response.data.result.value;
    }
}