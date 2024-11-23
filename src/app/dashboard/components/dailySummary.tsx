"use client";

import { useEffect, useState } from "react";
import { TeamSchedule, Game, Team, TeamAbbreviation } from "../teams";
import { getPlayerByTeamAbbreviation, Player } from "../players";
import Table from "./table";

const getGamesOnSelectedDate = (
  teamSchedules: TeamSchedule[],
  selectedDate: Date,
): { games: Game[]; team: Team }[] => {
  let result: { games: Game[]; team: Team }[] = [];
  teamSchedules.map((teamSchedule) => {
    const currentTeam: { games: Game[]; team: Team } = {
      games: [],
      team: teamSchedule.team,
    };
    const gameOnSelectedDate = teamSchedule.games.filter(
      (game) => game.date.toDateString() === selectedDate.toDateString(),
    );
    if (gameOnSelectedDate.length > 0) {
      currentTeam.games = gameOnSelectedDate;
    }
    result.push(currentTeam);
  });
  return result;
};

const BOX_SCORE_BASE_URL =
  "https://site.web.api.espn.com/apis/site/v2/sports/basketball/nba/summary?region=us&lang=en&contentorigin=espn&event=";

const getPlayerStatsForDate = async (
  teamRecords: { games: Game[]; team: Team }[],
) => {
  const stats = [];
  for (const teamRecord of teamRecords) {
    const game = teamRecord.games[0];
    if (!game) continue;
    const boxScoreResponse = await fetch(`${BOX_SCORE_BASE_URL}${game.id}`);
    const boxScoreResponseParsed = await boxScoreResponse.json();

    const teamStats = boxScoreResponseParsed.boxscore.players.find(
      (dumbObject: any) => dumbObject.team.id === teamRecord.team.id,
    );
    const player = getPlayerByTeamAbbreviation(
      teamRecord.team.abbreviation as TeamAbbreviation,
    );
    const athleteStats = teamStats.statistics[0].athletes.find(
      (p: any) => p.athlete.id === player.id,
    );
    const playerRecord = {
      player,
      stats: athleteStats ? athleteStats.stats : [],
    };
    stats.push(playerRecord);
  }
  return stats;
};

const DailySummary = ({ teamSchedules }: { teamSchedules: TeamSchedule[] }) => {
  const [selectedDate, setSelectedDate] = useState(() => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday;
  });
  const [allPlayerStats, setAllPlayerStats] = useState<
    { stats: string[]; player: Player }[]
  >([]);

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

  const gamesOnSelectedDate = getGamesOnSelectedDate(
    teamSchedules,
    selectedDate,
  );

  useEffect(() => {
    getPlayerStatsForDate(gamesOnSelectedDate).then((data) =>
      setAllPlayerStats(data),
    );
  }, [selectedDate]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
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
      <Table allPlayerStats={allPlayerStats} />
    </div>
  );
};

export default DailySummary;
