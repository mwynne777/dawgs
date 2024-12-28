import DailySummary from "./components/dailyBoxscore";
import ServerComponent from "./components/serverDailySummaryWrapper";
export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ date: string }>;
}) {
  const { date } = await searchParams;
  return (
    <DailySummary date={date}>
      <ServerComponent date={date} />
    </DailySummary>
  );
}
