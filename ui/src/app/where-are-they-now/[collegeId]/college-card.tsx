import { Database } from "~/lib/supabase-types";

const toOrdinal = (n: number): string => {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10]! || s[v]! || s[0]!);
};

const CollegeCard = ({
  college,
  allCollegeStatTotals,
  totalPlayersWithStats,
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
  totalPlayersWithStats: number;
}) => {
  const collegeStatTotals = allCollegeStatTotals.find(
    (c) => c.college_id === college.id,
  );

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
          {totalPlayersWithStats} players have checked into an NBA game this
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeCard;
