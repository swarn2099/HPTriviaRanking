import React, { useEffect, useState } from "react";
import RankingTable from "./components/RankingTable.tsx";
import { getScores } from "./utils/utils.ts";
import "./App.css";
import { Box, Container, Typography } from "@mui/material";

function App() {
  const [scores, setScores] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const results = await getScores();
        setScores(results);
      } catch (error) {
        console.error("Error fetching scores:", error);
      }
    };

    fetchData(); // Call the async function
  }, []);

  // const tempScores = [
  //   { teamName: "Pygmy Puff Club", totalPts: 260, rank: 1 },
  //   { teamName: "Merlin's Beard", totalPts: 253, rank: 2 },
  //   { teamName: "Hufflepuff pizza puffs", totalPts: 217, rank: 3 },
  //   { teamName: "Snape on a Plane", totalPts: 212, rank: 4 },
  //   { teamName: "Dumbledore's Army", totalPts: 210, rank: 5 },
  //   {
  //     teamName: "Sirius Black Is This Year's Pink",
  //     totalPts: 206,
  //     rank: 6,
  //   },
  //   { teamName: "DumbleDore's army pt 2", totalPts: 153, rank: 7 },
  //   { teamName: "Buckbeak's Fan Club", totalPts: 133, rank: 8 },
  // ];

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundImage: "url('./assets/backgroundimg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        "&::after": {
          content: "''",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.6)", // Overlay to dim the image
          zIndex: 1,
        },
      }}
    >
      <Container
        sx={{
          zIndex: 2, // Ensures it stays above the overlay
          padding: 3,
          background: "linear-gradient(145deg, #0a1128, #060317)", // Metallic slate dark blue gradient
          borderRadius: 2,
          boxShadow: "0 4px 30px rgba(205, 127, 50, 0.7)", // Bronze glow effect
          maxWidth: 800, // Limit max width
          width: "90%", // Ensure responsiveness
          border: "0.5px solid rgba(255, 215, 0, 0.2)", // Optional: Golden/bronze border for a more metallic effect
          position: "relative",
          "&::before": {
            content: "''",
            position: "absolute",
            inset: 0,
            zIndex: -1,
            borderRadius: 2,
            boxShadow: "0 0 1px 1px rgba(205, 127, 50, 0.6)", // Inner bronze glow
          },
        }}
      >
        <Typography
          variant="h4"
          align="center"
          sx={{
            fontFamily: "'Cinzel', serif",
            marginBottom: 2,
            color: "white",
            fontWeight: 800,
          }}
        >
          Current Standings
        </Typography>
        <RankingTable data={scores} />
      </Container>
    </Box>
  );
}

export default App;
