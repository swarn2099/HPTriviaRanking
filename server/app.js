const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors()); // Allow all origins
app.use(express.json());

app.get("/api/scores", async (req, res) => {
    try {
        const response = await axios.get(
            "https://freepubtrivia.com/api/toc/variable-standings-by-bar/barId=294&scoreCutoff=4&standingsLimit=6&startTimeEpoch=1735694131&triviaType=theme"
        );
        res.json(response.data); // Forward the API's response
    } catch (error) {
        console.error("Error fetching from API:", error);
        res.status(500).send("Failed to fetch data");
    }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Proxy server running on port ${PORT}`));