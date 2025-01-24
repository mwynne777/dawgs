"use client";

import { useSearchParams } from "next/navigation";
import collegesService from "../(services)/colleges-service";
import { useState } from "react";
import StatTabs from "./stat-tabs";
import Link from "next/link";

type StatRankingsClientComponentProps = {
  collegeStatTotals: Awaited<
    ReturnType<typeof collegesService.getCollegeStatTotals>
  >;
  colleges: Awaited<ReturnType<typeof collegesService.getColleges>>;
};

const StatRankingsClientComponent = ({
  collegeStatTotals,
  colleges,
}: StatRankingsClientComponentProps) => {
  const searchParams = useSearchParams();
  const [stat, setStat] = useState(searchParams.get("stat") ?? "total_minutes");
  const selectedCollegeId = searchParams.get("selectedCollegeId");

  // Sort colleges by the selected stat
  const sortedColleges = collegeStatTotals
    .map((college) => {
      const collegeData = colleges.find((c) => c.id === college.college_id);
      return {
        ...college,
        display_name: `${collegeData?.name} ${collegeData?.mascot}`,
      };
    })
    .sort(
      (a, b) =>
        (b[stat as keyof typeof b] as number) -
        (a[stat as keyof typeof a] as number),
    );
  return (
    <div className="container mx-auto py-6">
      <StatTabs stat={stat} setStat={setStat} />
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
              key={college.college_id}
              className={`border-t ${
                college.college_id === parseInt(selectedCollegeId ?? "0")
                  ? "bg-blue-50"
                  : ""
              }`}
            >
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">
                <Link
                  href={`/where-are-they-now/${college.college_id}`}
                  className="text-blue-700 hover:text-blue-900 hover:underline"
                >
                  {college.display_name}
                </Link>
              </td>
              <td className="px-4 py-2 text-right">
                {college[stat as keyof typeof college]?.toLocaleString() || 0}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatRankingsClientComponent;
