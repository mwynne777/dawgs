import { PlayerGroup } from "~/app/seed/[leagueId]/[teamId]/player-card";
import { Database } from "~/lib/supabase-types";

const CollegeCard = ({
  college,
  playersWithStats,
}: {
  college: Database["public"]["Tables"]["colleges"]["Row"];
  playersWithStats: PlayerGroup[];
}) => {
  return (
    <div className="mb-8 rounded-lg border border-gray-200">
      <div
        className="flex flex-col items-center justify-center rounded-lg p-4 pt-0"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0.95)), url(${process.env.NEXT_PUBLIC_NCAA_IMAGE_STORE_BASE_URL}${college.id}.png)`,
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="text-center text-sm">
          {playersWithStats.length} players have checked into an NBA game this
          season
        </div>
        <div className="mt-4 flex flex-col items-center">
          <h3 className="text-lg font-semibold">Totals:</h3>
          <div className="mt-2 flex gap-4">
            <div className="stat text-center">
              <p className="text-sm text-gray-600">MINS</p>
              <p className="font-medium">
                {playersWithStats
                  .reduce((acc, curr) => acc + curr.totals.minutes, 0)
                  .toLocaleString()}
              </p>
            </div>
            <div className="stat text-center">
              <p className="text-sm text-gray-600">PTS</p>
              <p className="font-medium">
                {playersWithStats
                  .reduce((acc, curr) => acc + curr.totals.points, 0)
                  .toLocaleString()}
              </p>
            </div>
            <div className="stat text-center">
              <p className="text-sm text-gray-600">REB</p>
              <p className="font-medium">
                {playersWithStats
                  .reduce((acc, curr) => acc + curr.totals.rebounds, 0)
                  .toLocaleString()}
              </p>
            </div>
            <div className="stat text-center">
              <p className="text-sm text-gray-600">AST</p>
              <p className="font-medium">
                {playersWithStats
                  .reduce((acc, curr) => acc + curr.totals.assists, 0)
                  .toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeCard;
