import axios from "axios";

export default async function handler(req, res) {
    try {
        const { endpoint } = req.query;
        const apiUrl = `https://your-api.vercel.app/${endpoint}`; // Update with correct API URL

        console.log(`Fetching API: ${apiUrl}`);  // Log the API URL

        const response = await axios.get(apiUrl, {
            headers: { "Accept": "application/json" } // Expect JSON response
        });

        console.log("API Response:", response.data); // Log raw response

        // Check if the response is valid JSON
        if (typeof response.data === "object") {
            res.json(response.data);
        } else {
            res.status(500).json({ error: "Invalid JSON response from API" });
        }
    } catch (error) {
        console.error("Proxy Error:", error.message);
        res.status(500).json({ error: "Failed to fetch data", details: error.message });
    }
}
