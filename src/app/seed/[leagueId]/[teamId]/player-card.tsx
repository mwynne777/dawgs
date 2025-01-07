import { teams } from "~/app/dashboard/teams";
import { Database } from "~/lib/supabase-types";

const PlayerCard = async ({
  playerAndStats,
}: {
  playerAndStats: Database["public"]["Functions"]["get_most_recent_games"]["Returns"][number];
}) => {
  return (
    <>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <div className="text-xl font-bold">{playerAndStats.full_name}</div>
          <div className="self-end text-base">
            {teams[playerAndStats.team_id]?.displayName}
          </div>
        </div>
        <div>
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
      <div>
        <div>Recent Games</div>
        <div>
          vs.{" "}
          {playerAndStats?.opposing_team_id &&
            teams[playerAndStats.opposing_team_id]?.displayName}
        </div>
        <div>{playerAndStats?.stat_line?.join(", ")}</div>
      </div>
    </>
  );
};

export default PlayerCard;
