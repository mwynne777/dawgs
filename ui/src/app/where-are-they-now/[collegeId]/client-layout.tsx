"use client";

import { useState } from "react";
import type collegesService from "~/app/(services)/colleges-service";
import CollegeSelector from "~/app/college-selector";

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
      <div className="sticky top-0 z-10 bg-white p-4 shadow-md">
        <h1
          className="cursor-pointer text-center text-xl font-bold"
          onClick={() => setShowSelector(!showSelector)}
        >
          {college.name} {college.mascot}
        </h1>
      </div>
      {children}
      {showSelector && (
        <div
          className="fixed inset-0 flex justify-center bg-black/50"
          onClick={() => setShowSelector(false)}
        >
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
