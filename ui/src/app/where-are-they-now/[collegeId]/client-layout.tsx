"use client";

import { useState } from "react";
import type collegesService from "~/app/(services)/colleges-service";
import CollegeSelector from "~/app/college-selector";
import { Pencil2Icon, Cross1Icon } from "@radix-ui/react-icons";

const ClientLayout = ({
  colleges,
  collegeId,
  children,
}: {
  colleges: Awaited<ReturnType<typeof collegesService.getColleges>>;
  collegeId: number;
  children: React.ReactNode;
}) => {
  const college = colleges.find((college) => college.id === collegeId)!;
  const [showSelector, setShowSelector] = useState(false);

  return (
    <div>
      <div className="sticky top-0 z-20 bg-white p-4 shadow-md">
        <h1 className="flex items-center justify-center gap-2 text-center text-xl font-bold">
          <span>
            {college.name} {college.mascot}
          </span>
          <div
            className="cursor-pointer rounded-full p-2 hover:bg-gray-100"
            onClick={() => setShowSelector(!showSelector)}
          >
            <Pencil2Icon className="h-4 w-4" />
          </div>
        </h1>
      </div>
      {children}
      {showSelector && (
        <div
          className="fixed inset-0 z-10 flex justify-center bg-black/50"
          onClick={() => setShowSelector(false)}
        >
          <div
            className="absolute right-4 top-20 cursor-pointer rounded-full bg-white p-2 shadow-md hover:bg-gray-100"
            onClick={(e) => {
              e.stopPropagation();
              setShowSelector(false);
            }}
          >
            <Cross1Icon className="h-4 w-4" />
          </div>
          <div
            className="mt-20 h-fit rounded-lg bg-white p-4 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <CollegeSelector colleges={colleges} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientLayout;
