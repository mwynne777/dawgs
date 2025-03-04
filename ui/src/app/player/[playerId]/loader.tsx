import collegesService from "~/app/(services)/colleges-service";
import type { PlayerWithStats } from "../../where-are-they-now/[collegeCode]/recent-game-card";
import PlayerClientComponent from "./client-component";

export default async function Loader({
  params,
}: {
  params: Promise<{ playerId: string }>;
}) {
  const { playerId } = await params;
  const playersWithStats = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}player-stats/player-id/${playerId}`,
  ).then((res) => res.json() as Promise<PlayerWithStats[]>);

  const collegeCode = playersWithStats[0]?.college_code;

  const college = collegeCode
    ? await collegesService.getCollegeByCode(collegeCode)
    : null;

  return (
    <PlayerClientComponent
      playerWithStats={playersWithStats[0]}
      college={college}
    />
  );
}
