import collegesService from "~/app/(services)/colleges-service";

const Layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ collegeId: string }>;
}) => {
  const { collegeId: collegeIdString } = await params;
  const collegeId = parseInt(collegeIdString);
  const college = await collegesService.getCollegeById(collegeId);
  return (
    <div>
      <div className="sticky top-0 z-10 bg-white p-4 shadow-md">
        <h1 className="text-center text-xl font-bold">
          {college.name} {college.mascot}
        </h1>
      </div>
      {children}
    </div>
  );
};

export default Layout;
