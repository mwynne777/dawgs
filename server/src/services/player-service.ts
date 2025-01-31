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
  getPlayersFromDB: async (playerNames: string[]) => {
    const likePlayerNames = playerNames.map(name => `%${name}%`);
    const { data, error } = await supabase.rpc('get_players_by_similar_name', {names: likePlayerNames});
        return data;
  },
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
