import fs from "fs";
import path from "path";

import { Game, TeamScheduleResponse } from "../../dashboard/teams";

const formatDate = (date: Date) => {
  const offset = date.getTimezoneOffset();
  date = new Date(date.getTime() - offset * 60 * 1000);
  return date.toISOString().split("T")[0] ?? "";
};

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const teamAbbrev = (await params).slug;

  const teamUrl = `https://site.web.api.espn.com/apis/site/v2/sports/basketball/nba/teams/${teamAbbrev}/schedule?region=us&lang=en&seasontype=2`;

  const response = await fetch(teamUrl);
  const responseJson: TeamScheduleResponse = await response.json();
  const games = responseJson.events.map((game) => ({
    id: game.id,
    date: new Date(game.date),
    name: game.name,
    teamIds: [
      game.competitions[0].competitors[0].id,
      game.competitions[0].competitors[1].id,
    ] as [string, string],
    status: game.competitions[0].status.type.completed
      ? "completed"
      : game.competitions[0].status.type.detail,
  }));
  const gamesFilteredByDate = games.filter(
    (g) => g.date > new Date("2024-11-01"),
  );
  const gamesGroupedByDate = gamesFilteredByDate.map((game) => {
    const formattedDate = formatDate(game.date);
    return {
      date: formattedDate,
      game: {
        id: game.id,
        date: game.date,
        name: game.name,
        teamIds: game.teamIds,
      },
    };
  });

  let existingGamesGroupedByDate: {
    date: string;
    games: Omit<Game, "status">[];
  }[] = [];

  fs.readFile(
    path.resolve("./src/app/data/schedule.json"),
    "utf8",
    (_, data) => {
      console.log(_, data);
      existingGamesGroupedByDate = JSON.parse(data);

      existingGamesGroupedByDate.sort(
        (a, b) =>
          new Date(a.date ?? "").getTime() - new Date(b.date ?? "").getTime(),
      );

      console.log(
        "Heres what I have for existingGamesGroupedByDate",
        existingGamesGroupedByDate!,
      );

      gamesGroupedByDate.forEach((newGameDate) => {
        console.log("newGameDate: ", newGameDate.date);
        const existingDate = existingGamesGroupedByDate.find(
          (d) => d.date === newGameDate.date,
        );
        if (
          existingDate &&
          !existingDate.games.find((g) => g.id === newGameDate.game.id)
        ) {
          existingDate.games.push(newGameDate.game);
          console.log(
            "trying to add to games on existing date",
            existingDate.date,
          );
        } else {
          // insert row into correct spot in data
          const currentDate = new Date("2024-10-31");
          let added = false;
          for (let i = 0; i < existingGamesGroupedByDate.length; i++) {
            if (
              currentDate < new Date(existingGamesGroupedByDate[i]?.date ?? "")
            ) {
              existingGamesGroupedByDate.splice(i, 0, {
                date: newGameDate.date,
                games: [newGameDate.game],
              });
              added = true;
              break;
            }
          }
          if (!added) {
            existingGamesGroupedByDate = [
              ...existingGamesGroupedByDate,
              { date: newGameDate.date, games: [newGameDate.game] },
            ];
          }
        }
      });

      if (
        existingGamesGroupedByDate !== undefined &&
        existingGamesGroupedByDate !== null
      ) {
        fs.writeFileSync(
          path.resolve("./src/app/data/schedule.json"),
          JSON.stringify(existingGamesGroupedByDate),
        );
      }
    },
  );

  return (
    <p>{`Adding ${teamAbbrev}'s games to the schedule ${JSON.stringify(existingGamesGroupedByDate)}`}</p>
  );
}
