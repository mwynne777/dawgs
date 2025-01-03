import DailyBoxscore from "./components/dailyBoxscore";
import DailySummaryLoader from "./components/dailySummaryLoader-server";
import SuspensefulServerComponent from "./components/suspensefulComponent-server";

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ date: string }>;
}) {
  let { date } = await searchParams;
  if (!date) {
    const today = new Date();
    date = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
  }

  return (
    <DailyBoxscore date={date}>
      <SuspensefulServerComponent date={date}>
        <DailySummaryLoader date={date} />
      </SuspensefulServerComponent>
    </DailyBoxscore>
  );
}
