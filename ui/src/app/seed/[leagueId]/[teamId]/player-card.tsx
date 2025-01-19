import { teams } from "~/app/dashboard/teams";
import RecentGameCard, {
  PlayerWithStats,
} from "~/app/where-are-they-now/[collegeId]/recent-game-card";

export type PlayerGroup = {
  stats: PlayerWithStats[];
  totals: {
    minutes: number;
    points: number;
    field_goals_made: number;
    field_goals_attempted: number;
    three_points_made: number;
    three_points_attempted: number;
    free_throws_made: number;
    free_throws_attempted: number;
    offensive_rebounds: number;
    rebounds: number;
    assists: number;
    steals: number;
    blocks: number;
    turnovers: number;
    personal_fouls: number;
    games_played: number;
    games_started: number;
  };
};

const PlayerCard = async ({
  playerAndStats,
}: {
  playerAndStats: PlayerGroup;
}) => {
  const player = playerAndStats.stats[0];
  const teamAbbreviation = teams[player?.team_id ?? 0]?.abbreviation;
  return (
    <div
      className="rounded-lg border border-gray-200 p-4"
      style={{
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)), url(${process.env.NEXT_PUBLIC_NBA_IMAGE_STORE_BASE_URL}${teamAbbreviation}.png)`,
        // backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="flex justify-between pb-1.5">
        <div className="mr-4 text-xl font-bold">
          {player?.players?.full_name}
        </div>
        <div className="text-right">
          {teams[player?.team_id ?? 0]?.displayName}
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <div className="text-base">
            Current Salary:{" "}
            {player?.players?.salary && player?.players?.salary > 0
              ? player?.players?.salary.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })
              : "unknown"}
          </div>
          <div className="stats-container">
            <h3 className="my-1 text-lg font-semibold">Current Season Stats</h3>
            <div className="flex gap-4">
              <div className="stat text-center">
                <p className="text-sm text-gray-600">MINS</p>
                <p className="font-medium">
                  {(
                    playerAndStats.totals?.minutes /
                    playerAndStats.totals?.games_played
                  ).toFixed(1)}
                </p>
              </div>
              <div className="stat text-center">
                <p className="text-sm text-gray-600">PTS</p>
                <p className="font-medium">
                  {(
                    playerAndStats.totals?.points /
                    playerAndStats.totals?.games_played
                  ).toFixed(1)}
                </p>
              </div>
              <div className="stat text-center">
                <p className="text-sm text-gray-600">REB</p>
                <p className="font-medium">
                  {(
                    playerAndStats.totals?.rebounds /
                    playerAndStats.totals?.games_played
                  ).toFixed(1)}
                </p>
              </div>
              <div className="stat text-center">
                <p className="text-sm text-gray-600">AST</p>
                <p className="font-medium">
                  {(
                    playerAndStats.totals?.assists /
                    playerAndStats.totals?.games_played
                  ).toFixed(1)}
                </p>
              </div>
            </div>
          </div>
          <p className="mt-0.5 text-gray-600">
            * {playerAndStats.totals?.games_played ?? 0} games played,{" "}
            {playerAndStats.totals?.games_started ?? 0} starts
          </p>
        </div>
      </div>
      <div>
        <div className="mb-2 mt-2">
          <h3 className="my-1 text-lg font-semibold">Recent Games</h3>
        </div>
        {playerAndStats.stats && (
          <RecentGameCard playerPerfs={playerAndStats.stats} />
        )}
      </div>
    </div>
  );
};

export default PlayerCard;
