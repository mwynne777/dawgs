import { supabase } from '../initSupabase';
import { teams } from '../teams';

type PerformanceKey = `performance_${number}`

type PlayerStatsResponse = {
  performances: Record<PerformanceKey, {
    id: string,
    player: string,
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
    '12234587', // Damion Baugh
    '12251132',
    '12225124'
]

const NBA_ALTERNATE_PLAYER_ID_MAP: Record<string, string> = {
    '538727': '3134324', // Daniel Theis
    '52566256': '58075620', // Kobe Bufkin
    '54022359': '58076129', // Mason Jones
    '56876648': '58119281', // Jaylen Nowell
    // '0': '40737320', // David Duke, but probably need to comment out
    '74847619': '58320784', // Terrence Shannon Jr.
    '75526696': '68666972', // DaRon Holmes II
    '76273415': '329856', // Markelle Fultz
    '80411197': '1251771', // Jalen McDaniels
    '53469389': '62965654', // Tosan Evbuomwan
    '52566284': '58310626', // Isaiah Wong
    '55530131': '55531829', // Wenyen Gabriel,
    '54708117': '54710299', // Darius Bazley
    // '0': '-1', // Charlie Brown - comment this out!
    '53961452': '53962656', // Ashton Hagans
    '52851934': '52851950', // Dmytro Skapintsev
    '52566294': '52833056', // GG Jackson II
    '49315832': '55842335', // Jamaree Bouyea
    // '0': '-2', // John Butler - comment this out!
    '3134547': '329842', // Bam Adebayo
    '3134549': '549', // Jimmy Butler
    '3134559': '664841', // Duncan Robinson
    '1853': '3134438', // Reggie Jackson
    '4055': '55475784', // TJ Warren
    '586': '58075029', // Clint Capela
    '58075621': '58075029', // Clint Capela
    '538998': '58075027', // Bogdan Bogdanovic
    '58075619': '58075027', // Bogdan Bogdanovic
    // '0': '538832', // PJ Dozier - comment this out!
    '47882203': '55842499', // Raiquan Gray
    // '0': '47267171', // Christian Koloko - comment this out!
    '47882279': '58075026', // Dominick Barlow
    '58075618': '58075026', // Dominick Barlow
    '47882218': '57168960', // Jack White
    '58075668': '47267106', // Tyrese Martin
    '52851533': '10021549', // Vit Krejci
    '52918618': '47882242', // Scotty Pippen Jr.
    '54714878': '40722979', // Justin Champagnie
    '55842554': '47882291', // Quenton Jackson
    '56322809': '1683108', // Javonte Green
    '58075879': '119696', // Derrick Jones Jr.
    '55926197': '40722905', // Kai Jones
}

const GL_ALTERNATE_PLAYER_ID_MAP: Record<string, string> = {
    '58269444': '58269397', // Cormac Ryan
    '65574961': '65562216', // Jordan Wright
    '58269514': '58269446', // Shakur Daniel
    '73500987': '73500950', // Olisa Akonobi
    '58163752': '58163736', // Nick Muszynski
    '79780744': '79778000', // Will Brown

}

const PERFORMANCE_ID_TO_NAT_STAT_ID_MAP: Record<string, string> = {
    '11986342': '47267171', // Christian Koloko
    '11985226': '47267171', // Christian Koloko
    '11984960': '47267171', // Christian Koloko
    '11986458': '538832', // PJ Dozier
    '11985657': '538832', // PJ Dozier
    '11985129': '538832', // PJ Dozier
    '11985606': '-2', // John Butler
    '11985275': '-2', // John Butler
    '12251132': '52788300', // Jaylen Martin
}

const ALTERNATE_PLAYER_NAME_MAP: Record<string, string> = {
    'Trey Murphy': 'Trey Murphy III',
    'David Duke': 'David Duke Jr.',
    'TJ McConnell': 'T.J. McConnell',
    'Craig Porter': 'Craig Porter Jr.',
    'Clayton Carrington': 'Bub Carrington',
    'Jaren Jackson': 'Jaren Jackson Jr.',
    'Nick Smith': 'Nick Smith Jr.',
    'Alex Sarr': 'Alexandre Sarr',
    'Tim Hardaway Jr': 'Tim Hardaway Jr.',
    'Gary Payton': 'Gary Payton II',
    'Jabari Smith': 'Jabari Smith Jr.',
    'Jeff Dowtin': 'Jeff Dowtin Jr.',
    'Ricky Council': 'Ricky Council IV',
    "Jae'sean Tate": "Jae'Sean Tate",
    'Vincent Williams': 'Vince Williams Jr.',
    'Michael Porter': 'Michael Porter Jr.',
    'Wendell Carter': 'Wendell Carter Jr.',
    'Scotty Pippen': 'Scotty Pippen Jr.',
    'Ronald Holland': 'Ronald Holland II',
    'Lindy Waters': 'Lindy Waters III',
    'Trey Jemison': 'Trey Jemison III',
    'PJ Washington': 'P.J. Washington',
    'Kelly Oubre': 'Kelly Oubre Jr.',
    'Terrence Shannon': 'Terrence Shannon Jr.',
    'Kevin Porter': 'Kevin Porter Jr.',
    'Gary Trent': 'Gary Trent Jr.',
    'Derrick Jones': 'Derrick Jones Jr.',
    'Jaime Jaquez': 'Jaime Jaquez Jr.',
    'TyTy Washington': 'TyTy Washington Jr.',
    'Wendell Moore': 'Wendell Moore Jr.',
    'Andre Jackson': 'Andre Jackson Jr.',
    'Marvin Bagley': 'Marvin Bagley III',
    'Robert Williams': 'Robert Williams III',
    'DaRon Holmes': 'Elijah Harkless', // This is crazy...
    'Larry Nance': 'Larry Nance Jr.',
    'Keion Brooks': 'Keion Brooks Jr.',
    'Patrick Baldwin': 'Patrick Baldwin Jr.',
    'Dereck Lively': 'Dereck Lively II',
    'Herb Jones': 'Herbert Jones',
    'EJ Liddell': 'E.J. Liddell',
    'DJ Carton': 'D.J. Carton',
    'E.J. Harkless': 'Elijah Harkless',
    'Ron Harper': 'Ron Harper Jr.',
    'K.J. Simpson': 'KJ Simpson',
    'D.J. Steward': 'DJ Steward',
    'K.J. Jones': 'K.J. Jones II',
    'Dwight Murray': 'Dwight Murray Jr.',
    'Jameer Nelson': 'Jameer Nelson Jr.',
    'Cameron Christie': 'Cam Christie',
    'Mohamed Bamba': 'Mo Bamba',
    'Dyson Disu': 'Dylan Disu',
    'G.G. Jackson': 'GG Jackson',
    'Cui Yongxi': 'Yongxi Cui',
    'D.J. Rodman, Jr.': 'D.J. Rodman',
    'Keion Brooks, Jr.': 'Keion Brooks Jr.',
    'Jameer Nelson, Jr.': 'Jameer Nelson Jr.',
    'Dwight Murray, Jr.': 'Dwight Murray Jr.',
    'BJ Boston': 'Brandon Boston',
    'Moe Wagner': 'Moritz Wagner',
}

const getPlayerByName = async (name: string) => {
    const nameToSearchBy = ALTERNATE_PLAYER_NAME_MAP[name] ?? name;

    const { data, error } = await supabase
        .from('players')
        .select('id, college_id, college_code')
        .ilike('full_name', `%${nameToSearchBy}%`)
        .single();
    if (error) {
        console.error(error, 'for player', name);
        throw error;
    }
    return data;
}

const playerStatsService = {
    getPlayerStatsByIds: async (ids: number[], tableToUpsert: 'player_stats' | 'previous_season_player_stats' = 'player_stats') => {
        const { data, error } = await supabase
          .from(tableToUpsert)
          .select('id, league_id')
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
            const player = await getPlayerByName(performance['player']);
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

        const tableToUpsert = year === 2025 ? 'player_stats' : 'previous_season_player_stats';

        const existingPlayerStats = await playerStatsService.getPlayerStatsByIds(sanitizedPlayerStatsToSave.map(playerStat => playerStat.id), tableToUpsert);

        const problematicExistingRecords = existingPlayerStats.filter(playerStat => {
            const sanitizedPlayerStat = sanitizedPlayerStatsToSave.find(stat => stat.id === playerStat.id);
            return sanitizedPlayerStat?.league_id !== playerStat.league_id
        });

        if(problematicExistingRecords.length > 0) {
            console.error('problematicExistingRecords', problematicExistingRecords);
            throw new Error('Problematic existing records');
        }

        const { error } = await supabase.from(tableToUpsert).upsert(sanitizedPlayerStatsToSave);
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
    },
    getPlayerTotals: async (collegeCode: string) => {
        const { data, error } = await supabase.from('player_season_totals_with_details').select('*').eq('college_code', collegeCode).order('points', { ascending: false });
        
        console.log('data', data);
        
        if (error) {
            console.error(error);
            throw error;
        }
        return data;
    }
}

export default playerStatsService;