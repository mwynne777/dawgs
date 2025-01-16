import { supabase } from "~/lib/initSupabase";
import type { NatStatPlayerPerfs } from "../seed/[leagueId]/[teamId]/player-card";
import type { NatStatPlayerStats } from "../seed/[leagueId]/[teamId]/player-card";
import type { Database } from "~/lib/supabase-types";

const playerStatsService = {
  getPlayersAndMostRecentStatsByCollegeId: async (collegeId: number) => {
    const { data, error } = await supabase.rpc("get_most_recent_games", {
      collegeid: collegeId,
    });
    if (error) {
      throw error;
    }
    return data;
  },
  getPlayersByCollegeId: async (collegeId: number) => {
    const { data, error } = await supabase
      .from("players")
      .select("*")
      .eq("college_id", collegeId);
    if (error) {
      throw error;
    }
    return data;
  },
  getPlayerStats: async (players: Database["public"]["Tables"]["players"]["Row"][]) => {
    const statsResults = await Promise.allSettled(
      players.map(async (player) => {
        const statsResponse = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}players/stats?player_id=${player.nat_stat_id}&league_id=${player.team_id}`,
        );
        const { stats, playerPerfs, lastSeenDate } =
          (await statsResponse.json()) as {
            stats: NatStatPlayerStats;
            playerPerfs: NatStatPlayerPerfs[];
            lastSeenDate: string;
          };
        return {
          ...player,
          natStatStats: stats,
          natStatPerfs: playerPerfs,
          lastSeenDate,
        };
      }),
    );
  
    return statsResults
      .map((result, index) => {
        if (result.status === "fulfilled") {
          return result.value;
        }
        return {
          ...players[index]!,
          natStatStats: null,
          natStatPerfs: null,
          lastSeenDate: null,
        };
      })
      .sort((a, b) => {
        // Sort by lastSeenDate in descending order (most recent first)
        if (!a.lastSeenDate && !b.lastSeenDate) return 0;
        if (!a.lastSeenDate) return 1;
        if (!b.lastSeenDate) return -1;
  
        return (
          new Date(b.lastSeenDate).getTime() - new Date(a.lastSeenDate).getTime()
        );
      });
  }
};

export default playerStatsService;
