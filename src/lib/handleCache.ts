import { supabase } from "./initSupabase";
import { Game } from "~/app/dashboard/teams";
import { PLAYERS } from "~/app/dashboard/players";
import { Player } from "~/app/dashboard/players";
import { getGamesByDate } from "~/app/dashboard/scoreboard";

const BOX_SCORE_BASE_URL =
  "https://site.web.api.espn.com/apis/site/v2/sports/basketball/nba/summary?region=us&lang=en&contentorigin=espn&event=";

export type GameRecord = {
    game: Game;
    players: { stats: string[]; player: Player }[];
  };

type PlayerStat = {
    player_id: number;
    game_id: number;
    stat_line: string[];
    game_date: Date;
    final: boolean;
}

export const updateCache = async (playerStats: GameRecord[]) => {
    const dataToUpsert: PlayerStat[] = []
    playerStats.forEach((playerStat) => {
        playerStat.players.forEach((player) => {
            dataToUpsert.push({
                player_id: parseInt(player.player.id),
                game_id: parseInt(playerStat.game.id),
                game_date: playerStat.game.date,
                stat_line: player.stats,
                final: playerStat.game.status === 'Final',
            })
        })
    })

    if(dataToUpsert.length === 0) {
        console.log("No data to upsert");
        return;
    }

    const { data, error } = await supabase.from('player_stats').upsert(dataToUpsert);
    if (error) {
        console.error("Error updating cache:", error);
    }
}

export const getPlayerStats = async (gameRecord: Awaited<ReturnType<typeof getGamesByDate>>[number]) => {
    const { data, error } = await supabase.from('player_stats').select('*').eq('game_id', gameRecord.id);
    if (error) {
        console.error("Error getting player stats:", error);
    }

    if(data === null || data.length === 0) {
        console.log("No player stats found in cachefor game:", gameRecord.id, 'CALLING API');
        let players: { stats: string[]; player: Player }[] = [];
        const boxScoreResponse = await fetch(
            `${BOX_SCORE_BASE_URL}${gameRecord.id}`,
        );
        const boxScoreResponseParsed = await boxScoreResponse.json();

        if (!("players" in boxScoreResponseParsed.boxscore)) return null;

        boxScoreResponseParsed.boxscore.players.forEach((element: any) => {
            const athletes = element.statistics[0].athletes;
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
        return players;
    }
    
    return data.map(r => ({
        stats: r.stat_line,
        player: PLAYERS.find((p) => p.id === r.player_id.toString())!,
    }));
}