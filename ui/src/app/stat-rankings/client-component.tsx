"use client";

import { useSearchParams } from "next/navigation";
import type collegesService from "../(services)/colleges-service";
import { useState } from "react";
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

  const statNameWithLeague =
    selectedLeague === "all" ? stat : `${selectedLeague}_${stat}`;

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

  // Sort colleges by the selected stat
  const sortedColleges =
    statNameWithLeague === "total_salary"
      ? sortedCollegesBySalary
      : collegeStatTotals
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
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Rank</th>
            <th className="px-4 py-2 text-left">School</th>
            <th className="px-4 py-2 text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          {sortedColleges.map((college, index) => (
            <tr
              key={college.college_code}
              className={`border-t ${
                college.college_code === selectedCollegeCode ? "bg-blue-50" : ""
              }`}
            >
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">
                <Link
                  href={`/where-are-they-now/${college.college_code}?league=${selectedLeague}`}
                  className="text-blue-700 hover:text-blue-900 hover:underline"
                >
                  {college.display_name}
                </Link>
              </td>
              <td className="px-4 py-2 text-right">
                {statNameWithLeague.includes("total_salary")
                  ? `$${college[statNameWithLeague as keyof typeof college]?.toLocaleString() ?? 0}`
                  : (college[
                      statNameWithLeague as keyof typeof college
                    ]?.toLocaleString() ?? 0)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatRankingsClientComponent;
