import SuspensefulServerComponent from "~/app/(common)/components/suspensefulComponent-server";
import Loader from "./loader";

const WhereAreTheyNowPage = async ({
  params,
}: {
  params: Promise<{ collegeCode: string }>;
}) => {
  return (
    <div className="mx-auto max-w-[1000px] px-8">
      <SuspensefulServerComponent date={new Date().toISOString()}>
        <Loader params={params} />
      </SuspensefulServerComponent>
    </div>
  );
};

export default WhereAreTheyNowPage;
