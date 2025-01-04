import rosterService from "~/app/services/roster-service";

export default async function Page({
  params,
}: {
  params: Promise<{ teamId: string; leagueId: string }>;
}) {
  const { teamId, leagueId } = await params;
  const _roster = await rosterService.getRosterFromAPI(
    parseInt(teamId),
    parseInt(leagueId),
  );
  return (
    <div>
      Seeding {teamId} in {leagueId}
    </div>
  );
}
