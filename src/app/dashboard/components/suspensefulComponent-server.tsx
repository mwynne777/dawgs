import { Suspense } from "react";

type SuspensefulServerComponentProps = {
  date: string | undefined;
  children: React.ReactNode;
};

const SuspensefulServerComponent = async ({
  date,
  children,
}: SuspensefulServerComponentProps) => {
  return (
    <Suspense
      key={date}
      fallback={
        <div className="flex h-[50vh] items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
        </div>
      }
    >
      {children}
    </Suspense>
  );
};

export default SuspensefulServerComponent;
