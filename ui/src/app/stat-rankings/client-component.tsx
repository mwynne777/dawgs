"use client";

import { useSearchParams } from "next/navigation";
import type collegesService from "../(services)/colleges-service";
import { useMemo, useState } from "react";
import StatTabs from "./stat-tabs";
import Link from "next/link";
import LeagueSelect from "../where-are-they-now/[collegeCode]/league-select";

type StatRankingsClientComponentProps = {
  collegeStatTotals: Awaited<
    ReturnType<typeof collegesService.getCollegeStatTotals>
  >;
  colleges: Awaited<ReturnType<typeof collegesService.getColleges>>;
  collegeSalaryTotals: Awaited<
    ReturnType<typeof collegesService.getCollegeSalaryTotals>
  >;
};

const getDifference = (previousYearRank: number, currentYearRank: number) => {
  const difference = previousYearRank - currentYearRank;
  if (difference === 0 || isNaN(difference))
    return <span className="block w-full text-center">-</span>;
  return (
    <span className={difference > 0 ? "text-green-600" : "text-red-600"}>
      {difference > 0 ? "↑" : "↓"} {Math.abs(difference)}
    </span>
  );
};

const StatRankingsClientComponent = ({
  collegeStatTotals,
  colleges,
  collegeSalaryTotals,
}: StatRankingsClientComponentProps) => {
  const searchParams = useSearchParams();
  const [stat, setStat] = useState(searchParams.get("stat") ?? "total_minutes");
  const [selectedLeague, setSelectedLeague] = useState<"nba" | "gl" | "all">(
    (searchParams.get("league") as "nba" | "gl" | "all") ?? "nba",
  );
  const selectedCollegeCode = searchParams.get("selectedCollegeCode");

  const statNameWithLeague = useMemo(() => {
    if (selectedLeague === "gl" && stat === "total_salary") {
      // Don't have salary data for GL, so use jump to minutes instead
      setStat("total_minutes");
      return "total_minutes";
    }
    if (stat === "total_salary") return "total_salary";
    return selectedLeague === "all" ? stat : `${selectedLeague}_${stat}`;
  }, [selectedLeague, stat]);

  const sortedCollegesBySalary = collegeSalaryTotals
    .filter(
      (college) => college.total_salary !== null && college.total_salary > 0,
    )
    .map((college) => {
      const collegeData = colleges.find((c) => c.code === college.college_code);
      return {
        ...college,
        display_name: collegeData?.name,
      };
    });

  const previousYearCollegeStatTotals = collegeStatTotals.filter(
    (r) => r.season === 2024,
  );

  // Sort colleges by the selected stat
  const sortedColleges =
    statNameWithLeague === "total_salary"
      ? sortedCollegesBySalary
      : collegeStatTotals
          .filter((r) => r.season === 2025)
          .map((college) => {
            const collegeData = colleges.find(
              (c) => c.code === college.college_code,
            );
            return {
              ...college,
              display_name: collegeData?.name,
            };
          })
          .sort(
            (a, b) =>
              (b[statNameWithLeague as keyof typeof b] as number) -
              (a[statNameWithLeague as keyof typeof a] as number),
          );

  const showTrend =
    selectedLeague !== "gl" && !statNameWithLeague.includes("total_salary");

  return (
    <div className="container mx-auto py-6">
      <LeagueSelect
        selectedLeague={selectedLeague}
        setSelectedLeague={(league) => {
          setSelectedLeague(league);
          const params = new URLSearchParams(searchParams);
          params.set("league", league);
          window.history.replaceState(
            null,
            "",
            `/stat-rankings?${params.toString()}`,
          );
        }}
      />
      <StatTabs stat={stat} setStat={setStat} selectedLeague={selectedLeague} />
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-2 py-2 text-left sm:px-4">#</th>
              <th className="px-2 py-2 text-left sm:px-4">School</th>
              <th className="px-2 py-2 text-right sm:px-4">Total</th>
              {showTrend && (
                <th className="px-2 py-2 text-center sm:px-4">Trend</th>
              )}
            </tr>
          </thead>
          <tbody>
            {sortedColleges.map((college, index) => (
              <tr
                key={college.college_code}
                className={`border-t ${
                  college.college_code === selectedCollegeCode
                    ? "bg-blue-50"
                    : ""
                }`}
              >
                <td className="px-2 py-2 text-left sm:px-4">{index + 1}</td>
                <td className="px-2 py-2 text-left sm:px-4">
                  <Link
                    href={`/where-are-they-now/${college.college_code}?league=${selectedLeague}`}
                    className="text-blue-700 hover:text-blue-900 hover:underline"
                  >
                    {college.display_name}
                  </Link>
                </td>
                <td className="px-2 py-2 text-right sm:px-4">
                  {statNameWithLeague.includes("total_salary")
                    ? `$${college[statNameWithLeague as keyof typeof college]?.toLocaleString() ?? 0}`
                    : (college[
                        statNameWithLeague as keyof typeof college
                      ]?.toLocaleString() ?? 0)}
                </td>
                {showTrend && (
                  <td className="px-2 py-2 text-center sm:px-4">
                    {getDifference(
                      previousYearCollegeStatTotals.find(
                        (r) => r.college_code === college.college_code,
                      )?.[
                        `${statNameWithLeague}_rank` as keyof (typeof previousYearCollegeStatTotals)[number]
                      ] as number,
                      index + 1,
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StatRankingsClientComponent;
