import axios from "axios";

export default async function handler(req, res) {
    try {
        const response = await axios.get("http://127.0.0.1:5000/top-artists"); // Your API
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch data" });
    }
}
