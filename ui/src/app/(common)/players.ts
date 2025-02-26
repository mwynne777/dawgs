import { supabase } from "~/lib/initSupabase";
import type { Database } from "~/lib/supabase-types";

export type Player = {
    id: string;
    name: string;
    teamId: number,
    leagueId: number,
    collegeId?: number,
    salary?: number | null
  };

export const savePlayers = async (players: Database['public']['Tables']['players']['Insert'][]) => {
    const {data, error} = await supabase.from('players').upsert(players);
    if(error) {
        console.error(error);
    }
}

export const saveColleges = async (colleges: Database['public']['Tables']['colleges']['Insert'][]) => {
    const {data, error} = await supabase.from('colleges').upsert(colleges);
    if(error) {
        console.error(error);
    }
}

export const getPlayersByCollegeId = async (collegeId: number) => {
    const {data, error} = await supabase.from('players').select('*').eq('college_id', collegeId);
    if(error) {
        throw new Error(`Error getting players by college id: ${error.message}`);
    }
    return mapPlayers(data);
}

const mapPlayers = (players: Database['public']['Tables']['players']['Row'][]): Player[] => {
    return players.map(p => ({
        id: p.id.toString(),
        name: p.full_name,
        teamId: p.team_id ?? 0,
        leagueId: p.league_id ?? 0,
        collegeId: p.college_id ?? 0,
        salary: p.salary,
    }));
}