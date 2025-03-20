import axios from "axios";

export default async function handler(req, res) {
    try {
        // Replace this URL with your actual deployed Flask API URL on Vercel
        const response = await axios.get("https://your-api.vercel.app/top-artists");
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching data from API:", error);
        res.status(500).json({ error: "Failed to fetch data" });
    }
}
