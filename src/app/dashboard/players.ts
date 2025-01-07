import { supabase } from "~/lib/initSupabase";
import type { TeamAbbreviation } from "./teams";
import type { Database } from "~/lib/supabase-types";

export type Player = {
    id: string;
    name: string;
    teamId: number,
    leagueId: number,
    collegeId?: number,
    salary?: number | null
  };

export const PLAYERS: Player[] = [
    { id: "5105565", name: "Donovan Clingan", teamId: 22, leagueId: 46 },
    { id: "4432190", name: "Andre Jackson", teamId: 15, leagueId: 46 },
    { id: "4433083", name: "Cam Spencer", teamId: 29, leagueId: 46 },
    { id: "4683750", name: "Jordan Hawkins", teamId: 3, leagueId: 46 },
    { id: "4845367", name: "Stephon Castle", teamId: 24, leagueId: 46 },
    { id: "4397179", name: "Tyrese Martin", teamId: 17, leagueId: 46 },
    // { id: "4592965", name: "Tristen Newton", teamId: 7, leagueId: 69 },
  ] as const;

export const getPlayerByTeamAbbreviation = (abbrev: TeamAbbreviation): Player => {
    switch(abbrev) {
        case 'por':
            return PLAYERS[0]!
        case 'mil':
            return PLAYERS[1]!
        case 'mem':
            return PLAYERS[2]!
        case 'no':
            return PLAYERS[3]!
        default:
            return PLAYERS[4]!
    }
}

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