import DailySummary from "./components/dailySummary";
import { teams, getTeamSchedule } from "./teams";

export default async function DashboardPage() {
  return <DailySummary />;
}
