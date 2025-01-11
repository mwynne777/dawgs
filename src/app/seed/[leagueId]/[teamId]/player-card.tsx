import playerService from "~/app/(services)/nat-stat/player-service";
import { teams } from "~/app/dashboard/teams";
import RecentGameCard from "~/app/where-are-they-now/[collegeId]/recent-game-card";
import type { Database } from "~/lib/supabase-types";

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
  const stats = await playerService.getPlayerStatsFromAPI(
    playerAndStats.nat_stat_id,
    playerAndStats.team_id,
  );

  return (
    <div className="rounded-lg border border-gray-200 p-4">
      <div className="flex justify-between">
        <div className="flex flex-col">
          <div className="text-xl font-bold">{playerAndStats.full_name}</div>
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
          <div className="stats-container">
            <h3>Current season totals</h3>
            <div className="stat">
              <p>Minutes: {stats?.stat_min?.value ?? "unknown"}</p>
            </div>
            <div className="stat">
              <p>Points: {stats?.stat_pts?.value ?? "unknown"}</p>
            </div>
          </div>
        </div>
        <div className="text-right">
          {teams[playerAndStats.team_id]?.displayName}
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
