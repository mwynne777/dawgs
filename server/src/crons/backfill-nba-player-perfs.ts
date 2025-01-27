import playerStatsService from "../services/player-stats-service";
import dotenv from "dotenv";

dotenv.config();

const main = async (rangeStart: number) => {
  if (rangeStart > 1000) {
    console.log("rangeStart is greater than 1000, stopping");
    return;
  }

  const result = await playerStatsService.getPlayerStats(rangeStart);
  const easternTime = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
  console.log('rangeStart', rangeStart, 'savedCount', result.savedCount, 'existingCount', result.existingCount, 'easternTime', easternTime);

  if (result.existingCount < 100) {
    console.log(`existingCount: ${result.existingCount} is less than 100, continuing with rangeStart ${rangeStart + 100}`);
    main(rangeStart + 100);
  } else {
    console.log(`existingCount: ${result.existingCount}, stopping`);
  }
};

main(0);
