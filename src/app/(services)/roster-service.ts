import type { Database } from "~/lib/supabase-types";
import { saveColleges } from "../dashboard/players";
import { savePlayers } from "../dashboard/players";
import { leagues } from "../dashboard/leagues";

type college = {
  id: string;
  name: string;
  shortName: string;
  mascot: string;
};

type RosterResponse = {
  athletes: {
    id: string;
    fullName: string;
    contract?: {
      salary: number;
      season: {
        year: number;
        startDate: string;
        endDate: string;
      };
    };
    // status?: {
    //   name: string;
    // }
    college?: college;
  }[];
};

const rosterService = {
  getRosterFromAPI: async (teamId: number, leagueId: number) => {
    const leagueAbbreviation = Object.keys(leagues).find(key => leagues[key as keyof typeof leagues].id === leagueId);
    if(!leagueAbbreviation) {
        throw new Error(`League ${leagueId} not found`);
    }
    const response = await fetch(`${process.env.NEXT_PUBLIC_STATS_API_BASE_URL}${leagueAbbreviation}/teams/${teamId}/roster`);
    const data = await response.json() as RosterResponse;
    const colleges: Map<string, Database['public']['Tables']['colleges']['Insert']> = new Map<string, Database['public']['Tables']['colleges']['Insert']>();
    const players: Database['public']['Tables']['players']['Insert'][] = data.athletes.map((athlete) => {
        const college = athlete.college;
        if(college) {
            colleges.set(college.id, {
                id: parseInt(college.id),
                name: college.name,
                short_name: college.shortName,
                mascot: college.mascot,
            });
        }
        return {
            id: parseInt(athlete.id),
            full_name: athlete.fullName,
            salary: athlete.contract?.salary ?? null,
            college_id: college ? parseInt(college?.id) : null,
            team_id: teamId,
            league_id: leagueId,
        }
    });
    await saveColleges(Array.from(colleges.values()));
    await savePlayers(players);
    return {players, colleges};
  },
};

export default rosterService;