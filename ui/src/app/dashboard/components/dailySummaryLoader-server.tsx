// import { getPlayerStats } from "~/lib/handleCache";
import type { GameRecord } from "~/lib/handleCache";
import { getGamesByDate } from "../scoreboard";
import Table from "./leagueList";

// const getPlayerStatsByGame = async (
//   gameRecords: Awaited<ReturnType<typeof getGamesByDate>>,
// ) => {
//   const games: GameRecord[] = [];
//   for (const gameRecord of gameRecords) {
//     const playerStats = await getPlayerStats(gameRecord);
//     if (playerStats === null) continue;
//     games.push({ game: gameRecord, players: playerStats });
//   }
//   return games;
// };

const DailySummaryLoader = async ({ date }: { date: string }) => {
  const games = await getGamesByDate(date);
  // const playerStats = await getPlayerStatsByGame(games);
  // return <Table games={playerStats} />;
  return <div>Hello</div>;
};

export default DailySummaryLoader;
