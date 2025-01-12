import { supabase } from "./initSupabase";
import type { Game } from "~/app/dashboard/teams";
import { PLAYERS } from "~/app/dashboard/players";
import type { Player } from "~/app/dashboard/players";
import type { getGamesByDate } from "~/app/dashboard/scoreboard";
import type { Database } from "./supabase-types";

const getBoxScoreUrl = (id: string, league_id: number) => {
    return `${process.env.NEXT_PUBLIC_SERVER_BASE_URL}players?id=${id}&league_id=${league_id}`;
}

export type GameRecord = {
    game: Game;
    players: { stats: string[]; player: Player }[];
  };

export const updateCache = async (gameRecords: GameRecord[]) => {
    const dataToUpsert: Database['public']['Tables']['player_stats']['Insert'][] = []
    gameRecords.forEach((gameRecord) => {
        gameRecord.players.forEach((player) => {
            if(player.stats.length === 0) return;
            dataToUpsert.push({
                player_id: parseInt(player.player.id),
                game_id: parseInt(gameRecord.game.id),
                game_date: gameRecord.game.date.toISOString(),
                stat_line: player.stats,
                final: gameRecord.game.status.includes('Final'),
                opposing_team_id: parseInt(gameRecord.game.teamIds.find((id) => parseInt(id) !== player.player.teamId)!)
            })
        })
    })

    if(dataToUpsert.length === 0) {
        return;
    }

    const { error } = await supabase.from('player_stats').upsert(dataToUpsert);
    if (error) {
        console.error("Error updating cache:", error);
    }
}

export const getPlayerStats = async (gameRecord: Awaited<ReturnType<typeof getGamesByDate>>[number]) => {
    const { data, error } = await supabase.from('player_stats').select('*').eq('game_id', gameRecord.id);
    if (error) {
        console.error("Error getting player stats:", error);
    }

    if(data === null || data.length === 0 || data.filter((r) => !r.final).length !== 0) {
        const playersResponse = await fetch(getBoxScoreUrl(gameRecord.id, gameRecord.leagueId));
        const players = await playersResponse.json() as { stats: string[]; player: Player }[];
        
        void updateCache([{ game: gameRecord, players }]);
        return players;
    }
    
    return data.map(r => ({
        stats: r.stat_line,
        player: PLAYERS.find((p) => p.id === r.player_id.toString())!,
    }));
}