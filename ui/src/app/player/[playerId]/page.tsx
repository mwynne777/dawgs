import SuspensefulServerComponent from "../../(common)/components/suspensefulComponent-server";
import Loader from "./loader";

const StatRankingsPage = async ({
  params,
}: {
  params: Promise<{ playerId: string }>;
}) => {
  return (
    <div className="mx-auto max-w-[1000px] px-8">
      <SuspensefulServerComponent date={new Date().toISOString()}>
        <Loader params={params} />
      </SuspensefulServerComponent>
    </div>
  );
};

export default StatRankingsPage;
