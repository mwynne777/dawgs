import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import playerStatsService from "./services/player-stats-service";
import playerService from "./services/player-service";
import collegeService from "./services/college-service";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/seed/players", async (req: Request, res: Response) => {
  try {
    const result = await playerService.mapNatStatPlayersToDB(parseInt(req.query.range_start as string), parseInt(req.query.year as string));
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/seed/colleges", async (req: Request, res: Response) => {
  try {
    const result = await collegeService.mapCollegesToDB(parseInt(req.query.range_start as string));
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/seed/player-stats", async (req: Request, res: Response) => {
  try {
    const result = await playerStatsService.getPlayerStats(parseInt(req.query.range_start as string));
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/player-stats/college-code", async (req: Request, res: Response) => {
  const result = await playerStatsService.getPlayerStatsByCollegeCodeFromDB(req.query.college_code as string);
  res.status(200).json(result);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});