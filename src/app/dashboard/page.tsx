import DailyBoxscore from "./components/dailyBoxscore";
import DailySummaryLoader from "./components/dailySummaryLoader-server";
import SuspensefulServerComponent from "./components/suspensefulComponent-server";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ date: string }>;
}) {
  const { date } = await searchParams;
  return (
    <DailyBoxscore date={date}>
      <SuspensefulServerComponent date={date}>
        <DailySummaryLoader date={date} />
      </SuspensefulServerComponent>
    </DailyBoxscore>
  );
}
