import { teams } from "~/app/dashboard/teams";
import RecentGameCard from "~/app/where-are-they-now/[collegeId]/recent-game-card";
import type { Database } from "~/lib/supabase-types";

const PlayerCard = async ({
  playerAndStats,
}: {
  playerAndStats: Database["public"]["Functions"]["get_most_recent_games"]["Returns"][number];
}) => {
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
        </div>
        <div>{teams[playerAndStats.team_id]?.displayName}</div>
      </div>
      <div>
        <div className="mb-2 mt-4">
          {playerAndStats?.opposing_team_id &&
            `Last seen vs. ${teams[playerAndStats.opposing_team_id]?.displayName} on ${new Date(playerAndStats.game_date).toLocaleDateString()}`}
        </div>
        {playerAndStats.stat_line && (
          <RecentGameCard stats={playerAndStats.stat_line} />
        )}
      </div>
    </div>
  );
};

export default PlayerCard;
