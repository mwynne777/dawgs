import { supabase } from "~/lib/initSupabase";

const collegesService = {
  getCollegeById: async (collegeId: number) => {
    const { data, error } = await supabase
      .from("colleges")
      .select("*")
      .eq("id", collegeId)
      .single();

    if (error) {
      throw error;
    }

    return data;
  },
  getCollegeStatTotals: async () => {
    const { data, error } = await supabase.rpc("getcollegestattotals");
    
    if (error) {
      throw error;
    }

    // Create ranking maps for each category
    const minutesRankings = new Map(
      data
        .slice()
        .sort((a, b) => b.total_minutes - a.total_minutes)
        .map((college, index) => [college.total_minutes, index + 1])
    );

    const pointsRankings = new Map(
      data
        .slice()
        .sort((a, b) => b.total_points - a.total_points)
        .map((college, index) => [college.total_points, index + 1])
    );

    const reboundsRankings = new Map(
      data
        .slice()
        .sort((a, b) => b.total_rebounds - a.total_rebounds)
        .map((college, index) => [college.total_rebounds, index + 1])
    );

    const assistsRankings = new Map(
      data
        .slice()
        .sort((a, b) => b.total_assists - a.total_assists)
        .map((college, index) => [college.total_assists, index + 1])
    );

    // Add rankings to each college using the maps
    const withRankings = data.map(college => ({
      ...college,
      total_minutes_ranking: minutesRankings.get(college.total_minutes)!,
      total_points_ranking: pointsRankings.get(college.total_points)!,
      total_rebounds_ranking: reboundsRankings.get(college.total_rebounds)!,
      total_assists_ranking: assistsRankings.get(college.total_assists)!
    }));

    return withRankings;
  }
};

export default collegesService;
