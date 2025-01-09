import { supabase } from "~/lib/initSupabase";

type PlayerKey = `player_${number}`

type NatStatPlayerResponse = {
    players: Record<PlayerKey, {
            code: string,
            name: string
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
  }
};

export default playerService;
