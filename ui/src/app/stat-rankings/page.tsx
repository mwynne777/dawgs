import SuspensefulServerComponent from "../(common)/components/suspensefulComponent-server";
import StatLoader from "./stat-loader";

const StatRankingsPage = async () => {
  return (
    <div className="mx-auto max-w-[1000px] px-8">
      <SuspensefulServerComponent date={new Date().toISOString()}>
        <StatLoader />
      </SuspensefulServerComponent>
    </div>
  );
};

export default StatRankingsPage;
