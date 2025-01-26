import playerStatsService from "../services/player-stats-service";
import dotenv from "dotenv";

dotenv.config();

const main = async (rangeStart: number) => {
  const result = await playerStatsService.getPlayerStats(rangeStart);
  console.log(result);
};

main(0);
