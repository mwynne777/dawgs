import { teams } from "~/app/dashboard/teams";
import RecentGameCard from "~/app/where-are-they-now/[collegeId]/recent-game-card";
import type { Database } from "~/lib/supabase-types";
import type { NatStatPlayerStats } from "../../../../../../server/src/services/player-service";
const getLastSeenDate = (gameDate: string) => {
  const easternTimeString = new Date(gameDate).toLocaleString("en-US", {
    timeZone: "America/New_York",
  });
  const [month, day, year] = easternTimeString.split(",")[0]?.split("/") ?? [];
  return `${month}/${day}/${year?.substring(2)}`;
};

const PlayerCard = async ({
  playerAndStats,
}: {
  playerAndStats: Database["public"]["Functions"]["get_most_recent_games"]["Returns"][number];
}) => {
  const statsResponse = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}players/stats?player_id=${playerAndStats.nat_stat_id}&league_id=${playerAndStats.team_id}`,
  );
  const stats = (await statsResponse.json()) as NatStatPlayerStats;

  return (
    <div className="rounded-lg border border-gray-200 p-4">
      <div className="flex justify-between">
        <div className="text-xl font-bold">{playerAndStats.full_name}</div>
        <div className="text-right">
          {teams[playerAndStats.team_id]?.displayName}
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <div className="text-base">
            Current Salary:{" "}
            {playerAndStats.salary && playerAndStats.salary > 0
              ? playerAndStats.salary.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })
              : "unknown"}
          </div>
          {stats && (
            <div className="stats-container">
              <h3 className="my-1 text-lg font-semibold">
                Current Season Stats
              </h3>
              <div className="flex gap-4">
                <div className="stat text-center">
                  <p className="text-sm text-gray-600">MINS</p>
                  <p className="font-medium">
                    {stats?.stat_mpg?.value ?? "unknown"}
                  </p>
                </div>
                <div className="stat text-center">
                  <p className="text-sm text-gray-600">PTS</p>
                  <p className="font-medium">
                    {stats?.stat_ppg?.value ?? "unknown"}
                  </p>
                </div>
                <div className="stat text-center">
                  <p className="text-sm text-gray-600">REB</p>
                  <p className="font-medium">
                    {stats?.stat_rpg?.value ?? "unknown"}
                  </p>
                </div>
                <div className="stat text-center">
                  <p className="text-sm text-gray-600">AST</p>
                  <p className="font-medium">
                    {stats?.stat_apg?.value ?? "unknown"}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
        <div className="mb-2 mt-4">
          {playerAndStats?.opposing_team_id &&
            `Last seen vs. ${teams[playerAndStats.opposing_team_id]?.displayName} on ${getLastSeenDate(playerAndStats.game_date)}`}
        </div>
        {playerAndStats.stat_line && (
          <RecentGameCard stats={playerAndStats.stat_line} />
        )}
      </div>
    </div>
  );
};

export default PlayerCard;
