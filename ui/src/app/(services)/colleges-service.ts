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
  getCollegeSalaryTotals: async () => {
    const { data, error } = await supabase.rpc("getcollegesalarytotals");
    if (error) {
      throw error;
    }
    return data;
  },
};

export default collegesService;
