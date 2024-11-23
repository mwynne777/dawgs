import DailySummary from "./components/dailySummary";
import { teams, getTeamSchedule } from "./teams";

export default async function DashboardPage() {
  const teamSchedules = await Promise.all(
    Object.keys(teams).map((teamAbbrev) => getTeamSchedule(teamAbbrev)),
  );

  return <DailySummary teamSchedules={teamSchedules} />;
}
