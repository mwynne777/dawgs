import collegesService from "~/app/(services)/colleges-service";
import type { PlayerWithStats } from "./recent-game-card";
import WhereAreTheyNowClientComponent from "./client-component";
import { Database } from "~/lib/supabase-types";

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
    playerTotals,
  ] = await Promise.all([
    collegesService.getCollegeByCode(collegeCode),
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}player-stats/college-code?college_code=${collegeCode}${year ? `&year=${year}` : ""}`,
    ).then((res) => res.json() as Promise<PlayerWithStats[]>),
    collegesService.getCollegeStatTotals(year),
    collegesService.getCollegeSalaryTotals(),
    fetch(
      `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}player-stats/player-totals?college_code=${collegeCode}`,
    ).then(
      (res) =>
        res.json() as Promise<
          Database["public"]["Views"]["player_season_totals_with_details"]["Row"][]
        >,
    ),
  ]);

  return (
    <WhereAreTheyNowClientComponent
      playersWithStats={playersWithStats}
      college={college}
      collegeStatTotals={collegeStatTotals}
      collegeSalaryTotals={collegeSalaryTotals}
      playerTotals={playerTotals}
    />
  );
}
