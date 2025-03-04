"use client";

import { useEffect, useState } from "react";

import type collegesService from "~/app/(services)/colleges-service";
import PlayerCard from "../../where-are-they-now/[collegeCode]/player-card";
import type { PlayerWithStats } from "../../where-are-they-now/[collegeCode]/recent-game-card";
import { useSearchParams } from "next/navigation";
import { leagues } from "~/app/(common)/leagues";
import LeagueSelect from "../../where-are-they-now/[collegeCode]/league-select";

type PlayerClientComponentProps = {
  playerWithStats: PlayerWithStats | undefined;
  college: Awaited<ReturnType<typeof collegesService.getCollegeByCode>> | null;
};

export default function PlayerClientComponent({
  playerWithStats,
  college,
}: PlayerClientComponentProps) {
  const searchParams = useSearchParams();
  const [selectedLeague, setSelectedLeague] = useState<"nba" | "gl" | "all">(
    (searchParams.get("league")?.toLowerCase() as "nba" | "gl" | "all") ??
      "all",
  );

  if (!playerWithStats) {
    return <div>Player not found</div>;
  }

  const leaguesToInclude = new Set<number>();
  playerWithStats.player_stats.forEach((stat) => {
    if (!leaguesToInclude.has(stat.league_id)) {
      leaguesToInclude.add(stat.league_id);
    }
  });

  useEffect(() => {
    if (Array.from(leaguesToInclude).length === 1) {
      const league = Object.keys(leagues).find(
        (key) =>
          leagues[key as keyof typeof leagues].id ===
          Array.from(leaguesToInclude)[0],
      );
      setSelectedLeague(league as "nba" | "gl");
    }
  }, [leaguesToInclude]);

  const playerWithStatsInLeague = {
    ...playerWithStats,
    player_stats: playerWithStats.player_stats.filter((stat) => {
      return (
        selectedLeague === "all" ||
        stat.league_id === leagues[selectedLeague].id
      );
    }),
  };

  const playerWithStatsAndTotals = {
    ...playerWithStatsInLeague,
    totals: playerWithStatsInLeague.player_stats.reduce(
      (acc, stat) => {
        acc.minutes += stat.minutes ?? 0;
        acc.points += stat.points ?? 0;
        acc.field_goals_made += stat.fg_m ?? 0;
        acc.field_goals_attempted += stat.fg_a ?? 0;
        acc.three_points_made += stat.three_fg_m ?? 0;
        acc.three_points_attempted += stat.three_fg_a ?? 0;
        acc.free_throws_made += stat.ft_m ?? 0;
        acc.free_throws_attempted += stat.ft_a ?? 0;
        acc.offensive_rebounds += stat.rebounds_off ?? 0;
        acc.rebounds += stat.rebounds ?? 0;
        acc.assists += stat.assists ?? 0;
        acc.steals += stat.steals ?? 0;
        acc.blocks += stat.blocks ?? 0;
        acc.turnovers += stat.turnovers ?? 0;
        acc.personal_fouls += stat.fouls ?? 0;
        acc.games_played += 1; // Increment games played for each record
        acc.games_started += stat.started ? 1 : 0;

        return acc;
      },
      {
        minutes: 0,
        points: 0,
        field_goals_made: 0,
        field_goals_attempted: 0,
        three_points_made: 0,
        three_points_attempted: 0,
        free_throws_made: 0,
        free_throws_attempted: 0,
        offensive_rebounds: 0,
        rebounds: 0,
        assists: 0,
        steals: 0,
        blocks: 0,
        turnovers: 0,
        personal_fouls: 0,
        games_played: 0,
        games_started: 0,
      },
    ),
  };

  return (
    <div className="mx-auto max-w-3xl px-8 pt-4">
      <LeagueSelect
        selectedLeague={selectedLeague}
        setSelectedLeague={(league) => {
          setSelectedLeague(league);
          const params = new URLSearchParams(searchParams);
          params.set("league", league);
          window.history.replaceState(
            null,
            "",
            `/player/${playerWithStats.id}?${params.toString()}`,
          );
        }}
        leaguesToInclude={Array.from(leaguesToInclude)}
      />
      <PlayerCard
        playerAndStats={playerWithStatsAndTotals}
        college={college ?? undefined}
      />
    </div>
  );
}
