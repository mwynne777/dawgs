const playerStatsService = require("../dist/services/player-stats-service");

const main = async (rangeStart) => {
  const result = await playerStatsService.getPlayerStats(rangeStart);
  console.log(result);
};

main(0);
