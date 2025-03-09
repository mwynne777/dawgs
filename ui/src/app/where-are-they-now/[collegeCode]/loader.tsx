import collegesService from "~/app/(services)/colleges-service";
import type { PlayerWithStats } from "./recent-game-card";
import WhereAreTheyNowClientComponent from "./client-component";

export default async function Loader({
  params,
}: {
  params: Promise<{ collegeCode: string }>;
}) {
  const year = 2025;
  const { collegeCode: collegeCodeBeforeCaps } = await params;
  const collegeCode = collegeCodeBeforeCaps.toUpperCase();
  const [
    college,
    playersWithStats,
    collegeStatTotals,
    collegeSalaryTotals,
    historicalCollegeStatTotals,
  ] = await Promise.all([
    collegesService.getCollegeByCode(collegeCode),
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}player-stats/college-code?college_code=${collegeCode}${year ? `&year=${year}` : ""}`,
    ).then((res) => res.json() as Promise<PlayerWithStats[]>),
    collegesService.getCollegeStatTotals(year),
    collegesService.getCollegeSalaryTotals(),
    collegesService.getHistoricalCollegeStatTotals(),
  ]);

  return (
    <WhereAreTheyNowClientComponent
      playersWithStats={playersWithStats}
      college={college}
      collegeStatTotals={collegeStatTotals}
      collegeSalaryTotals={collegeSalaryTotals}
      historicalCollegeStatTotals={historicalCollegeStatTotals}
    />
  );
}
