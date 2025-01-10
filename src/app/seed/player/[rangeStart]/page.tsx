import playerService from "~/app/(services)/nat-stat/player-service";

export default async function Page({
  params,
}: {
  params: Promise<{ rangeStart: string }>;
}) {
  const { rangeStart } = await params;
  const rangeStartNumber = parseInt(rangeStart);

  const result = await playerService.mapNatStatPlayersToDB(rangeStartNumber);

  return <div>Getting 100 players, starting from {rangeStartNumber}</div>;
}
