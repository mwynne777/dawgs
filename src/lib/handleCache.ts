import { supabase } from "./initSupabase";
import type { Game } from "~/app/dashboard/teams";
import { PLAYERS } from "~/app/dashboard/players";
import type { Player } from "~/app/dashboard/players";
import type { getGamesByDate } from "~/app/dashboard/scoreboard";
import type { Database } from "./supabase-types";
import { leagues } from "~/app/dashboard/leagues";

const getBoxScoreUrl = (leagueAbbreviation: string, gameId: string) => {
return `${process.env.NEXT_PUBLIC_STATS_API_BASE_URL}${leagueAbbreviation}/summary?region=us&lang=en&contentorigin=espn&event=${gameId}`;
}

export type GameRecord = {
    game: Game;
    players: { stats: string[]; player: Player }[];
  };

export const updateCache = async (gameRecords: GameRecord[]) => {
    const dataToUpsert: Database['public']['Tables']['player_stats']['Insert'][] = []
    gameRecords.forEach((gameRecord) => {
        gameRecord.players.forEach((player) => {
            dataToUpsert.push({
                player_id: parseInt(player.player.id),
                game_id: parseInt(gameRecord.game.id),
                game_date: gameRecord.game.date.toISOString(),
                stat_line: player.stats,
                final: gameRecord.game.status.includes('Final'),
            })
        })
    })

    if(dataToUpsert.length === 0) {
        console.log("No data to upsert");
        return;
    }

    const { error } = await supabase.from('player_stats').upsert(dataToUpsert);
    if (error) {
        console.error("Error updating cache:", error);
    }
}

type BoxScoreStatistic = {
    athletes: { athlete: { id: string }; stats: string[] }[]
}

type BoxscoreResponse = {
    boxscore: {
        players: {
            statistics: BoxScoreStatistic[]
        }[]
    }
}

export const getPlayerStats = async (gameRecord: Awaited<ReturnType<typeof getGamesByDate>>[number]) => {
    const { data, error } = await supabase.from('player_stats').select('*').eq('game_id', gameRecord.id);
    if (error) {
        console.error("Error getting player stats:", error);
    }

    if(data === null || data.length === 0 || data.filter((r) => !r.final).length !== 0) {
        const players: { stats: string[]; player: Player }[] = [];
        const leagueAbbreviation = Object.entries(leagues).find(([_, value]) => value.id === gameRecord.leagueId)?.[0];
        if(!leagueAbbreviation) return [];
        const boxScoreResponse = await fetch(
            `${getBoxScoreUrl(leagueAbbreviation, gameRecord.id)}`,
        );
        const boxScoreResponseParsed = await boxScoreResponse.json() as BoxscoreResponse;

        if (!("players" in boxScoreResponseParsed.boxscore)) return [];

        boxScoreResponseParsed.boxscore.players.forEach((element) => {
            const athletes = element.statistics[0]!.athletes;
            const uconnPlayerIds = Object.values(PLAYERS).map((p) => p.id);
            const athletesOfInterest = athletes.filter(
                (a: { athlete: { id: string } }) =>
                uconnPlayerIds.includes(a.athlete.id),
            );
            athletesOfInterest.forEach(
                (a: { athlete: { id: string }; stats: string[] }) => {
                players.push({
                    stats: a.stats,
                    player: PLAYERS.find((p) => p.id === a.athlete.id)!,
                });
            },
        );
    });
        void updateCache([{ game: gameRecord, players }]);
        return players;
    }
    
    return data.map(r => ({
        stats: r.stat_line,
        player: PLAYERS.find((p) => p.id === r.player_id.toString())!,
    }));
}