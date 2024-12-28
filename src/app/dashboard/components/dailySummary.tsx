"use client";

import { useEffect, useState } from "react";
import Table from "./table";
import { getGamesByDate } from "../scoreboard";
import { GameRecord, getPlayerStats } from "~/lib/handleCache";
import { useRouter } from "next/navigation";

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

type DailySummaryProps = {
  children: React.ReactNode;
  date: string | undefined;
};

const DailySummary = ({ children, date }: DailySummaryProps) => {
  const [selectedDate, setSelectedDate] = useState(
    date ? new Date(date) : new Date(),
  );
  const [allPlayerStats, setAllPlayerStats] = useState<GameRecord[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handlePrevDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() - 1);
    setSelectedDate(newDate);
    router.push(`/dashboard?date=${newDate.toISOString()}`);
  };

  const handleNextDay = () => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + 1);
    setSelectedDate(newDate);
    router.push(`/dashboard?date=${newDate.toISOString()}`);
  };

  useEffect(() => {
    setLoading(true);

    getGamesByDate(selectedDate).then((data) => {
      getPlayerStatsByGame(data).then((playerStats) => {
        setAllPlayerStats(playerStats);
        setLoading(false);
      });
    });
  }, [selectedDate]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={handlePrevDay}
          className="rounded border px-3 py-1 hover:bg-gray-100"
        >
          &lt;
        </button>
        <span className="min-w-32 text-center">
          {selectedDate.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
        <button
          onClick={handleNextDay}
          className="rounded border px-3 py-1 hover:bg-gray-100"
        >
          &gt;
        </button>
      </div>
      {loading ? (
        <div className="flex h-[50vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
        </div>
      ) : (
        <Table games={allPlayerStats} />
      )}
      {children}
    </div>
  );
};

export default DailySummary;
