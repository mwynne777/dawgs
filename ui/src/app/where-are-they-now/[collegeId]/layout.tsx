import collegesService from "~/app/(services)/colleges-service";
import ClientLayout from "./client-layout";

const Layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ collegeId: string }>;
}) => {
  const { collegeId: collegeIdString } = await params;
  const collegeId = parseInt(collegeIdString);
  const colleges = await collegesService.getColleges();

  return (
    <ClientLayout colleges={colleges} collegeId={collegeId}>
      {children}
    </ClientLayout>
  );
};

export default Layout;
