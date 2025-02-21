import playerStatsService from "../services/player-stats-service";
import dotenv from "dotenv";

dotenv.config();

const main = async (rangeStart: number, year: number, leagueId: 'NBA' | 'GL') => {
  if (rangeStart > 1000) {
    console.log(`${leagueId} rangeStart is greater than 1000, stopping`);
    return;
  }

  const result = await playerStatsService.getPlayerStats(rangeStart, year, leagueId);
  const easternTime = new Date().toLocaleString("en-US", { timeZone: "America/New_York" });
  console.log(`${leagueId} rangeStart: ${rangeStart}, savedCount: ${result.savedCount}, existingCount: ${result.existingCount}, easternTime: ${easternTime}`);

  if (result.existingCount < 100) {
    console.log(`${leagueId} existingCount: ${result.existingCount} is less than 100, continuing with rangeStart ${rangeStart + 100}`);
    main(rangeStart + 100, year, leagueId);
  } else {
    console.log(`${leagueId} existingCount: ${result.existingCount}, stopping`);
  }
};

main(0, 2025, 'GL' as 'NBA' | 'GL');
