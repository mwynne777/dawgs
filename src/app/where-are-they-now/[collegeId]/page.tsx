import { getPlayersByCollegeId } from "~/app/dashboard/players";
import PlayerCard from "~/app/seed/[leagueId]/[teamId]/player-card";

export default async function Page({
  params,
}: {
  params: Promise<{ collegeId: string }>;
}) {
  const { collegeId: collegeIdString } = await params;
  const collegeId = parseInt(collegeIdString);

  const players = await getPlayersByCollegeId(collegeId);
  return (
    <div className="mx-auto max-w-3xl px-8">
      <div className="mb-8 text-2xl font-bold">
        Total salary:{" "}
        {players
          .reduce((acc, p) => acc + (p.salary ?? 0), 0)
          .toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          })}
      </div>
      {players.map((p) => {
        return (
          <div className="mb-8" key={p.id}>
            <PlayerCard player={p} />
          </div>
        );
      })}
    </div>
  );
}
