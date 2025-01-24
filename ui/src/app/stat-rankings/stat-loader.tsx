import collegesService from "../(services)/colleges-service";
import StatRankingsClientComponent from "./client-component";

const StatLoader = async ({}) => {
  const [collegeStatTotals, colleges] = await Promise.all([
    collegesService.getCollegeStatTotals(),
    collegesService.getColleges(),
  ]);

  return (
    <StatRankingsClientComponent
      collegeStatTotals={collegeStatTotals}
      colleges={colleges}
    />
  );
};

export default StatLoader;
