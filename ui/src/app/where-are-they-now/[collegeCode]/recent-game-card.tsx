"use client";

import { teams } from "~/app/(common)/teams";
import type { Database } from "~/lib/supabase-types";
import FormattedDate from "./formatted-date";
import { useState } from "react";

export type PlayerWithStats = Database["public"]["Tables"]["players"]["Row"] & {
  player_stats: Database["public"]["Tables"]["player_stats"]["Row"][];
  draft_picks: Database["public"]["Tables"]["draft_picks"]["Row"][];
};

const RecentGameCard = ({
  playerPerfs,
}: {
  playerPerfs: Database["public"]["Tables"]["player_stats"]["Row"][];
}) => {
  const [showAll, setShowAll] = useState(false);
  const displayedGames = showAll
    ? playerPerfs.slice(0, 6)
    : playerPerfs.slice(0, 3);

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-t bg-gray-100 text-center">
              <th className="px-1 py-1">DATE</th>
              <th className="px-1 py-1">OPP</th>
              <th className="px-1 py-1">MIN</th>
              <th className="px-1 py-1">PTS</th>
              <th className="px-1 py-1">REB</th>
              <th className="px-1 py-1">AST</th>
              <th className="hidden px-1 py-1 sm:table-cell">STL</th>
              <th className="px-1 py-1">BLK</th>
              <th className="hidden px-1 py-1 sm:table-cell">FG</th>
              <th className="hidden px-1 py-1 sm:table-cell">3PT</th>
              <th className="hidden px-1 py-1 sm:table-cell">TO</th>
              {/* <th className="hidden px-1 py-1 sm:table-cell">+/-</th> */}
            </tr>
          </thead>
          <tbody>
            {displayedGames.map((perf) => {
              return (
                <tr key={perf.id} className="border-b text-center">
                  <td className="px-1 py-1">
                    <FormattedDate date={perf.game_date} />
                  </td>
                  <td className="px-1 py-1">
                    {teams[perf.opponent_id ?? 0]?.abbreviation.toUpperCase()}
                  </td>
                  <td className="px-1 py-1">{perf.minutes}</td>
                  <td className="px-1 py-1">{perf.points}</td>
                  <td className="px-1 py-1">{perf.rebounds}</td>
                  <td className="px-1 py-1">{perf.assists}</td>
                  <td className="hidden px-1 py-1 sm:table-cell">
                    {perf.steals}
                  </td>
                  <td className="px-1 py-1">{perf.blocks}</td>
                  <td className="hidden px-1 py-1 sm:table-cell">{`${perf.fg_m} - ${perf.fg_a}`}</td>
                  <td className="hidden px-1 py-1 sm:table-cell">{`${perf.three_fg_m} - ${perf.three_fg_a}`}</td>
                  <td className="hidden px-1 py-1 sm:table-cell">
                    {perf.turnovers}
                  </td>
                  {/* <td className="hidden px-1 py-1 sm:table-cell"></td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {playerPerfs.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-2 text-sm text-blue-600 hover:text-blue-800"
        >
          {showAll ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};

export default RecentGameCard;
