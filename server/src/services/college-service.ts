import { supabase } from "../initSupabase";

type CollegeResponse = {
    teams: Record<string, { code: string, name: string }>
}

const collegeService = {
    getCollegesFromAPI: async (rangeStart: number) => {
        const response = await fetch(`${process.env.NAT_STAT_API_BASE_URL}teams/mbb/2025/${rangeStart}`);
        const data = (await response.json()) as CollegeResponse;
        return Object.values(data.teams).map((team) => ({
            code: team.code,
            name: team.name
        }));
    },
    mapCollegesToDB: async (rangeStart: number) => {
        const collegesToInsert = await collegeService.getCollegesFromAPI(rangeStart);
        const { data, error } = await supabase.from('schools').upsert(collegesToInsert);
        if (error) {
            console.error('Error inserting colleges into database', error);
            throw error;
        }
        return data;
    }
}

export default collegeService;