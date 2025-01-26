import playerStatsService from "../services/player-stats-service";
import dotenv from "dotenv";

dotenv.config();

const main = async (rangeStart: number) => {
  if (rangeStart > 1000) {
    console.log("rangeStart is greater than 1000, stopping");
    return;
  }

  const result = await playerStatsService.getPlayerStats(rangeStart);
  console.log('rangeStart', rangeStart, result);

  if (result.existingCount < 100) {
    console.log(`existingCount: ${result.existingCount} is less than 100, continuing with rangeStart ${rangeStart + 100}`);
    main(rangeStart + 100);
  }
};

main(0);
