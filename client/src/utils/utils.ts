const scoresURL =
  "https://freepubtrivia.com/api/toc/variable-standings-by-bar/barId=294&scoreCutoff=4&standingsLimit=6&startTimeEpoch=1735694131&triviaType=theme";

const calculateRankings = (scores) => {
  // console.log("Resecived Scores: ", scores)
  const validTeams = scores.filter((team) => team.totals.length > 1);
  const sortedTeams = validTeams.map((team) => {
    let highestTotal;
    if (team.totals.length === 2) {
      highestTotal = team.totals.reduce(
        (partialSum, a) => parseInt(partialSum) + parseInt(a),
        0
      );
    } else {
      highestTotal = team.totals
        .sort((a, b) => b - a)
        .slice(0, 2)
        .reduce((partialSum, a) => parseInt(partialSum) + parseInt(a), 0);
    }
    return { teamName: team.teamnames, totalPts: highestTotal };
  });

  const rankedTeams = sortedTeams
    .sort((a, b) => b.totalPts - a.totalPts)
    .map((team, index) => {
      return {
        teamName: team.teamName,
        totalPts: team.totalPts,
        rank: index + 1,
      };
    });

  return rankedTeams;
};

const getMostRecentResults = async () => {
  const scoresJSON = await fetch(scoresURL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json(); // Parse JSON directly
    })
    .catch((error) => {
      console.error("Error fetching scores: ", error);
      return null; // Return null if fetch fails
    });

  if (!scoresJSON || scoresJSON.length === 0) {
    console.error("No valid scores received from API.");
    return [];
  }

  console.log("Scores Received:", scoresJSON);
  return scoresJSON.slice(0, scoresJSON.length - 1);
};

export const getScores = async () => {
  const scores = await getMostRecentResults();
  const results = await calculateRankings(scores);
  console.log(results);

  return results;
};
