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


export type Team = {
  id: string,
  displayName: string,
  recordSummary: string,
  standingSummary: string,
  abbreviation: string
}
export type Game = {
  id: string,
  date: Date,
  name: string,
  teamIds: [string, string],
  status: string,
  leagueId: number
}