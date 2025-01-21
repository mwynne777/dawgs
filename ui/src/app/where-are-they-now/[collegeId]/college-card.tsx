import { PlayerGroup } from "~/app/seed/[leagueId]/[teamId]/player-card";
import { Database } from "~/lib/supabase-types";

const toOrdinal = (n: number): string => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10]! || s[v]! || s[0]!);
};

const CollegeCard = ({
  college,
  allCollegeStatTotals,
  playersWithStats,
}: {
  college: Database["public"]["Tables"]["colleges"]["Row"];
  allCollegeStatTotals: {
    college_id: number;
    total_minutes: number;
    total_points: number;
    total_rebounds: number;
    total_assists: number;
    total_minutes_ranking: number;
    total_points_ranking: number;
    total_rebounds_ranking: number;
    total_assists_ranking: number;
  }[];
  playersWithStats: PlayerGroup[];
}) => {
  const collegeStatTotals = allCollegeStatTotals.find(
    (c) => c.college_id === college.id,
  );

  const minutesLeader = playersWithStats.reduce(
    (max, player) =>
      player.totals.minutes > (max?.totals.minutes ?? 0) ? player : max,
    playersWithStats[0],
  );

  const pointsLeader = playersWithStats.reduce(
    (max, player) =>
      player.totals.points > (max?.totals.points ?? 0) ? player : max,
    playersWithStats[0],
  );

  const reboundsLeader = playersWithStats.reduce(
    (max, player) =>
      player.totals.rebounds > (max?.totals.rebounds ?? 0) ? player : max,
    playersWithStats[0],
  );

  const assistsLeader = playersWithStats.reduce(
    (max, player) =>
      player.totals.assists > (max?.totals.assists ?? 0) ? player : max,
    playersWithStats[0],
  );

  const leaders = {
    minutes: {
      id: minutesLeader?.stats[0]?.players.id,
      full_name: minutesLeader?.stats[0]?.players.full_name,
    },
    points: {
      id: pointsLeader?.stats[0]?.players.id,
      full_name: pointsLeader?.stats[0]?.players.full_name,
    },
    rebounds: {
      id: reboundsLeader?.stats[0]?.players.id,
      full_name: reboundsLeader?.stats[0]?.players.full_name,
    },
    assists: {
      id: assistsLeader?.stats[0]?.players.id,
      full_name: assistsLeader?.stats[0]?.players.full_name,
    },
  };

  return (
    <div className="mb-8 rounded-lg border border-gray-200">
      <div
        className="flex flex-col items-center justify-center rounded-lg p-4 pt-0"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)), url(${process.env.NEXT_PUBLIC_NCAA_IMAGE_STORE_BASE_URL}${college.id}.png)`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="mt-3 text-center text-sm">
          {playersWithStats.length} players have checked into an NBA game this
          season
        </div>
        <div className="mt-4 flex flex-col items-center">
          <h3 className="text-lg font-semibold">Current Season Totals:</h3>
          <div className="mt-2 flex gap-4">
            <div className="stat text-center">
              <p className="text-sm text-gray-600">MINS</p>
              <p className="font-medium">
                {collegeStatTotals?.total_minutes.toLocaleString()}
              </p>
              <p className="text-xs">
                {collegeStatTotals?.total_minutes_ranking &&
                  toOrdinal(collegeStatTotals.total_minutes_ranking)}
              </p>
              <p className="text-xs text-gray-500">
                {leaders.minutes?.full_name}
              </p>
            </div>
            <div className="stat text-center">
              <p className="text-sm text-gray-600">PTS</p>
              <p className="font-medium">
                {collegeStatTotals?.total_points.toLocaleString()}
              </p>
              <p className="text-xs">
                {collegeStatTotals?.total_points_ranking &&
                  toOrdinal(collegeStatTotals.total_points_ranking)}
              </p>
              <p className="text-xs text-gray-500">
                {leaders.points?.full_name}
              </p>
            </div>
            <div className="stat text-center">
              <p className="text-sm text-gray-600">REB</p>
              <p className="font-medium">
                {collegeStatTotals?.total_rebounds.toLocaleString()}
              </p>
              <p className="text-xs">
                {collegeStatTotals?.total_rebounds_ranking &&
                  toOrdinal(collegeStatTotals.total_rebounds_ranking)}
              </p>
              <p className="text-xs text-gray-500">
                {leaders.rebounds?.full_name}
              </p>
            </div>
            <div className="stat text-center">
              <p className="text-sm text-gray-600">AST</p>
              <p className="font-medium">
                {collegeStatTotals?.total_assists.toLocaleString()}
              </p>
              <p className="text-xs">
                {collegeStatTotals?.total_assists_ranking &&
                  toOrdinal(collegeStatTotals.total_assists_ranking)}
              </p>
              <p className="text-xs text-gray-500">
                {leaders.assists?.full_name}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeCard;
