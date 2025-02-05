import collegesService from "~/app/(services)/colleges-service";
import PlayerCard, { PlayerGroup } from "./player-card";
import { PlayerWithStats } from "./recent-game-card";
import CollegeCard from "./college-card";

export default async function Page({
  params,
}: {
  params: Promise<{ collegeCode: string }>;
}) {
  const year = 2025;
  const { collegeCode: collegeCodeBeforeCaps } = await params;
  const collegeCode = collegeCodeBeforeCaps.toUpperCase();
  const [college, playersWithStats, collegeStatTotals, collegeSalaryTotals] =
    await Promise.all([
      collegesService.getCollegeByCode(collegeCode),
      fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}player-stats/college-code?college_code=${collegeCode}${year ? `&year=${year}` : ""}`,
      ).then((res) => res.json() as Promise<PlayerWithStats[]>),
      collegesService.getCollegeStatTotalsWithRankings(year),
      collegesService.getCollegeSalaryTotals(),
    ]);

  const playersWithStatsAndTotals = playersWithStats
    .filter((player) => player.player_stats.length > 0)
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
      <CollegeCard
        college={college}
        allCollegeStatTotals={collegeStatTotals}
        playersWithStats={playersWithStatsAndTotals}
        collegeSalaryTotals={collegeSalaryTotals}
      />
      {playersWithStatsAndTotals.map((player) => {
        return (
          <div className="mb-8" key={player?.id}>
            <PlayerCard playerAndStats={player} />
          </div>
        );
      })}
    </div>
  );
}
