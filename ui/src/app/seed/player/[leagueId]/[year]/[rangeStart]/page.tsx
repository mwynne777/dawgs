export default async function Page({
  params,
}: {
  params: Promise<{ rangeStart: string; year: string; leagueId: string }>;
}) {
  const { rangeStart, year, leagueId } = await params;
  const rangeStartNumber = parseInt(rangeStart);
  const yearNumber = parseInt(year);

  const result = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}seed/players?range_start=${rangeStartNumber}&year=${yearNumber}&league_id=${leagueId}`,
  );
  const data = (await result.json()) as null;
  console.log("data", data);

  return <div>Getting 100 players, starting from {rangeStartNumber}</div>;
}
