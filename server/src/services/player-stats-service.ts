import { supabase } from '../initSupabase';
import { teams } from '../teams';

type PerformanceKey = `performance_${number}`

type PlayerStatsResponse = {
  performances: Record<PerformanceKey, {
    id: string, 
    'player-code': string,
    starter: string
    game: {
        code: string
        gameday: string,
    },
    team: { code: string },
    opponent: { code: string },
    min: string,
    pts: string,
    fgm: string,
    fga: string,
    threefm: string,
    threefa: string,
    ftm: string,
    fta: string,
    reb: string,
    ast: string,
    stl: string,
    blk: string,
    oreb: string,
    to: string,
    pf: string,
  }>,
  meta: {
    'results-max': string;
    'results-total': string;
    page: string;
    'pages-total': string;

  }
}

const BAD_PERF_IDS = [
    '12186469',
    '12155870',
    '12155536',
    '12154957',
    '12154658',
    '12193210', 
    '12234587' // Damion Baugh
]

const NBA_ALTERNATE_PLAYER_ID_MAP: Record<string, string> = {
    '119696': '58075879', // Derrick Jones Jr.
    '538727': '3134324', // Daniel Theis
    '538998': '58075619', // Bogdan Bogdanovic
    '586': '58075621', // Clint Capela
    '52566256': '58075620', // Kobe Bufkin
    '54022359': '58076129', // Mason Jones
    '56876648': '58119281', // Jaylen Nowell
    // '0': '40737320', // David Duke, but probably need to comment out
    '74847619': '58320784', // Terrence Shannon Jr.
    '75526696': '68666972', // DaRon Holmes II
    '76273415': '329856', // Markelle Fultz
    '80411197': '1251771', // Jalen McDaniels
    '53469389': '62965654', // Tosan Evbuomwan
    '44851434': '58136275', // Matt Ryan
    '52566284': '58310626', // Isaiah Wong
    '47882279': '58075618', // Dominick Barlow
    '55530131': '55531829', // Wenyen Gabriel,
    '54708117': '54710299', // Darius Bazley
    // '0': '-1', // Charlie Brown - comment this out!
    '53961452': '53962656', // Ashton Hagans
    '52851934': '52851950', // Dmytro Skapintsev
    '1686212': '58119281', // Jaylen Nowell
    '52566294': '52833056', // GG Jackson II
    '49315832': '55842335', // Jamaree Bouyea
    // '0': '-2', // John Butler - comment this out!
}

const GL_ALTERNATE_PLAYER_ID_MAP: Record<string, string> = {
    '58269444': '58269397', // Cormac Ryan
    '65574961': '65562216', // Jordan Wright
    '58269514': '58269446', // Shakur Daniel
    '73500987': '73500950', // Olisa Akonobi
    '58163752': '58163736', // Nick Muszynski
    '79780744': '79778000', // Will Brown

}

const getPlayerByNatStatId = async (natStatId: string, leagueId: 'NBA' | 'GL') => {
    const natStatIdToUse = leagueId === 'NBA' ? 
        parseInt(NBA_ALTERNATE_PLAYER_ID_MAP[natStatId] ?? natStatId) : 
        parseInt(GL_ALTERNATE_PLAYER_ID_MAP[natStatId] ?? natStatId)
    const { data, error } = await supabase
        .from('players')
        .select('id, college_id, college_code')
        .eq(leagueId === 'NBA' ? 'nat_stat_id' : 'gl_nat_stat_id', natStatIdToUse)
        .single();
    if (error) {
        console.error(error, 'for player', natStatId);
        throw error;
    }
    return data;
}

const playerStatsService = {
    getPlayerStatsByIds: async (ids: number[]) => {
        const { data, error } = await supabase
          .from('player_stats')
          .select('id')
          .in('id', ids);
        
        if (error) {
          throw error;
        }
        
        return data;
      },
    getPlayerStats: async (rangeStart: number, year: number = 2025, leagueId: 'NBA' | 'GL' = 'NBA') => {
        const response = await fetch(`${process.env.NAT_STAT_API_BASE_URL}playerperfs/${leagueId}/${year}/${rangeStart}`);
        const data = await response.json() as PlayerStatsResponse;
        
        const performanceKeys = Object.keys(data.performances) as PerformanceKey[];
        const playerStatsToSave = await Promise.all(performanceKeys.map(async key => {
            const performance = data.performances[key];
            const player = await getPlayerByNatStatId(performance['player-code'], leagueId);
            if(player.id === undefined) {
                console.error('player.data?.id is undefined', performance);
                return
            }
            return {
                id: parseInt(performance.id),
                nat_stat_player_id: parseInt(NBA_ALTERNATE_PLAYER_ID_MAP[performance['player-code']] ?? performance['player-code']),
                college_id: player.college_id ?? null,
                game_id: parseInt(performance.game.code),
                game_date: performance.game.gameday,
                team_id: Object.entries(teams).find(([_key, value]) => value.natStatAbbreviation === performance.team.code && value.leagueId === (leagueId === 'NBA' ? 46 : 69))?.[0]! as unknown as number,
                opponent_id: Object.entries(teams).find(([_key, value]) => value.natStatAbbreviation === performance.opponent.code && value.leagueId === (leagueId === 'NBA' ? 46 : 69))?.[0]! as unknown as number,
                started: performance.starter === 'Y',
                minutes: parseInt(performance.min),
                points: parseInt(performance.pts),
                fg_m: parseInt(performance.fgm),
                fg_a: parseInt(performance.fga),
                three_fg_m: parseInt(performance.threefm),
                three_fg_a: parseInt(performance.threefa),
                ft_m: parseInt(performance.ftm),
                ft_a: parseInt(performance.fta),
                rebounds: parseInt(performance.reb),
                rebounds_off: parseInt(performance.oreb),
                assists: parseInt(performance.ast),
                steals: parseInt(performance.stl),
                blocks: parseInt(performance.blk),
                turnovers: parseInt(performance.to),
                fouls: parseInt(performance.pf),
                created_at: new Date().toISOString(),
                college_code: player.college_code ?? null,
                season: year,
                player_id: player.id ?? -1,
                league_id: leagueId === 'NBA' ? 46 : 69,
            };
        }));

        const sanitizedPlayerStatsToSave = playerStatsToSave.filter(e => e !== undefined).filter(playerStat => !BAD_PERF_IDS.includes(playerStat.id.toString()));

        const existingPlayerStats = await playerStatsService.getPlayerStatsByIds(sanitizedPlayerStatsToSave.map(playerStat => playerStat.id));

        const { error } = await supabase.from('player_stats').upsert(sanitizedPlayerStatsToSave);
        if (error) {
            console.error(error);
            throw error;
        }

        return {
            savedCount: sanitizedPlayerStatsToSave.length,
            existingCount: existingPlayerStats.length,
            existingIds: existingPlayerStats.map(playerStat => playerStat.id),
        }
    },
    getPlayerStatsByCollegeCodeFromDB: async (collegeCode: string, year?: number) => {
        const { data, error } = year ? 
            await supabase.from('players').select('*, player_stats(*), draft_picks(team_abbreviation, traded_to_team_abbreviation, pick_number, year)').eq('college_code', collegeCode).eq('player_stats.season', year).order('game_date', { referencedTable: 'player_stats', ascending: false }) 
            : await supabase.from('players').select('*, player_stats(*), draft_picks(team_abbreviation, traded_to_team_abbreviation, pick_number, year)').eq('college_code', collegeCode).order('game_date', { referencedTable: 'player_stats', ascending: false });
        if (error) {
            console.error(error);
            throw error;
        }
        // console.log(data)
        return data;
    },
    getPlayerStatsByIdFromDB: async (id: number) => {
        const { data, error } = await supabase.from('players').select('*, player_stats(*), draft_picks(team_abbreviation, traded_to_team_abbreviation, pick_number, year)').eq('id', id).order('game_date', { referencedTable: 'player_stats', ascending: false });
        if (error) {
            console.error(error);
            throw error;
        }
        // console.log(data)
        return data;
    }
}

export default playerStatsService;