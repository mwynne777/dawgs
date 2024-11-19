import Table from "./components/table";

const BOX_SCORE_BASE_URL =
  "https://site.web.api.espn.com/apis/site/v2/sports/basketball/nba/summary?region=us&lang=en&contentorigin=espn&event=";

export type Player = {
  id: string;
  name: string;
};

const PLAYERS: Player[] = [
  { id: "5105565", name: "Donovan Clingan" },
  { id: "4432190", name: "Andre Jackson" },
];

export default async function DashboardPage() {
  const gameIds = [401704792, 401704814];
  const [dCBoxScoreResponse, aJaxBoxScoreResponse] = await Promise.all(
    gameIds.map((gameId) => fetch(`${BOX_SCORE_BASE_URL}${gameId}`)),
  );
  const dCBoxScoreResponseParsed = await dCBoxScoreResponse?.json();
  const portlandTeamStats = dCBoxScoreResponseParsed.boxscore.players.find(
    (dumbObject: any) => dumbObject.team.id === "22",
  );
  const dcStats = portlandTeamStats.statistics[0].athletes.find(
    (player: any) => player.athlete.id === PLAYERS[0]!.id,
  ).stats as string[];

  const aJaxBoxScoreResponseParsed = await aJaxBoxScoreResponse?.json();
  const milwaukeeTeamStats = aJaxBoxScoreResponseParsed.boxscore.players.find(
    (dumbObject: any) => dumbObject.team.id === "15",
  );
  const aJaxStats = milwaukeeTeamStats.statistics[0].athletes.find(
    (player: any) => player.athlete.id === PLAYERS[1]!.id,
  ).stats as string[];

  return (
    <Table
      allPlayerStats={[
        { stats: dcStats, player: PLAYERS[0]! },
        { stats: aJaxStats, player: PLAYERS[1]! },
      ]}
    />
  );
}
