import playerService from "~/app/(services)/nat-stat/player-service";

export default async function Page({
  params,
}: {
  params: Promise<{ playerId: string }>;
}) {
  const { playerId } = await params;
  const playerIdNumber = parseInt(playerId);

  const result = await playerService.mapNatStatPlayerToDB(playerIdNumber);

  if (result === undefined) {
    return <div>Player {playerId} not found in DB</div>;
  }
  return <div>Set nat_stat_id for player {playerId}</div>;
}
