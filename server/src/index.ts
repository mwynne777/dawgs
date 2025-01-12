import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { Player, PLAYERS } from "./players";
import { leagues } from "./leagues";
import { Game } from "./teams";
import playerService from "./services/player-service";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const getBoxScoreUrl = (leagueAbbreviation: string, gameId: string) => {
  return `${process.env.STATS_API_BASE_URL}${leagueAbbreviation}/summary?region=us&lang=en&contentorigin=espn&event=${gameId}`;
}

export type GameRecord = {
  game: Game;
  players: { stats: string[]; player: Player }[];
};

type BoxScoreStatistic = {
  athletes: { athlete: { id: string }; stats: string[] }[]
}

type BoxscoreResponse = {
  boxscore: {
      players: {
          statistics: BoxScoreStatistic[]
      }[]
  }
}

const getPlayers = async (id: string, league_id: number) => {
    const players: { stats: string[]; player: Player }[] = [];
    const leagueAbbreviation = Object.entries(leagues).find(([_, value]) => value.id === league_id)?.[0];
    if(!leagueAbbreviation) return [];
    const boxScoreResponse = await fetch(getBoxScoreUrl(leagueAbbreviation, id));
    const boxScoreResponseParsed = await boxScoreResponse.json() as BoxscoreResponse;

    if (!("players" in boxScoreResponseParsed.boxscore)) return [];

    boxScoreResponseParsed.boxscore.players.forEach((element) => {
        const athletes = element.statistics[0]!.athletes;
        const uconnPlayerIds = Object.values(PLAYERS).map((p) => p.id);
        const athletesOfInterest = athletes.filter(
            (a: { athlete: { id: string } }) =>
            uconnPlayerIds.includes(a.athlete.id),
        );
        athletesOfInterest.forEach(
            (a: { athlete: { id: string }; stats: string[] }) => {
            players.push({
                stats: a.stats,
                player: PLAYERS.find((p) => p.id === a.athlete.id)!,
            });
        },
    );
  });
  return players;
}

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/players", async (req: Request, res: Response) => {
  const result = await getPlayers(req.query.id as string, parseInt(req.query.league_id as string));
  res.status(200).json(result);
});

app.get("/players/stats", async (req: Request, res: Response) => {
  const result = await playerService.getPlayerStatsFromAPI(parseInt(req.query.player_id as string), parseInt(req.query.league_id as string));
  res.status(200).json(result);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});