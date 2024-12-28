import { Suspense } from "react";
import AnotherServerComponent from "./serverDailySummary";

type ServerComponentProps = {
  date: string | undefined;
};

const ServerComponent = async ({ date }: ServerComponentProps) => {
  return (
    <Suspense
      key={date}
      fallback={
        <div className="flex h-[50vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
        </div>
      }
    >
      <AnotherServerComponent date={date} />
    </Suspense>
  );
};

export default ServerComponent;
