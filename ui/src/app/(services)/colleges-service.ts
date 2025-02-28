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

    const glMinutesRankings = new Map(
      data
        .slice()
        .sort((a, b) => b.gl_total_minutes - a.gl_total_minutes)
        .map((college, index) => [college.gl_total_minutes, index + 1])
    );

    const nbaMinutesRankings = new Map(
      data
        .slice()
        .sort((a, b) => b.nba_total_minutes - a.nba_total_minutes)
        .map((college, index) => [college.nba_total_minutes, index + 1])
    );

    const pointsRankings = new Map(
      data
        .slice()
        .sort((a, b) => b.total_points - a.total_points)
        .map((college, index) => [college.total_points, index + 1])
    );

    const glPointsRankings = new Map(
      data
        .slice()
        .sort((a, b) => b.gl_total_points - a.gl_total_points)
        .map((college, index) => [college.gl_total_points, index + 1])
    );

    const nbaPointsRankings = new Map(
      data
        .slice()
        .sort((a, b) => b.nba_total_points - a.nba_total_points)
        .map((college, index) => [college.nba_total_points, index + 1])
    );

    const reboundsRankings = new Map(
      data
        .slice()
        .sort((a, b) => b.total_rebounds - a.total_rebounds)
        .map((college, index) => [college.total_rebounds, index + 1])
    );

    const glReboundsRankings = new Map(
      data
        .slice()
        .sort((a, b) => b.gl_total_rebounds - a.gl_total_rebounds)
        .map((college, index) => [college.gl_total_rebounds, index + 1])
    );

    const nbaReboundsRankings = new Map(
      data
        .slice()
        .sort((a, b) => b.nba_total_rebounds - a.nba_total_rebounds)
        .map((college, index) => [college.nba_total_rebounds, index + 1])
    );

    const assistsRankings = new Map(
      data
        .slice()
        .sort((a, b) => b.total_assists - a.total_assists)
        .map((college, index) => [college.total_assists, index + 1])
    );

    const glAssistsRankings = new Map(
      data
        .slice()
        .sort((a, b) => b.gl_total_assists - a.gl_total_assists)
        .map((college, index) => [college.gl_total_assists, index + 1])
    );

    const nbaAssistsRankings = new Map(
      data
        .slice()
        .sort((a, b) => b.nba_total_assists - a.nba_total_assists)
        .map((college, index) => [college.nba_total_assists, index + 1])
    );

    // Add rankings to each college using the maps
    const withRankings = data.map(college => ({
      ...college,
      total_minutes_ranking: minutesRankings.get(college.total_minutes)!,
      gl_total_minutes_ranking: glMinutesRankings.get(college.gl_total_minutes)!,
      nba_total_minutes_ranking: nbaMinutesRankings.get(college.nba_total_minutes)!,
      total_points_ranking: pointsRankings.get(college.total_points)!,
      gl_total_points_ranking: glPointsRankings.get(college.gl_total_points)!,
      nba_total_points_ranking: nbaPointsRankings.get(college.nba_total_points)!,
      total_rebounds_ranking: reboundsRankings.get(college.total_rebounds)!,
      gl_total_rebounds_ranking: glReboundsRankings.get(college.gl_total_rebounds)!,
      nba_total_rebounds_ranking: nbaReboundsRankings.get(college.nba_total_rebounds)!,
      total_assists_ranking: assistsRankings.get(college.total_assists)!,
      gl_total_assists_ranking: glAssistsRankings.get(college.gl_total_assists)!,
      nba_total_assists_ranking: nbaAssistsRankings.get(college.nba_total_assists)!,
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
