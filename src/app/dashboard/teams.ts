export type TeamAbbreviation = 'no' | 'mil' | 'por' | 'sa' | 'mem' | 'bkn'

export const teams: Record<number, {abbreviation: string, displayName: string, leagueId: number}> = {
    1: {abbreviation: 'atl', displayName: 'Atlanta Hawks', leagueId: 46 },
    2: {abbreviation: 'bos', displayName: 'Boston Celtics', leagueId: 46 },
    3: { abbreviation: 'no', displayName: 'New Orleans Pelicans', leagueId: 46 },
    4: { abbreviation: 'chi', displayName: 'Chicago Bulls', leagueId: 46 },
    5: { abbreviation: 'cle', displayName: 'Cleveland Cavaliers', leagueId: 46 },
    6: {abbreviation: 'dal', displayName: 'Dallas Mavericks', leagueId: 46 },
    7: { abbreviation: 'den', displayName: 'Denver Nuggets', leagueId: 46 },
    8: { abbreviation: 'det', displayName: 'Detroit Pistons', leagueId: 46 },
    9: { abbreviation: 'gsw', displayName: 'Golden State Warriors', leagueId: 46 },
    10: {abbreviation: 'hou', displayName: 'Houston Rockets', leagueId: 46 },
    11: { abbreviation: 'ind', displayName: 'Indiana Pacers', leagueId: 46 },
    12: {abbreviation: 'lac', displayName: 'Los Angeles Clippers', leagueId: 46 },
    13: { abbreviation: 'lal', displayName: 'Los Angeles Lakers', leagueId: 46 },
    14: {abbreviation: 'mia', displayName: 'Miami Heat', leagueId: 46 },
    15: { abbreviation: 'mil', displayName: 'Milwaukee Bucks', leagueId: 46 },
    16: { abbreviation: 'min', displayName: 'Minnesota Timberwolves', leagueId: 46 },
    17: { abbreviation: 'bkn', displayName: 'Brooklyn Nets', leagueId: 46 },
    18: {abbreviation: 'nyk', displayName: 'New York Knicks', leagueId: 46 },
    19: {abbreviation: 'orl', displayName: 'Orlando Magic', leagueId: 46 },
    20: {abbreviation: 'phi', displayName: 'Philadelphia 76ers', leagueId: 46 },
    21: { abbreviation: 'phx', displayName: 'Phoenix Suns', leagueId: 46 },
    22: { abbreviation: 'por', displayName: 'Portland Trail Blazers', leagueId: 46 },
    23: { abbreviation: 'sac', displayName: 'Sacramento Kings', leagueId: 46 },
    24: { abbreviation: 'sa', displayName: 'San Antonio Spurs', leagueId: 46 },
    25: { abbreviation: 'okc', displayName: 'Oklahoma City Thunder', leagueId: 46 },
    26: { abbreviation: 'utah', displayName: 'Utah Jazz', leagueId: 46 },
    27: {abbreviation: 'wsh', displayName: 'Washington Wizards', leagueId: 46 },
    28: { abbreviation: 'tor', displayName: 'Toronto Raptors', leagueId: 46 },
    29: { abbreviation: 'mem', displayName: 'Memphis Grizzlies', leagueId: 46 },
    30: {abbreviation: 'cha', displayName: 'Charlotte Hornets', leagueId: 46 },

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