/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
import { supabase } from "../initSupabase";
import { teams } from "../teams";

type PlayerKey = `player_${number}`
type SeasonKey = `season_${number}`
type SeasonTeamKey = `seasonteam_${number}-${number}`
type GameKey = `game_${number}`

export type NatStatPlayerStats = {
    stat_min: {
        value: string
    },
    stat_pts: {
        value: string
    },
    stat_mpg: {
        value: string
    },
    stat_ppg: {
        value: string
    },
    stat_rpg: {
        value: string
    },
    stat_apg: {
        value: string
    },
    stat_g: {
        value: string
    },
    stat_gs: {
        value: string
    }
}

type NatStatPlayerPerfs = {
    "id": string,
    "game-code": string,
    "gameday": string,
    "opponent": string,
    "opponent-team-code": string,
    "winorloss": string,
    "result": string,
    "statline": string
}

type NatStatPlayerResponse = {
    players: Record<PlayerKey, {
            code: string,
            name: string
            seasons?: Record<SeasonKey, {
                [key in SeasonTeamKey]: {
                    stats: NatStatPlayerStats
                    playerperfs?: Record<GameKey, NatStatPlayerPerfs>
                }
            }>
        }>
};

const getMostRecentStatLines = (playerPerfs: Record<GameKey, NatStatPlayerPerfs>) => {
    const fiveMostRecent = Object.values(playerPerfs).sort((a, b) => new Date(b.gameday).getTime() - new Date(a.gameday).getTime()).slice(0, 5);
    return fiveMostRecent.map(perf => {
        const stats = perf.statline.split(' ').reduce((acc, stat) => {
            const value = stat.slice(0, -1); // Remove last character
            if (stat.endsWith('m')) acc.min = value;
            if (stat.endsWith('p')) acc.pts = value;
            if (stat.endsWith('r')) acc.reb = value;
            if (stat.endsWith('a')) acc.ast = value;
            if (stat.endsWith('b')) acc.blk = value;
            return acc;
        }, { min: '0', pts: '0', reb: '0', ast: '0', blk: '0' });

        return {
            ...perf, 
            statline: [stats.min, undefined, undefined, undefined, undefined, undefined, stats.reb, stats.ast, undefined, stats.blk, undefined, undefined, undefined, stats.pts]
        };
    });
}

const playerService = {
  getPlayerFromAPI: async (playerId: number) => {
    const response = await fetch(
      `${process.env.NAT_STAT_API_BASE_URL}players/NBA/${playerId}`,
    );
    const natStatPlayer = (await response.json()) as NatStatPlayerResponse;
    return {id: playerId, name: natStatPlayer.players[`player_${playerId}`]?.name ?? ''};
  },
  getPlayersFromAPI: async (rangeStart: number, year: number = 2025) => {
    const response = await fetch(
      `${process.env.NAT_STAT_API_BASE_URL}players/NBA/${year}/${rangeStart > 0 ? `${rangeStart}` : ''}`,
    );
    const natStatPlayer = (await response.json()) as NatStatPlayerResponse;
    const players = Object.values(natStatPlayer.players);
    const realPlayers = players.map(player => {
        if('code' in player) {
            return player;
        }
        if(Array.isArray(player)) {
            return player[0];
        }
        return null;
    });
    return realPlayers.filter(player => player !== null);
  },
  getPlayerStatsFromAPI: async (playerId: number, teamId: number) => {
    const response = await fetch(
        `${process.env.NAT_STAT_API_BASE_URL}players/NBA/${playerId}`,
    );
    const natStatPlayer = (await response.json()) as NatStatPlayerResponse;
    const player = natStatPlayer.players[`player_${playerId}`];
    const season = player?.seasons?.season_2025;
    const natStatTeamId = teams[teamId]?.natStatId ?? 0;
    const seasonTeam = season?.[`seasonteam_${2025}-${natStatTeamId}`] 
    const statLines = getMostRecentStatLines(seasonTeam?.playerperfs ?? {});
    const lastSeenDate = statLines[0]?.gameday;
    return {
        stats: {
            stat_min: seasonTeam?.stats.stat_min, 
            stat_pts: seasonTeam?.stats.stat_pts, 
            stat_mpg: seasonTeam?.stats.stat_mpg, 
            stat_ppg: seasonTeam?.stats.stat_ppg, 
            stat_rpg: seasonTeam?.stats.stat_rpg, 
            stat_apg: seasonTeam?.stats.stat_apg,
            stat_g: seasonTeam?.stats.stat_g,
            stat_gs: seasonTeam?.stats.stat_gs
        },
        playerPerfs: statLines,
        lastSeenDate
    };
  },
//   getPlayerFromDB: async (player_name: string) => {
//     const { data, error } = await supabase
//       .from("players")
//       .select("*")
//       .ilike("full_name", `%${player_name}%`);
//     if(data && data.length > 0) {
//       return data[0];
//     }
//     return null;
//   },
    getPlayersFromDB: async (playerNames: string[]) => {
        const likePlayerNames = playerNames.map(name => `%${name}%`);
        const { data, error } = await supabase.rpc('get_players_by_similar_name', {names: likePlayerNames});
        return data;
    },
//   mapNatStatPlayerToDB: async (natStatPlayerId: number) => { 
//     const natStatPlayer = await playerService.getPlayerFromAPI(natStatPlayerId);
//     const playerFromDB = await playerService.getPlayerFromDB(natStatPlayer.name);
//     if(playerFromDB) {
//         // We found the player in the DB, so we can update the nat_stat_id
//         const { data, error } = await supabase
//         .from("players")
//         .update({ nat_stat_id: natStatPlayerId })
//         .eq("id", playerFromDB.id);
//         if(error) {
//             console.error(error);
//         }
//         return data;
//     }
//     console.log(`Player ${natStatPlayer.name} not found in DB, doing nothing`);
//   },
  mapNatStatPlayersToDB: async (rangeStart: number, year: number = 2025) => {
    const natStatPlayers = await playerService.getPlayersFromAPI(rangeStart, year);
    const natStatPlayerNames = natStatPlayers.map(player => player.name);
    const playersFromDB = await playerService.getPlayersFromDB(natStatPlayerNames);
    if(playersFromDB) {
        // We found some players in the DB, so we can update the nat_stat_id
        const matchedPlayers = playersFromDB.map(player => {
            const natStatPlayer = natStatPlayers.find(nsp => player.full_name.includes(nsp.name));
            if(natStatPlayer) {
                return { 
                    ...player,
                    nat_stat_id: parseInt(natStatPlayer.code)
                }
            }
        })
        const unmatchedPlayers = natStatPlayers.filter(player => !playersFromDB.some(p => p.full_name.includes(player.name)));

        console.log(`Found ${playersFromDB.length} of ${natStatPlayers.length} players in the DB, unmatched players:`);
        console.log('unmatchedPlayers', unmatchedPlayers);

        const unmatchedPlayersToInsert = unmatchedPlayers.map(player => ({
            full_name: player.name,
            nat_stat_id: parseInt(player.code),

        }));
        
        const { data, error } = await supabase
        .from("players")
        .upsert(unmatchedPlayersToInsert.filter(player => player !== undefined));

        if(error) {
            console.error(error);
        }
        return data;
    } else {
        console.log(`No players found in the DB`);
    }
    // console.log(`Player ${natStatPlayer.name} not found in DB, doing nothing`);
  }
};

export default playerService;
