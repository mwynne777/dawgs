import { getPlayerStats } from "~/lib/handleCache";
import type { GameRecord } from "~/lib/handleCache";
import { getGamesByDate } from "../scoreboard";
import Table from "./table";

const getPlayerStatsByGame = async (
  gameRecords: Awaited<ReturnType<typeof getGamesByDate>>,
) => {
  const games: GameRecord[] = [];
  for (const gameRecord of gameRecords) {
    const playerStats = await getPlayerStats(gameRecord);
    if (playerStats === null) continue;
    games.push({ game: gameRecord, players: playerStats });
  }
  return games;
};

const DailySummaryLoader = async ({ date }: { date: string | undefined }) => {
  const selectedDate = date
    ? new Date(
        new Date(date).getTime() + new Date().getTimezoneOffset() * 60 * 1000,
      )
    : new Date(
        new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000,
      );
  const games = await getGamesByDate(selectedDate);
  const playerStats = await getPlayerStatsByGame(games);
  return <Table games={playerStats} />;
};

export default DailySummaryLoader;
