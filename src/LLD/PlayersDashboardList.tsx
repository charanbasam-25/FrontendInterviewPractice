import { useState, useMemo } from "react";

const initialPlayers = [
  { id: 1, name: "Virat", role: "batter", rating: 5 },
  { id: 2, name: "Rohit", role: "batter", rating: 4 },
  { id: 3, name: "Bumrah", role: "bowler", rating: 5 },
  { id: 4, name: "Shami", role: "bowler", rating: 4 },
  { id: 5, name: "Jadeja", role: "allrounder", rating: 5 },
  { id: 6, name: "Hardik", role: "allrounder", rating: 4 },
  { id: 7, name: "Dhoni", role: "wicketkeeper", rating: 5 },
  { id: 8, name: "Pant", role: "wicketkeeper", rating: 4 },
  { id: 9, name: "aaaa", role: "bowler", rating: 4 },
  { id: 10, name: "sssssss", role: "batter", rating: 4 },
  { id: 11, name: "lllllll", role: "batter", rating: 4 },
  { id: 12, name: "llasasa", role: "batter", rating: 4 },
  { id: 13, name: "ooo asa", role: "bowler", rating: 4 },
];

function Players() {
  const [AvailablePlayers, setAvailablePlayers] = useState(initialPlayers);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [sortConfig, setSortConfig] = useState({ key: null, dir: "asc" });
  const [playersConfig, setPlayersConfig] = useState({
    batter: [],
    bowler: [],
    wicketkeeper: [],
    allrounder: [],
    total: 0,
  });

  function handleSort(colName) {
    setSortConfig((prev) => {
      if (prev.key == colName) {
        return {
          key: colName,
          dir: prev.dir == "asc" ? "desc" : "asc",
        };
      }
      return {
        key: colName,
        dir: "asc",
      };
    });
  }

  const sortedPlayers = [...AvailablePlayers].sort((a, b) => {
    if (!sortConfig.key) return 0;
    const { key, dir } = sortConfig;
    const val =
      typeof a[key] == "string"
        ? a[key].localeCompare(b[key])
        : a[key] - b[key];

    const order = dir == "asc" ? val : -val;
    return order;
  });

  function addPlayer(playerDe) {
    if (playersConfig.total >= 11) {
      return alert("max 11 only");
    }
    if (playersConfig.batter.length >= 6) {
      return alert("Max 6 batters");
    }
    if (playersConfig.bowler.length > 6) {
      return alert("Max 6 bowler");
    }
    if (playersConfig.wicketkeeper.length > 6) {
      return alert("Max 1 wk");
    }
    if (playersConfig.allrounder.length > 6) {
      return alert("Max 3 btters");
    }

    setPlayersConfig((prev) => ({
      ...prev,
      total: prev.total + 1,
      [playerDe.role]: [...prev[playerDe.role], playerDe.name],
    }));
    setSelectedPlayers((prev) => [...prev, playerDe]);
  }

  function handleRemove(removePlayer) {
    let filteredPlayer = selectedPlayers.filter((eachPlayer, index) => {
      return eachPlayer.name !== removePlayer.name;
    });
    setSelectedPlayers(filteredPlayer);
  }

  function handleDisable(playerDis) {
    return AvailablePlayers.some((eachPlayer, index) => {
      return eachPlayer.name == playerDis.name;
    });
  }
  const selectedIds = new Set(
    selectedPlayers.map((eachPlayer, index) => eachPlayer.name),
  );

  return (
    <div>
      <div>
        <h2>Available Players</h2>
        <table>
          <thead>
            <tr style={{ display: "flex", gap: "80px" }}>
              <th onClick={() => handleSort("name")}>Name</th>
              <th onClick={() => handleSort("role")}>Role</th>
              <th onClick={() => handleSort("rating")}>Rating</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {sortedPlayers.map((eachPlayer, index) => {
              return (
                <tr key={eachPlayer.id}>
                  <td>{eachPlayer.name}</td>
                  <td>{eachPlayer.role}</td>
                  <td>{eachPlayer.rating}</td>
                  <td>
                    <button
                      onClick={() => addPlayer(eachPlayer)}
                      disabled={selectedIds.has(eachPlayer.name)}
                    >
                      Select
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div>
        <h1>Selected Players</h1>

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {selectedPlayers.map((eachPla, index) => {
              return (
                <tr>
                  <td>{eachPla.name}</td>
                  <td>{eachPla.role}</td>
                  <td>{eachPla.rating}</td>
                  <td onClick={() => handleRemove(eachPla)}>Remove</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Players;
