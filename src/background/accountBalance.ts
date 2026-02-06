import axios from "axios";

const url = import.meta.env.VITE_RPC_URL;
const mainnetUrl = import.meta.env.VITE_RPC_MAINNET_URL;


export const getAccountBalance = async (publicKey: string, network : string) => {
    if (network == "DEVNET") {
        const response = await axios.post(url, {
            id: '1',
            jsonrpc: "2.0",
            method: "getBalance",
            params: [publicKey]
        });
        return response.data.result.value;
    }
    else {
        const response = await axios.post(mainnetUrl, {
            id: '1',
            jsonrpc: "2.0",
            method: "getBalance",
            params: [publicKey]
        });
        return response.data.result.value;
    }
}