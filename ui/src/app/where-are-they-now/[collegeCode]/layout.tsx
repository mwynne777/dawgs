import collegesService from "~/app/(services)/colleges-service";
import ClientLayout from "./client-layout";

const Layout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ collegeCode: string }>;
}) => {
  const { collegeCode: collegeCodeBeforeCaps } = await params;
  const collegeCode = collegeCodeBeforeCaps.toUpperCase();

  const colleges = await collegesService.getColleges();

  return (
    <ClientLayout colleges={colleges} collegeCode={collegeCode}>
      {children}
    </ClientLayout>
  );
};

export default Layout;
