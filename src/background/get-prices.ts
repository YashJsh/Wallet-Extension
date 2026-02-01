import axios from "axios"

export const getTokenPrice = async () => {
    const response = await axios.get("https://api.jup.ag/price/v3?ids=So11111111111111111111111111111111111111112,EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v", {
        headers: {
            'x-api-key': 'b341f5b4-8381-40f5-a140-82e4eb16cc3d',
        },
    })
    const solPrice = response.data["So11111111111111111111111111111111111111112"].usdPrice;
    const usdcPrice = response.data["EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v"].usdPrice;
    return { solPrice, usdcPrice };
}

