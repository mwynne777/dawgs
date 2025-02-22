import SuspensefulServerComponent from "~/app/(common)/components/suspensefulComponent-server";
import Loader from "./loader";

const WhereAreTheyNowPage = async ({
  params,
}: {
  params: Promise<{ collegeCode: string }>;
}) => {
  return (
    <>
      <SuspensefulServerComponent date={new Date().toISOString()}>
        <Loader params={params} />
      </SuspensefulServerComponent>
    </>
  );
};

export default WhereAreTheyNowPage;
