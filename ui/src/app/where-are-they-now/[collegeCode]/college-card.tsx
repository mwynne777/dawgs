import type { PlayerGroup } from "./player-card";
import type { Database } from "~/lib/supabase-types";
import Link from "next/link";
import { toOrdinal } from "~/lib/utils";
import type collegesService from "~/app/(services)/colleges-service";

type StatName = keyof Omit<
  Awaited<ReturnType<typeof collegesService.getCollegeStatTotals>>[number],
  "college_code"
>;

const getStatName = (stat: string, league: "nba" | "gl" | "all"): StatName => {
  if (league === "all") return stat as StatName;
  return `${league}_${stat}` as StatName;
};

const CollegeCard = ({
  college,
  allCollegeStatTotals,
  playersWithStats,
  collegeSalaryTotals,
  selectedLeague,
}: {
  college: Database["public"]["Tables"]["colleges"]["Row"];
  allCollegeStatTotals: Awaited<
    ReturnType<typeof collegesService.getCollegeStatTotals>
  >;
  playersWithStats: PlayerGroup[];
  collegeSalaryTotals: Awaited<
    ReturnType<typeof collegesService.getCollegeSalaryTotals>
  >;
  selectedLeague: "nba" | "gl" | "all";
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
          {playersWithStats.length === 1 ? " has" : "s have"} checked into{" "}
          {selectedLeague === "nba"
            ? "an NBA game"
            : selectedLeague === "gl"
              ? "a G League game"
              : "an NBA or G League game"}{" "}
          this season
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
                  <td>
                    {collegeStatTotals?.[
                      getStatName("total_minutes", selectedLeague)
                    ].toLocaleString()}
                  </td>
                  <td>
                    <Link
                      href={`/stat-rankings?stat=total_minutes&selectedCollegeCode=${college.code}&league=${selectedLeague}`}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {collegeStatTotals?.[
                        getStatName("total_minutes_rank", selectedLeague)
                      ] &&
                        toOrdinal(
                          collegeStatTotals[
                            getStatName("total_minutes_rank", selectedLeague)
                          ],
                        )}
                    </Link>
                  </td>
                  <td className="max-w-[80px] break-words text-xs leading-tight sm:max-w-none">
                    {leaders.minutes?.full_name}
                  </td>
                </tr>
                <tr>
                  <td>PTS</td>
                  <td>
                    {collegeStatTotals?.[
                      getStatName("total_points", selectedLeague)
                    ].toLocaleString()}
                  </td>
                  <td>
                    <Link
                      href={`/stat-rankings?stat=total_points&selectedCollegeCode=${college.code}&league=${selectedLeague}`}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {collegeStatTotals?.[
                        getStatName("total_points_rank", selectedLeague)
                      ] &&
                        toOrdinal(
                          collegeStatTotals[
                            getStatName("total_points_rank", selectedLeague)
                          ],
                        )}
                    </Link>
                  </td>
                  <td className="max-w-[80px] break-words text-xs leading-tight">
                    {leaders.points?.full_name}
                  </td>
                </tr>
                <tr>
                  <td>REB</td>
                  <td>
                    {collegeStatTotals?.[
                      getStatName("total_rebounds", selectedLeague)
                    ].toLocaleString()}
                  </td>
                  <td>
                    <Link
                      href={`/stat-rankings?stat=total_rebounds&selectedCollegeCode=${college.code}&league=${selectedLeague}`}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {collegeStatTotals?.[
                        getStatName("total_rebounds_rank", selectedLeague)
                      ] &&
                        toOrdinal(
                          collegeStatTotals[
                            getStatName("total_rebounds_rank", selectedLeague)
                          ],
                        )}
                    </Link>
                  </td>
                  <td className="max-w-[80px] break-words text-xs leading-tight">
                    {leaders.rebounds?.full_name}
                  </td>
                </tr>
                <tr>
                  <td>AST</td>
                  <td>
                    {collegeStatTotals?.[
                      getStatName("total_assists", selectedLeague)
                    ].toLocaleString()}
                  </td>
                  <td>
                    <Link
                      href={`/stat-rankings?stat=total_assists&selectedCollegeCode=${college.code}&league=${selectedLeague}`}
                      className="text-blue-600 hover:text-blue-800 hover:underline"
                    >
                      {collegeStatTotals?.[
                        getStatName("total_assists_rank", selectedLeague)
                      ] &&
                        toOrdinal(
                          collegeStatTotals[
                            getStatName("total_assists_rank", selectedLeague)
                          ],
                        )}
                    </Link>
                  </td>
                  <td className="max-w-[80px] break-words text-xs leading-tight">
                    {leaders.assists?.full_name}
                  </td>
                </tr>
                {selectedLeague !== "gl" && (
                  <tr>
                    <td>SALARY</td>
                    <td>${totalSalary.toLocaleString()}</td>
                    <td>
                      {salaryRanking ? (
                        <Link
                          href={`/stat-rankings?stat=total_salary&selectedCollegeCode=${college.code}&league=${selectedLeague}`}
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
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeCard;
