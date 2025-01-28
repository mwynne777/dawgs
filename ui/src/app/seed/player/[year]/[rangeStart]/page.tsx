export default async function Page({
  params,
}: {
  params: Promise<{ rangeStart: string; year: string }>;
}) {
  const { rangeStart, year } = await params;
  const rangeStartNumber = parseInt(rangeStart);
  const yearNumber = parseInt(year);

  const result = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}seed/players?range_start=${rangeStartNumber}&year=${yearNumber}`,
  );
  const data = (await result.json()) as null;
  console.log("data", data);

  return <div>Getting 100 players, starting from {rangeStartNumber}</div>;
}
