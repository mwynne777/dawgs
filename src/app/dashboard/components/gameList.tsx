"use client";

import type { GameRecord } from "~/lib/handleCache";
import { leagues } from "../leagues";
import { useState } from "react";
import GameCard from "./gameCard";

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
            {(() => {
              const [collapsed, setCollapsed] = useState<
                Record<number, boolean>
              >({});

              return (
                <>
                  <div>
                    <button
                      onClick={() =>
                        setCollapsed((prev) => ({
                          ...prev,
                          [league.id]: !prev[league.id],
                        }))
                      }
                      className="flex w-full items-center gap-2 rounded border border-gray-200 p-2 text-xl font-bold transition-colors hover:bg-gray-50"
                    >
                      <span
                        className="transform text-sm transition-transform duration-200"
                        style={{
                          transform: collapsed[league.id]
                            ? "rotate(-90deg)"
                            : "rotate(0deg)",
                        }}
                      >
                        ▼
                      </span>
                      {league.displayName}
                    </button>
                  </div>
                  {!collapsed[league.id] && (
                    <div className="pl-4">
                      {leagueGames.map((gameRecord) => (
                        <div
                          key={gameRecord.game.id}
                          className="flex flex-col gap-2 py-4"
                        >
                          <div>
                            <h4 className="font-bold">
                              {gameRecord.game.name}
                            </h4>
                            {gameRecord.game.status !== "completed" && (
                              <p>{gameRecord.game.status}</p>
                            )}
                          </div>
                          <GameCard gameRecord={gameRecord} />
                        </div>
                      ))}
                    </div>
                  )}
                </>
              );
            })()}
          </div>
        );
      })}
    </div>
  );
}
