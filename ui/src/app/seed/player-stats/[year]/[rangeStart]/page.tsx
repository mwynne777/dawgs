import SuspensefulServerComponent from "~/app/dashboard/components/suspensefulComponent-server";
import StatSeeder from "./stat-seeder";

const Page = async ({
  params,
}: {
  params: Promise<{ year: string; rangeStart: string }>;
}) => {
  const { year, rangeStart } = await params;
  const date = new Date().toISOString();

  return (
    <SuspensefulServerComponent date={date}>
      <StatSeeder year={year} rangeStart={rangeStart} />
    </SuspensefulServerComponent>
  );
};

export default Page;
