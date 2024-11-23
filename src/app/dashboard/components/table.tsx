import { Player } from "../players";
import { Game } from "../teams";
import { Team, teams } from "../teams";

type GameRecord = {
  game: Game;
  players: { stats: string[]; player: Player }[];
};

export default function Table({
  allPlayerStats,
  games,
}: {
  allPlayerStats: { stats: string[]; player: Player }[];
  games: { games: Game[]; team: Team }[];
}) {
  const playersGroupedByGame: GameRecord[] = [];
  Object.values(games).map((g) => {
    g.games.forEach((game) => {
      const gameRecord: GameRecord = { game: game, players: [] };
      const [team1, team2] = game.teamIds;
      allPlayerStats.forEach((player) => {
        if (
          player.player.teamId.toString() === team1 ||
          player.player.teamId.toString() === team2
        ) {
          gameRecord.players.push(player);
        }
      });
      playersGroupedByGame.push(gameRecord);
    });
  });
  return (
    <div className="flex flex-col gap-6">
      {playersGroupedByGame.map((gameRecord) => (
        <div key={gameRecord.game.id} className="flex flex-col gap-2">
          <div>
            <h4 className="font-bold">{gameRecord.game.name}</h4>
            {gameRecord.game.status !== "completed" && (
              <p>{gameRecord.game.status}</p>
            )}
          </div>
          <table className="min-w-full border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-200 px-4 py-2">Player</th>
                <th className="border border-gray-200 px-4 py-2">MIN</th>
                <th className="border border-gray-200 px-4 py-2">FG</th>
                <th className="border border-gray-200 px-4 py-2">3PT</th>
                <th className="border border-gray-200 px-4 py-2">FT</th>
                <th className="border border-gray-200 px-4 py-2">REB</th>
                <th className="border border-gray-200 px-4 py-2">AST</th>
                <th className="border border-gray-200 px-4 py-2">STL</th>
                <th className="border border-gray-200 px-4 py-2">BLK</th>
                <th className="border border-gray-200 px-4 py-2">TO</th>
                <th className="border border-gray-200 px-4 py-2">PF</th>
                <th className="border border-gray-200 px-4 py-2">+/-</th>
                <th className="border border-gray-200 px-4 py-2">PTS</th>
              </tr>
            </thead>
            <tbody>
              {gameRecord.players.map((playerStats, index) => (
                <tr key={index}>
                  <td className="border border-gray-200 px-4 py-2">
                    {playerStats.player.name}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {playerStats.stats[0]}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {playerStats.stats[1]}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {playerStats.stats[2]}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {playerStats.stats[3]}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {playerStats.stats[6]}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {playerStats.stats[7]}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {playerStats.stats[8]}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {playerStats.stats[9]}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {playerStats.stats[10]}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {playerStats.stats[11]}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {playerStats.stats[12]}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {playerStats.stats[13]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}
