import DailySummary from "./components/dailySummary";
import ServerComponent from "./components/serverDailySummary";
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
