"use client";

import { useEffect, useState } from "react";
import { Game } from "../teams";
import { Player, PLAYERS } from "../players";
import Table from "./table";
import { getGamesByDate } from "../scoreboard";

export type GameRecord = {
  game: Game;
  players: { stats: string[]; player: Player }[];
};

const BOX_SCORE_BASE_URL =
  "https://site.web.api.espn.com/apis/site/v2/sports/basketball/nba/summary?region=us&lang=en&contentorigin=espn&event=";

const getPlayerStatsByGame = async (
  gameRecords: Awaited<ReturnType<typeof getGamesByDate>>,
) => {
  let games: GameRecord[] = [];
  for (const gameRecord of gameRecords) {
    let players: { stats: string[]; player: Player }[] = [];
    const boxScoreResponse = await fetch(
      `${BOX_SCORE_BASE_URL}${gameRecord.id}`,
    );
    const boxScoreResponseParsed = await boxScoreResponse.json();

    if (!("players" in boxScoreResponseParsed.boxscore)) continue;

    boxScoreResponseParsed.boxscore.players.forEach((element: any) => {
      const athletes = element.statistics[0].athletes;
      const uconnPlayerIds = Object.values(PLAYERS).map((p) => p.id);
      const athletesOfInterest = athletes.filter(
        (a: { athlete: { id: string } }) =>
          uconnPlayerIds.includes(a.athlete.id),
      );
      athletesOfInterest.forEach(
        (a: { athlete: { id: string }; stats: string[] }) => {
          players.push({
            stats: a.stats,
            player: PLAYERS.find((p) => p.id === a.athlete.id)!,
          });
        },
      );
    });
    games.push({ game: gameRecord, players });
  }
  return games;
};

const DailySummary = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [allPlayerStats, setAllPlayerStats] = useState<GameRecord[]>([]);
  const [loading, setLoading] = useState(false);

  const handlePrevDay = () => {
    setSelectedDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() - 1);
      return newDate;
    });
  };

  const handleNextDay = () => {
    setSelectedDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(prev.getDate() + 1);
      return newDate;
    });
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
    </div>
  );
};

export default DailySummary;
