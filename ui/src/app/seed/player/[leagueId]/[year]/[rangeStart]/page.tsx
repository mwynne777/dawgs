export default async function Page({
  params,
}: {
  params: Promise<{ rangeStart: string; year: string; league_id: string }>;
}) {
  const { rangeStart, year, league_id } = await params;
  const rangeStartNumber = parseInt(rangeStart);
  const yearNumber = parseInt(year);

  const result = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}seed/players?range_start=${rangeStartNumber}&year=${yearNumber}&league_id=${league_id}`,
  );
  const data = (await result.json()) as null;
  console.log("data", data);

  return <div>Getting 100 players, starting from {rangeStartNumber}</div>;
}
