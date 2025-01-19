import collegesService from "~/app/(services)/colleges-service";
import PlayerCard, {
  PlayerGroup,
} from "~/app/seed/[leagueId]/[teamId]/player-card";
import { PlayerWithStats } from "./recent-game-card";

export default async function Page({
  params,
}: {
  params: Promise<{ collegeId: string }>;
}) {
  const { collegeId: collegeIdString } = await params;
  const collegeId = parseInt(collegeIdString);

  const [college, playersWithStats] = await Promise.all([
    collegesService.getCollegeById(collegeId),
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}player-stats/college-id?college_id=${collegeId}`,
    ).then((res) => res.json() as Promise<PlayerWithStats[]>),
  ]);

  // Group players and calculate totals
  const groupedPlayers = playersWithStats.reduce(
    (acc, player) => {
      const key = player.nat_stat_player_id;
      if (!acc[key]) {
        acc[key] = {
          stats: [],
          totals: {
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
        };
      }

      // Add stats to array
      acc[key].stats.push(player);

      // Update totals
      acc[key].totals.minutes += player.minutes ?? 0;
      acc[key].totals.points += player.points ?? 0;
      acc[key].totals.field_goals_made += player.fg_m ?? 0;
      acc[key].totals.field_goals_attempted += player.fg_a ?? 0;
      acc[key].totals.three_points_made += player.three_fg_m ?? 0;
      acc[key].totals.three_points_attempted += player.three_fg_a ?? 0;
      acc[key].totals.free_throws_made += player.ft_m ?? 0;
      acc[key].totals.free_throws_attempted += player.ft_a ?? 0;
      acc[key].totals.offensive_rebounds += player.rebounds_off ?? 0;
      acc[key].totals.rebounds += player.rebounds ?? 0;
      acc[key].totals.assists += player.assists ?? 0;
      acc[key].totals.steals += player.steals ?? 0;
      acc[key].totals.blocks += player.blocks ?? 0;
      acc[key].totals.turnovers += player.turnovers ?? 0;
      acc[key].totals.personal_fouls += player.fouls ?? 0;
      acc[key].totals.games_played += 1; // Increment games played for each record
      acc[key].totals.games_started += player.started ? 1 : 0;
      return acc;
    },
    {} as Record<string, PlayerGroup>,
  );

  const sortedPlayers = Object.values(groupedPlayers).sort((a, b) => {
    return (
      new Date(b.stats[0]?.game_date ?? "").getTime() -
      new Date(a.stats[0]?.game_date ?? "").getTime()
    );
  });

  if (!playersWithStats) {
    return <div>No players found</div>;
  }

  return (
    <div className="mx-auto max-w-3xl px-8 pt-4">
      <div className="mb-8 text-2xl font-bold">
        {`${college.name} ${college.mascot}`}
      </div>
      {sortedPlayers.map(({ stats, totals }) => {
        const player = stats[0];
        return (
          <div className="mb-8" key={player?.id}>
            <PlayerCard
              playerAndStats={{
                stats,
                totals,
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
