import { teams } from "~/app/(common)/teams";
import RecentGameCard, { PlayerWithStats } from "./recent-game-card";
import { toOrdinal } from "~/lib/utils";

export type PlayerGroup = PlayerWithStats & {
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

const PlayerCard = ({ playerAndStats }: { playerAndStats: PlayerGroup }) => {
  const player = playerAndStats;
  const draftPick = player.draft_picks[0];

  return (
    <div className="rounded-lg border p-4">
      <div
        className="-mx-4 -mt-4 mb-4 flex justify-between rounded-t-lg px-4 pb-1.5 pt-1.5"
        style={{
          backgroundColor: teams[player?.player_stats[0]?.team_id ?? 0]?.color,
          color: "white",
        }}
      >
        <div className="mr-4 flex items-center text-xl font-bold">
          <pre className="font-bold">
            {player?.full_name?.split(" ")[0] +
              "\n" +
              player?.full_name?.split(" ")[1]}
          </pre>
        </div>
        <div className="flex items-center text-right">
          <pre className="font-bold">
            {teams[player?.player_stats[0]?.team_id ?? 0]?.displayName ===
            "Portland Trail Blazers"
              ? "Portland\nTrail Blazers"
              : teams[player?.player_stats[0]?.team_id ?? 0]?.displayName
                  .split(/(?= [^ ]*$)/)
                  .join("\n")}
          </pre>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="flex flex-col">
          <div className="text-base">
            {draftPick && (
              <>
                Draft Info:{" "}
                <span className="font-semibold">{draftPick.year}</span>,{" "}
                <span className="font-semibold">
                  {toOrdinal(draftPick.pick_number)}
                </span>{" "}
                overall pick,{" "}
                <span className="font-semibold">
                  {Object.values(teams)
                    .find(
                      (team) =>
                        team.abbreviation === draftPick.team_abbreviation,
                    )
                    ?.abbreviation.toUpperCase()}
                </span>
              </>
            )}
          </div>
          <div className="mt-1 text-base">
            Current Salary:{" "}
            {player?.salary && player?.salary > 0
              ? player?.salary.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0,
                })
              : "unknown"}
          </div>
        </div>
      </div>
      <div className="stats-container my-4 max-w-xs">
        <div className="rounded-lg border border-gray-200 bg-gray-50">
          <div className="border-b border-gray-200 px-3 py-1">
            <h3 className="text-lg font-semibold">Current Season Stats</h3>
          </div>
          <div className="p-2">
            <div className="grid grid-cols-4 gap-2">
              <div className="stat text-center">
                <p className="text-sm text-gray-600">MINS</p>
                <p className="text-lg font-medium">
                  {(
                    playerAndStats.totals?.minutes /
                    playerAndStats.totals?.games_played
                  ).toFixed(1)}
                </p>
              </div>
              <div className="stat text-center">
                <p className="text-sm text-gray-600">PTS</p>
                <p className="text-lg font-medium">
                  {(
                    playerAndStats.totals?.points /
                    playerAndStats.totals?.games_played
                  ).toFixed(1)}
                </p>
              </div>
              <div className="stat text-center">
                <p className="text-sm text-gray-600">REB</p>
                <p className="text-lg font-medium">
                  {(
                    playerAndStats.totals?.rebounds /
                    playerAndStats.totals?.games_played
                  ).toFixed(1)}
                </p>
              </div>
              <div className="stat text-center">
                <p className="text-sm text-gray-600">AST</p>
                <p className="text-lg font-medium">
                  {(
                    playerAndStats.totals?.assists /
                    playerAndStats.totals?.games_played
                  ).toFixed(1)}
                </p>
              </div>
            </div>
            <div className="mt-1.5 border-t border-gray-200 pt-1.5 text-center text-sm text-gray-600">
              {playerAndStats.totals?.games_played ?? 0} games played (
              {playerAndStats.totals?.games_started ?? 0} starts)
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="mb-2 mt-2">
          <h3 className="my-1 text-lg font-semibold">Recent Games</h3>
        </div>
        {playerAndStats.player_stats && (
          <RecentGameCard playerPerfs={playerAndStats.player_stats} />
        )}
      </div>
    </div>
  );
};

export default PlayerCard;
