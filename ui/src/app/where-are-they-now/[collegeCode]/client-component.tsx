"use client";

import type collegesService from "~/app/(services)/colleges-service";
import CollegeCard from "./college-card";
import PlayerCard from "./player-card";
import type { PlayerWithStats } from "./recent-game-card";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { leagues } from "~/app/(common)/leagues";
import LeagueSelect from "./league-select";
import { TestChart } from "./test-chart";
import { TestTable } from "./test-table";
import { Database } from "~/lib/supabase-types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
type WhereAreTheyNowClientComponentProps = {
  playersWithStats: PlayerWithStats[];
  college: Awaited<ReturnType<typeof collegesService.getCollegeByCode>>;
  collegeStatTotals: Awaited<
    ReturnType<typeof collegesService.getCollegeStatTotals>
  >;
  collegeSalaryTotals: Awaited<
    ReturnType<typeof collegesService.getCollegeSalaryTotals>
  >;
  playerTotals: Database["public"]["Views"]["player_season_totals_with_details"]["Row"][];
};

export default function WhereAreTheyNowClientComponent({
  playersWithStats,
  college,
  collegeStatTotals,
  collegeSalaryTotals,
  playerTotals,
}: WhereAreTheyNowClientComponentProps) {
  const searchParams = useSearchParams();
  const [selectedLeague, setSelectedLeague] = useState<"nba" | "gl" | "all">(
    (searchParams.get("league")?.toLowerCase() as "nba" | "gl" | "all") ??
      "all",
  );
  const [selectedSeason, setSelectedSeason] = useState<number>(2025);

  const playersWithStatsAndTotals = playersWithStats
    .filter((player) => player.player_stats.length > 0)
    .filter((player) => {
      return player.player_stats.some((stat) => {
        return (
          selectedLeague === "all" ||
          stat.league_id === leagues[selectedLeague].id
        );
      });
    })
    .map((player) => {
      return {
        ...player,
        player_stats: player.player_stats.filter((stat) => {
          return (
            selectedLeague === "all" ||
            stat.league_id === leagues[selectedLeague].id
          );
        }),
      };
    })
    .map((player) => {
      return {
        ...player,
        totals: player.player_stats.reduce(
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
    });

  playersWithStatsAndTotals.sort((a, b) => {
    return (
      new Date(b.player_stats[0]?.game_date ?? "").getTime() -
      new Date(a.player_stats[0]?.game_date ?? "").getTime()
    );
  });

  if (!playersWithStats) {
    return <div>No players found</div>;
  }

  return (
    <div className="mx-auto max-w-3xl px-8 pt-4">
      <Tabs defaultValue="current">
        <div className="mb-6 flex w-full justify-center">
          <TabsList className="grid w-[400px] grid-cols-2">
            <TabsTrigger value="historical" className="w-full">
              Historical Trends
            </TabsTrigger>
            <TabsTrigger value="current" className="w-full">
              Current Season
            </TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="current">
          <LeagueSelect
            selectedLeague={selectedLeague}
            setSelectedLeague={(league) => {
              setSelectedLeague(league);
              const params = new URLSearchParams(searchParams);
              params.set("league", league);
              window.history.replaceState(
                null,
                "",
                `/where-are-they-now/${college.code}?${params.toString()}`,
              );
            }}
          />
          <CollegeCard
            college={college}
            allCollegeStatTotals={collegeStatTotals}
            playersWithStats={playersWithStatsAndTotals}
            collegeSalaryTotals={collegeSalaryTotals}
            selectedLeague={selectedLeague}
          />
          {playersWithStatsAndTotals.map((player) => {
            return (
              <div className="mb-8" key={player?.id}>
                <PlayerCard playerAndStats={player} />
              </div>
            );
          })}
        </TabsContent>
        <TabsContent value="historical">
          <TestChart
            playerTotals={playerTotals}
            selectSeason={setSelectedSeason}
          />
          <TestTable
            playerTotals={playerTotals.filter(
              (stat) => stat.season === selectedSeason,
            )}
            season={selectedSeason}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
