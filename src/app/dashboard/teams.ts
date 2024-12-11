export type TeamAbbreviation = 'no' | 'mil' | 'por' | 'sa' | 'mem' | 'bkn'

export const teams: Record<TeamAbbreviation, number> = {
    // atl: 1,
    no: 3,
    bkn: 17,
    mil: 15,
    por: 22,
    sa: 24,
    mem: 29,
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
  const teamUrl = `https://site.web.api.espn.com/apis/site/v2/sports/basketball/nba/teams/${teamAbbrev}/schedule?region=us&lang=en&seasontype=2`;

  const response = await fetch(teamUrl);
  const responseJson: TeamScheduleResponse = await response.json();
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