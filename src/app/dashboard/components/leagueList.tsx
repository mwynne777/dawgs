"use client";

import type { GameRecord } from "~/lib/handleCache";
import { leagues } from "../leagues";
import LeagueCard from "./leagueCard";

export default function Table({ games }: { games: GameRecord[] }) {
  return (
    <div className="flex flex-col gap-6">
      {Object.entries(leagues).map(([_, league]) => {
        const leagueGames = games.filter((g) => g.game.leagueId === league.id);
        if (leagueGames.length === 0) return null;

        return (
          <div
            key={league.id}
            className="flex flex-col gap-4 rounded-lg border border-gray-200 p-4"
          >
            <LeagueCard league={league} leagueGames={leagueGames} />
          </div>
        );
      })}
    </div>
  );
}
