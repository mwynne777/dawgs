/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
import { teams } from "~/app/dashboard/teams";
import { supabase } from "~/lib/initSupabase";

type PlayerKey = `player_${number}`
type SeasonKey = `season_${number}`
type SeasonTeamKey = `seasonteam_${number}-${number}`

type NatStatPlayerStats = {
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
    }
}

type NatStatPlayerResponse = {
    players: Record<PlayerKey, {
            code: string,
            name: string
            seasons: Record<SeasonKey, {
                [key in SeasonTeamKey]: {
                    stats: NatStatPlayerStats
                }
            }>
        }>
};

const playerService = {
  getPlayerFromAPI: async (playerId: number) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_NAT_STAT_API_BASE_URL}players/NBA/${playerId}`,
    );
    const natStatPlayer = (await response.json()) as NatStatPlayerResponse;
    return {id: playerId, name: natStatPlayer.players[`player_${playerId}`]?.name ?? ''};
  },
  getPlayersFromAPI: async (rangeStart: number) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_NAT_STAT_API_BASE_URL}players/NBA/${rangeStart > 0 ? `_/${rangeStart}` : ''}`,
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
        `${process.env.NEXT_PUBLIC_NAT_STAT_API_BASE_URL}players/NBA/${playerId}`,
      );
      const natStatPlayer = (await response.json()) as NatStatPlayerResponse;
      const player = natStatPlayer.players[`player_${playerId}`];
      const season = player?.seasons.season_2025;
      const natStatTeamId = teams[teamId]?.natStatId ?? 0;
      const seasonTeam = season?.[`seasonteam_${2025}-${natStatTeamId}`] 
      return seasonTeam?.stats;
  },
  getPlayerFromDB: async (player_name: string) => {
    const { data, error } = await supabase
      .from("players")
      .select("*")
      .ilike("full_name", `%${player_name}%`);
    if(data && data.length > 0) {
      return data[0];
    }
    return null;
  },
  getPlayersFromDB: async (playerNames: string[]) => {
    const likePlayerNames = playerNames.map(name => `%${name}%`);
    const { data, error } = await supabase.rpc('get_players_by_similar_name', {names: likePlayerNames});
    return data;
  },
  mapNatStatPlayerToDB: async (natStatPlayerId: number) => { 
    const natStatPlayer = await playerService.getPlayerFromAPI(natStatPlayerId);
    const playerFromDB = await playerService.getPlayerFromDB(natStatPlayer.name);
    if(playerFromDB) {
        // We found the player in the DB, so we can update the nat_stat_id
        const { data, error } = await supabase
        .from("players")
        .update({ nat_stat_id: natStatPlayerId })
        .eq("id", playerFromDB.id);
        if(error) {
            console.error(error);
        }
        return data;
    }
    console.log(`Player ${natStatPlayer.name} not found in DB, doing nothing`);
  },
  mapNatStatPlayersToDB: async (rangeStart: number) => { 
    const natStatPlayers = await playerService.getPlayersFromAPI(rangeStart);
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
        console.log(unmatchedPlayers);
        const { data, error } = await supabase
        .from("players")
        .upsert(matchedPlayers.filter(player => player !== undefined));
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
