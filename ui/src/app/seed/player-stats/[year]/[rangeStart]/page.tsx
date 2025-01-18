export default async function Page({
  params,
}: {
  params: Promise<{ year: string; rangeStart: string }>;
}) {
  const { year, rangeStart } = await params;
  const rangeStartNumber = parseInt(rangeStart);

  const result = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}player-stats?range_start=${rangeStartNumber}`,
  );
  console.log(result);
  return (
    <div>
      Getting 100 player_stats from {year}, starting from {rangeStartNumber}
    </div>
  );
}
