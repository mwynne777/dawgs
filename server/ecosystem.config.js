module.exports = {
  apps: [
    {
      name: "api",
      script: "./dist/index.js",
      instances: 1,
      exec_mode: "cluster",
      watch: false,
      autorestart: true,
    },
    {
      name: "NBA-CRON",
      script: "dist/crons/backfill-nba-player-perfs.js",
      instances: 1,
      exec_mode: "fork",
      cron_restart: "0 6,7 * * *",
      watch: false,
      autorestart: false,
    },
    {
      name: "GL-CRON",
      script: "dist/crons/backfill-gl-player-perfs.js",
      instances: 1,
      exec_mode: "fork",
      cron_restart: "0 6,7 * * *",
      watch: false,
      autorestart: false,
    },
  ],
};

