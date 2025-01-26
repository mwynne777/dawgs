const { getPlayerStats } = require("../dist/services/player-stats-service");

const main = async (rangeStart) => {
  const result = await getPlayerStats(rangeStart);
  console.log(result);
};

main(0);
