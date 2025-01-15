import collegesService from "~/app/(services)/colleges-service";
import playerStatsService from "~/app/(services)/player-stats-service";
import PlayerCard, {
  NatStatPlayerPerfs,
  NatStatPlayerStats,
} from "~/app/seed/[leagueId]/[teamId]/player-card";

export default async function Page({
  params,
}: {
  params: Promise<{ collegeId: string }>;
}) {
  const { collegeId: collegeIdString } = await params;
  const collegeId = parseInt(collegeIdString);

  const [college, players] = await Promise.all([
    collegesService.getCollegeById(collegeId),
    playerStatsService.getPlayersAndMostRecentStatsByCollegeId(collegeId),
  ]);

  const statsResults = await Promise.allSettled(
    players.map(async (player) => {
      const statsResponse = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}players/stats?player_id=${player.nat_stat_id}&league_id=${player.team_id}`,
      );
      const { stats, playerPerfs } = (await statsResponse.json()) as {
        stats: NatStatPlayerStats;
        playerPerfs: NatStatPlayerPerfs[];
      };
      return {
        ...player,
        natStatStats: stats,
        natStatPerfs: playerPerfs,
      };
    }),
  );

  const playersWithStats = statsResults.map((result, index) => {
    if (result.status === "fulfilled") {
      return result.value;
    }
    return {
      ...players[index]!,
      natStatStats: null,
      natStatPerfs: null,
    };
  });

  if (!players) {
    return <div>No players found</div>;
  }

  return (
    <div className="mx-auto max-w-3xl px-8 pt-4">
      <div className="mb-8 text-2xl font-bold">
        {`${college.name} ${college.mascot}`}
        {/* Total salary:{" "}
        {players
          .reduce((acc, p) => acc + (p.salary ?? 0), 0)
          .toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })} */}
      </div>
      {playersWithStats.map((p) => {
        return (
          <div className="mb-8" key={p.id}>
            <PlayerCard playerAndStats={p} />
          </div>
        );
      })}
    </div>
  );
}
