import collegesService from "../(services)/colleges-service";

const StatRankingsPage = async ({
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    stat: string | undefined;
    selectedCollegeId: string | undefined;
  }>;
}) => {
  const { stat: statUrlParam, selectedCollegeId: selectedCollegeIdUrlParam } =
    await searchParams;
  const stat = statUrlParam ?? "total_points";
  const selectedCollegeId = selectedCollegeIdUrlParam ?? null;

  const [collegeStatTotals, colleges] = await Promise.all([
    collegesService.getCollegeStatTotals(),
    collegesService.getColleges(),
  ]);

  // Sort colleges by the selected stat
  const sortedColleges = collegeStatTotals
    .map((college) => {
      const collegeData = colleges.find((c) => c.id === college.college_id);
      return {
        ...college,
        display_name: `${collegeData?.name} ${collegeData?.mascot}`,
      };
    })
    .sort(
      (a, b) =>
        (b[stat as keyof typeof b] as number) -
        (a[stat as keyof typeof a] as number),
    );

  return (
    <div className="container mx-auto py-6">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-left">Rank</th>
            <th className="px-4 py-2 text-left">School</th>
            <th className="px-4 py-2 text-right">
              {stat.replace("_", " ").toUpperCase()}
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedColleges.map((college, index) => (
            <tr
              key={college.college_id}
              className={`border-t ${
                college.college_id === parseInt(selectedCollegeId ?? "0")
                  ? "bg-blue-50"
                  : ""
              }`}
            >
              <td className="px-4 py-2">{index + 1}</td>
              <td className="px-4 py-2">{college.display_name}</td>
              <td className="px-4 py-2 text-right">
                {college[stat as keyof typeof college]?.toLocaleString() || 0}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StatRankingsPage;
