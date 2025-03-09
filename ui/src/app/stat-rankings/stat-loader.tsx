import collegesService from "../(services)/colleges-service";
import StatRankingsClientComponent from "./client-component";

const StatLoader = async ({}) => {
  const year = 2025;
  const [
    collegeStatTotals,
    colleges,
    collegeSalaryTotals,
    historicalCollegeStatTotals,
  ] = await Promise.all([
    collegesService.getCollegeStatTotals(year),
    collegesService.getColleges(),
    collegesService.getCollegeSalaryTotals(),
    collegesService.getHistoricalCollegeStatTotals(),
  ]);

  return (
    <StatRankingsClientComponent
      collegeStatTotals={collegeStatTotals}
      colleges={colleges}
      collegeSalaryTotals={collegeSalaryTotals}
      historicalCollegeStatTotals={historicalCollegeStatTotals}
    />
  );
};

export default StatLoader;
