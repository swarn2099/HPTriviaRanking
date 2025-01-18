import React from "react";
import "./App.css";
import RankingTable from "./components/RankingTable.tsx";
import { getScores } from "./utils/utils.ts";

async function App() {
  const scores = await getScores();
  return (
    <div className="App">
      <RankingTable ranking={scores} />
    </div>
  );
}

export default App;
