export default async function StatSeeder({
  year,
  rangeStart,
}: {
  year: string;
  rangeStart: string;
}) {
  const rangeStartNumber = parseInt(rangeStart);

  const result = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}player-stats?range_start=${rangeStartNumber}`,
  );

  const { savedCount, existingCount, existingIds } = (await result.json()) as {
    savedCount: number;
    existingCount: number;
    existingIds: number[];
  };

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="text-center">
        <div>
          Saved {savedCount} player stats, {existingCount} already existed
        </div>
        {existingIds.map((id) => (
          <div key={id}>{id}</div>
        ))}
        {result.status === 200 ? (
          <div className="mt-4">
            <a
              href={`/seed/player-stats/${year}/${rangeStartNumber + 100}`}
              className="text-blue-500 underline hover:text-blue-700"
            >
              Get next 100 - starting from {rangeStartNumber + 100}
            </a>
          </div>
        ) : (
          <div>Error: {result.statusText}</div>
        )}
      </div>
    </div>
  );
}
