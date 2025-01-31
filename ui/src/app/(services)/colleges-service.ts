import { supabase } from "~/lib/initSupabase";

const collegesService = {
  getColleges: async () => {
    const { data, error } = await supabase.from("colleges").select("*");
    if (error) {
      throw error;
    }
    return data;
  },
  getCollegeByCode: async (collegeCode: string) => {
    const { data, error } = await supabase
      .from("colleges")
      .select("*")
      .eq("code", collegeCode)
      .single();

    if (error) {
      throw error;
    }

    return data;
  },
  getCollegeStatTotals: async (year?: number) => {
    const { data, error } = await supabase.rpc("getcollegestattotals", {
      year_param: year,
    })
    
    if (error) {
      throw error;
    }

    return data;
  },
  getCollegeStatTotalsWithRankings: async (year?: number) => {
    const data = await collegesService.getCollegeStatTotals(year)
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
  },
  getCollegeSalaryTotals: async () => {
    const { data, error } = await supabase.rpc("getcollegesalarytotals");
    if (error) {
      throw error;
    }
    return data;
  },
};

export default collegesService;
