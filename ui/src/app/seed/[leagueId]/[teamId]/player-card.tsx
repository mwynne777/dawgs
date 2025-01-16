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

export type NatStatPlayerStats = {
  stat_min: {
    value: string;
  };
  stat_pts: {
    value: string;
  };
  stat_mpg: {
    value: string;
  };
  stat_ppg: {
    value: string;
  };
  stat_rpg: {
    value: string;
  };
  stat_apg: {
    value: string;
  };
  stat_g: {
    value: string;
  };
  stat_gs: {
    value: string;
  };
};

export type NatStatPlayerPerfs = {
  id: string;
  "game-code": string;
  gameday: string;
  opponent: string;
  "opponent-team-code": string;
  winorloss: string;
  result: string;
  statline: string;
};

type PlayerAndStatsWithNatstat =
  Database["public"]["Tables"]["players"]["Row"] & {
    natStatStats: NatStatPlayerStats | null;
    natStatPerfs: NatStatPlayerPerfs[] | null;
  };

const PlayerCard = async ({
  playerAndStats,
}: {
  playerAndStats: PlayerAndStatsWithNatstat;
}) => {
  return (
    <div className="rounded-lg border border-gray-200 p-4">
      <div className="flex justify-between pb-1.5">
        <div className="mr-4 text-xl font-bold">{playerAndStats.full_name}</div>
        <div className="text-right">
          {teams[playerAndStats.team_id ?? 0]?.displayName}
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
          {playerAndStats.natStatStats && (
            <div className="stats-container">
              <h3 className="my-1 text-lg font-semibold">
                Current Season Stats
              </h3>
              <div className="flex gap-4">
                <div className="stat text-center">
                  <p className="text-sm text-gray-600">MINS</p>
                  <p className="font-medium">
                    {playerAndStats.natStatStats?.stat_mpg?.value ?? "0.0"}
                  </p>
                </div>
                <div className="stat text-center">
                  <p className="text-sm text-gray-600">PTS</p>
                  <p className="font-medium">
                    {playerAndStats.natStatStats?.stat_ppg?.value ?? "0.0"}
                  </p>
                </div>
                <div className="stat text-center">
                  <p className="text-sm text-gray-600">REB</p>
                  <p className="font-medium">
                    {playerAndStats.natStatStats?.stat_rpg?.value ?? "0.0"}
                  </p>
                </div>
                <div className="stat text-center">
                  <p className="text-sm text-gray-600">AST</p>
                  <p className="font-medium">
                    {playerAndStats.natStatStats?.stat_apg?.value ?? "0.0"}
                  </p>
                </div>
              </div>
            </div>
          )}
          <p className="mt-0.5 text-gray-600">
            * {playerAndStats.natStatStats?.stat_g?.value ?? 0} games played,{" "}
            {playerAndStats.natStatStats?.stat_gs?.value ?? 0} starts
          </p>
        </div>
      </div>
      <div>
        <div className="mb-2 mt-2">
          <h3 className="my-1 text-lg font-semibold">Recent Games</h3>
        </div>
        {playerAndStats.natStatPerfs && (
          <RecentGameCard playerPerfs={playerAndStats.natStatPerfs} />
        )}
      </div>
    </div>
  );
};

export default PlayerCard;
