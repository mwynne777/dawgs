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
};

export default collegesService;
