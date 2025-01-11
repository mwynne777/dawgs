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
    const easternTimeString = new Date().toLocaleString("en-US", {
      timeZone: "America/New_York",
    });

    const [month, day, year] =
      easternTimeString.split(",")[0]?.split("/") ?? [];
    date = `${year}-${month?.padStart(2, "0")}-${day?.padStart(2, "0")}`;
  }

  return (
    <DailyBoxscore date={date}>
      <SuspensefulServerComponent date={date}>
        <DailySummaryLoader date={date} />
      </SuspensefulServerComponent>
    </DailyBoxscore>
  );
}
