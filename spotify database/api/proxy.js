import axios from "axios";

export default async function handler(req, res) {
    try {
        const { endpoint } = req.query; // Get the requested endpoint
        const apiUrl = `https://your-api.vercel.app/${endpoint}`; // Construct API URL

        const response = await axios.get(apiUrl, {
            headers: { "Accept": "application/json" } // Ensure JSON response
        });

        // Check if response is already JSON
        if (typeof response.data === "object") {
            res.json(response.data);
        } else {
            res.status(500).json({ error: "Invalid JSON response from API" });
        }
    } catch (error) {
        console.error("Proxy error:", error);
        res.status(500).json({ error: "Failed to fetch data" });
    }
}
