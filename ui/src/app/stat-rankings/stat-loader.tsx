import collegesService from "../(services)/colleges-service";
import StatRankingsClientComponent from "./client-component";

const StatLoader = async ({}) => {
  const year = 2025;
  const [collegeStatTotals, colleges, collegeSalaryTotals] = await Promise.all([
    collegesService.getCollegeStatTotals(year),
    collegesService.getColleges(),
    collegesService.getCollegeSalaryTotals(),
  ]);

  return (
    <StatRankingsClientComponent
      collegeStatTotals={collegeStatTotals}
      colleges={colleges}
      collegeSalaryTotals={collegeSalaryTotals}
    />
  );
};

export default StatLoader;
