import { PlayerGroup } from "./player-card";
import { Database } from "~/lib/supabase-types";
import Link from "next/link";
import { toOrdinal } from "~/lib/utils";

const CollegeCard = ({
  college,
  allCollegeStatTotals,
  playersWithStats,
  collegeSalaryTotals,
}: {
  college: Database["public"]["Tables"]["colleges"]["Row"];
  allCollegeStatTotals: {
    college_code: string;
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
  collegeSalaryTotals: {
    college_code: string;
    total_salary: number;
  }[];
}) => {
  const collegeStatTotals = allCollegeStatTotals.find(
    (c) => c.college_code === college.code,
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

  const totalSalary = playersWithStats.reduce((sum, player) => {
    return sum + (player.salary ?? 0);
  }, 0);

  const salaryLeader = playersWithStats.reduce(
    (max, player) => ((player.salary ?? 0) > (max?.salary ?? 0) ? player : max),
    playersWithStats[0],
  );

  const leaders = {
    minutes: {
      id: minutesLeader?.id,
      full_name: minutesLeader?.full_name,
    },
    points: {
      id: pointsLeader?.id,
      full_name: pointsLeader?.full_name,
    },
    rebounds: {
      id: reboundsLeader?.id,
      full_name: reboundsLeader?.full_name,
    },
    assists: {
      id: assistsLeader?.id,
      full_name: assistsLeader?.full_name,
    },
    salary: {
      id: salaryLeader?.id,
      full_name: salaryLeader?.full_name,
    },
  };

  const nonNullSalaryTotals = collegeSalaryTotals.filter(
    (c) => c.total_salary !== null,
  );

  const salaryRanking =
    nonNullSalaryTotals.findIndex((c) => c.college_code === college.code) + 1;

  return (
    <div className="mb-8 rounded-lg border border-gray-200">
      <div className="flex flex-col items-center justify-center rounded-lg p-4 pt-0">
        <div className="mt-3 text-center text-sm">
          {playersWithStats.length} player
          {playersWithStats.length === 1 ? " has" : "s have"} checked into an
          NBA game this season
        </div>
        <div className="mt-4 flex flex-col items-center">
          <h3 className="text-lg font-semibold">2024-2025 Season:</h3>
          <div className="mt-2">
            <table className="w-full [&_td]:px-2 [&_td]:py-1 [&_td]:text-center">
              <tbody>
                <tr>
                  <td>Stat</td>
                  <td>Total</td>
                  <td>College Rank</td>
                  <td className="max-w-[80px] sm:max-w-none">Leader</td>
                </tr>
                <tr>
                  <td>MINS</td>
                  <td>{collegeStatTotals?.total_minutes.toLocaleString()}</td>
                  <td>
                    <Link
                      href={`/stat-rankings?stat=total_minutes&selectedCollegeCode=${college.code}`}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {collegeStatTotals?.total_minutes_ranking &&
                        toOrdinal(collegeStatTotals.total_minutes_ranking)}
                    </Link>
                  </td>
                  <td className="max-w-[80px] break-words text-xs leading-tight sm:max-w-none">
                    {leaders.minutes?.full_name}
                  </td>
                </tr>
                <tr>
                  <td>PTS</td>
                  <td>{collegeStatTotals?.total_points.toLocaleString()}</td>
                  <td>
                    <Link
                      href={`/stat-rankings?stat=total_points&selectedCollegeCode=${college.code}`}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {collegeStatTotals?.total_points_ranking &&
                        toOrdinal(collegeStatTotals.total_points_ranking)}
                    </Link>
                  </td>
                  <td className="max-w-[80px] break-words text-xs leading-tight">
                    {leaders.points?.full_name}
                  </td>
                </tr>
                <tr>
                  <td>REB</td>
                  <td>{collegeStatTotals?.total_rebounds.toLocaleString()}</td>
                  <td>
                    <Link
                      href={`/stat-rankings?stat=total_rebounds&selectedCollegeCode=${college.code}`}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {collegeStatTotals?.total_rebounds_ranking &&
                        toOrdinal(collegeStatTotals.total_rebounds_ranking)}
                    </Link>
                  </td>
                  <td className="max-w-[80px] break-words text-xs leading-tight">
                    {leaders.rebounds?.full_name}
                  </td>
                </tr>
                <tr>
                  <td>AST</td>
                  <td>{collegeStatTotals?.total_assists.toLocaleString()}</td>
                  <td>
                    <Link
                      href={`/stat-rankings?stat=total_assists&selectedCollegeCode=${college.code}`}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {collegeStatTotals?.total_assists_ranking &&
                        toOrdinal(collegeStatTotals.total_assists_ranking)}
                    </Link>
                  </td>
                  <td className="max-w-[80px] break-words text-xs leading-tight">
                    {leaders.assists?.full_name}
                  </td>
                </tr>
                <tr>
                  <td>SALARY</td>
                  <td>${totalSalary.toLocaleString()}</td>
                  <td>
                    {salaryRanking ? (
                      <Link
                        href={`/stat-rankings?stat=total_salary&selectedCollegeCode=${college.code}`}
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                      >
                        {toOrdinal(salaryRanking)}
                      </Link>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="max-w-[80px] break-words text-xs leading-tight">
                    {leaders.salary?.full_name}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeCard;
