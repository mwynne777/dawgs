import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import playerStatsService from "./services/player-stats-service";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.get("/seed/player-stats", async (req: Request, res: Response) => {
  try {
    const result = await playerStatsService.getPlayerStats(parseInt(req.query.range_start as string));
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.get("/player-stats/college-id", async (req: Request, res: Response) => {
  const result = await playerStatsService.getPlayerStatsByCollegeIDFromDB(parseInt(req.query.college_id as string));
  res.status(200).json(result);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});