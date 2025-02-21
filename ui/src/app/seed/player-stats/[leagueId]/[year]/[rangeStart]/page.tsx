import SuspensefulServerComponent from "~/app/(common)/components/suspensefulComponent-server";
import StatSeeder from "./stat-seeder";

const Page = async ({
  params,
}: {
  params: Promise<{ year: string; rangeStart: string; leagueId: string }>;
}) => {
  const { year, rangeStart, leagueId } = await params;
  const date = new Date().toISOString();

  return (
    <SuspensefulServerComponent date={date}>
      <StatSeeder year={year} rangeStart={rangeStart} leagueId={leagueId} />
    </SuspensefulServerComponent>
  );
};

export default Page;
