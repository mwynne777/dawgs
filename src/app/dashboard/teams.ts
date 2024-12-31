export type TeamAbbreviation = 'no' | 'mil' | 'por' | 'sa' | 'mem' | 'bkn' | 'ima'

export const teams: Record<TeamAbbreviation, {id: number, displayName: string, leagueId: number}> = {
    // atl: 1,
    no: { id: 3, displayName: 'New Orleans Pelicans', leagueId: 46 },
    bkn: { id: 17, displayName: 'Brooklyn Nets', leagueId: 46 },
    mil: { id: 15, displayName: 'Milwaukee Bucks', leagueId: 46 },
    por: { id: 22, displayName: 'Portland Trail Blazers', leagueId: 46 },
    sa: { id: 24, displayName: 'San Antonio Spurs', leagueId: 46 },
    mem: { id: 29, displayName: 'Memphis Grizzlies', leagueId: 46 },
    ima: { id: 7, displayName: 'Indiana Mad Ants', leagueId: 69 },

} as const;

export type TeamScheduleResponse = {
  team: {
    id: string;
    displayName: string;
    recordSummary: string;
    standingSummary: string;
    abbreviation: string
  };
  events: {
    id: string;
    date: string;
    name: string;
    competitions: [{
        competitors: [{ id: string }, {id: string}]
        status: {type: {detail: string, completed: boolean}}
    }]
  }[];
};

export const getTeamSchedule = async (teamAbbrev: string) => {
  const teamUrl = `${process.env.NEXT_PUBLIC_STATS_API_BASE_URL}teams/${teamAbbrev}/schedule?region=us&lang=en&seasontype=2`;

  const response = await fetch(teamUrl);
  const responseJson = await response.json() as TeamScheduleResponse;
  const result = {
    team: {
      id: responseJson.team.id,
      displayName: responseJson.team.displayName,
      recordSummary: responseJson.team.recordSummary,
      standingSummary: responseJson.team.standingSummary,
      abbreviation: responseJson.team.abbreviation.toLowerCase()
    },
    games: responseJson.events.map((game) => ({
      id: game.id,
      date: new Date(game.date),
      name: game.name,
      teamIds: [game.competitions[0].competitors[0].id, game.competitions[0].competitors[1].id] as [string, string],
      status: game.competitions[0].status.type.completed ? 'completed': game.competitions[0].status.type.detail
    })),
  };
  return result;
};

export type TeamSchedule = Awaited<ReturnType<typeof getTeamSchedule>>;
export type Game = TeamSchedule["games"][number];
export type Team = TeamSchedule["team"];