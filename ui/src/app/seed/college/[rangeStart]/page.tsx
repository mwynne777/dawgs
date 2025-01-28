export default async function Page({
  params,
}: {
  params: Promise<{ rangeStart: string }>;
}) {
  const { rangeStart } = await params;
  const rangeStartNumber = parseInt(rangeStart);

  const result = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}seed/colleges?range_start=${rangeStartNumber}`,
  );
  const data = (await result.json()) as null;
  console.log("data", data);

  return <div>Getting 100 colleges, starting from {rangeStartNumber}</div>;
}
