import { supabase } from "~/lib/initSupabase";

const playerStatsService = {
  getPlayerStats: async (playerId: string) => {
    const { data, error } = await supabase
      .from("player_stats")
      .select("*")
      .eq("player_id", playerId);
    if (error) {
      throw error;
    }
    return data;
  },
  getPlayersAndMostRecentStatsByCollegeId: async (collegeId: number) => {
    const { data, error } = await supabase.rpc("get_most_recent_games", {
      collegeid: collegeId,
    });
    if (error) {
      throw error;
    }
    return data;
  },
};

export default playerStatsService;
