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

const BAD_PERF_IDS = ['12186469', '12155870', '12155536', '12154957', '12154658', '12193210']

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
    getPlayerStats: async (rangeStart: number) => {
        const response = await fetch(`${process.env.NAT_STAT_API_BASE_URL}playerperfs/nba/2025/${rangeStart}`);
        const data = await response.json() as PlayerStatsResponse;
        
        const performanceKeys = Object.keys(data.performances) as PerformanceKey[];
        const playerStatsToSave = await Promise.all(performanceKeys.map(async key => {
            const college = await supabase.from('players').select('college_id, college_code').eq('nat_stat_id', parseInt(data.performances[key]['player-code'])).single();
            const performance = data.performances[key];
            return {
                id: parseInt(performance.id),
                nat_stat_player_id: parseInt(performance['player-code']),
                college_id: college.data?.college_id ?? null,
                game_id: parseInt(performance.game.code),
                game_date: performance.game.gameday,
                team_id: Object.entries(teams).find(([_key, value]) => value.natStatAbbreviation === performance.team.code)?.[0]! as unknown as number,
                opponent_id: Object.entries(teams).find(([_key, value]) => value.natStatAbbreviation === performance.opponent.code)?.[0]! as unknown as number,
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
                college_code: college.data?.college_code ?? null,
            };
        }));

        const sanitizedPlayerStatsToSave = playerStatsToSave.filter(playerStat => !BAD_PERF_IDS.includes(playerStat.id.toString()));

        const existingPlayerStats = await playerStatsService.getPlayerStatsByIds(sanitizedPlayerStatsToSave.map(playerStat => playerStat.id));

        // console.log(`${existingPlayerStats.length} existing player stats, ${JSON.stringify(existingPlayerStats)}`);

        const { error } = await supabase.from('player_stats').upsert(sanitizedPlayerStatsToSave);
        if (error) {
            console.error(error);
            throw error;
        }
        console.log(sanitizedPlayerStatsToSave.length, 'player stats saved');

        return {
            savedCount: sanitizedPlayerStatsToSave.length,
            existingCount: existingPlayerStats.length,
            existingIds: existingPlayerStats.map(playerStat => playerStat.id),
        }
    },
    getPlayerStatsByCollegeCodeFromDB: async (collegeCode: string) => {
        const { data, error } = await supabase.from('player_stats').select('*, players(*)').eq('college_code', collegeCode).order('game_date', { ascending: false });
        if (error) {
            throw error;
        }
        return data;
    }
}

export default playerStatsService;