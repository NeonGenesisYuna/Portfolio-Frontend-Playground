import axios from "axios";

export default async function handler(req, res) {
    try {
        const { endpoint } = req.query; // Get the requested endpoint
        const apiUrl = `https://portfolio-frontend-playground.vercel.app/spotify%20database/${endpoint}`; // Use the full URL

        console.log(`Fetching API: ${apiUrl}`);  // Log the URL for debugging

        const response = await axios.get(apiUrl, {
            headers: { "Accept": "application/json" } // Expect JSON response
        });

        console.log("API Response:", response.data); // Log the actual response

        // Check if response is valid JSON
        if (typeof response.data === "object") {
            res.json(response.data); // Send the JSON data
        } else {
            res.status(500).json({ error: "Invalid JSON response from API" });
        }
    } catch (error) {
        console.error("Proxy Error:", error.message);
        res.status(500).json({ error: "Failed to fetch data", details: error.message });
    }
}
     