import { getPlayerStats } from "~/lib/handleCache";
import { GameRecord } from "~/lib/handleCache";
import { getGamesByDate } from "../scoreboard";
import Table from "./table";

const getPlayerStatsByGame = async (
  gameRecords: Awaited<ReturnType<typeof getGamesByDate>>,
) => {
  let games: GameRecord[] = [];
  for (const gameRecord of gameRecords) {
    const playerStats = await getPlayerStats(gameRecord);
    if (playerStats === null) continue;
    games.push({ game: gameRecord, players: playerStats });
  }
  return games;
};

const DailySummaryLoader = async ({ date }: { date: string | undefined }) => {
  const selectedDate = date ? new Date(date) : new Date();
  const games = await getGamesByDate(selectedDate);
  const playerStats = await getPlayerStatsByGame(games);
  return <Table games={playerStats} />;
};

export default DailySummaryLoader;
