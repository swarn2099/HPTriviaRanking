import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const RankingTable = ({ data }) => {
  function createData(rank: number, teamName: string, totalPts: number) {
    return { rank, teamName, totalPts };
  }

  const rows = data.map(({ rank, teamName, totalPts }) =>
    createData(rank, teamName, totalPts)
  );

  // Define colors for 1st, 2nd, and 3rd place
  const getRowBackground = (rank) => {
    switch (rank) {
      case 1:
        return "rgba(255, 215, 0, 0.3)"; // Gold
      case 2:
        return "rgba(192, 192, 192, 0.3)"; // Silver
      case 3:
        return "rgba(205, 127, 50, 0.3)"; // Bronze
      default:
        return "transparent"; // No background for other rows
    }
  };

  return (
    <TableContainer
      component={Paper}
      sx={{ backgroundColor: "transparent", color: "#fff" }}
    >
      <Table
        sx={{ minWidth: 650, backgroundColor: "transparent" }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            {["Ranking", "Team", "Total"].map((header, index) => (
              <TableCell
                key={index}
                style={{
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: "1.0rem",
                }}
              >
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.rank}
              sx={{
                "&:last-child td, &:last-child th": { border: 0 },
                backgroundColor: getRowBackground(row.rank), // Apply background based on rank
              }}
            >
              <TableCell component="th" scope="row" sx={{ color: "#fff" }}>
                {row.rank}
              </TableCell>
              <TableCell sx={{ color: "#fff" }}>{row.teamName}</TableCell>
              <TableCell sx={{ color: "#fff" }}>{row.totalPts}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default RankingTable;
