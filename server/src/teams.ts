export type TeamAbbreviation = 'no' | 'mil' | 'por' | 'sa' | 'mem' | 'bkn'

export const teams: Record<number, {abbreviation: string, natStatAbbreviation: string, displayName: string, leagueId: number, natStatId: number}> = {
    1: {abbreviation: 'atl', natStatAbbreviation: 'ATL', displayName: 'Atlanta Hawks', leagueId: 46, natStatId: 6 },
    2: {abbreviation: 'bos', natStatAbbreviation: 'BOS', displayName: 'Boston Celtics', leagueId: 46, natStatId: 5 },
    3: { abbreviation: 'no', natStatAbbreviation: 'NOP', displayName: 'New Orleans Pelicans', leagueId: 46, natStatId: 38 },
    4: { abbreviation: 'chi', natStatAbbreviation: 'CHI', displayName: 'Chicago Bulls', leagueId: 46, natStatId: 8 },
    5: { abbreviation: 'cle', natStatAbbreviation: 'CLE', displayName: 'Cleveland Cavaliers', leagueId: 46, natStatId: 9 },
    6: {abbreviation: 'dal', natStatAbbreviation: 'DAL', displayName: 'Dallas Mavericks', leagueId: 46, natStatId: 23 },
    7: { abbreviation: 'den', natStatAbbreviation: 'DEN', displayName: 'Denver Nuggets', leagueId: 46, natStatId: 24 },
    8: { abbreviation: 'det', natStatAbbreviation: 'DET', displayName: 'Detroit Pistons', leagueId: 46, natStatId: 22 },
    9: { abbreviation: 'gsw', natStatAbbreviation: 'GSW', displayName: 'Golden State Warriors', leagueId: 46, natStatId: 25 },
    10: {abbreviation: 'hou', natStatAbbreviation: 'HOU', displayName: 'Houston Rockets', leagueId: 46, natStatId: 1 },
    11: { abbreviation: 'ind', natStatAbbreviation: 'IND', displayName: 'Indiana Pacers', leagueId: 46, natStatId: 18 },
    12: {abbreviation: 'lac', natStatAbbreviation: 'LAC', displayName: 'Los Angeles Clippers', leagueId: 46, natStatId: 11 },
    13: { abbreviation: 'lal', natStatAbbreviation: 'LAL', displayName: 'Los Angeles Lakers', leagueId: 46, natStatId: 27 },
    14: {abbreviation: 'mia', natStatAbbreviation: 'MIA', displayName: 'Miami Heat', leagueId: 46, natStatId: 16 },
    15: { abbreviation: 'mil', natStatAbbreviation: 'MIL', displayName: 'Milwaukee Bucks', leagueId: 46, natStatId: 7 },
    16: { abbreviation: 'min', natStatAbbreviation: 'MIN', displayName: 'Minnesota Timberwolves', leagueId: 46, natStatId: 2 },
    17: { abbreviation: 'bkn', natStatAbbreviation: 'BRK', displayName: 'Brooklyn Nets', leagueId: 46, natStatId: 36 },
    18: {abbreviation: 'nyk', natStatAbbreviation: 'NYK', displayName: 'New York Knicks', leagueId: 46, natStatId: 21 },
    19: {abbreviation: 'orl', natStatAbbreviation: 'ORL', displayName: 'Orlando Magic', leagueId: 46, natStatId: 13 },
    20: {abbreviation: 'phi', natStatAbbreviation: 'PHI', displayName: 'Philadelphia 76ers', leagueId: 46, natStatId: 28 },
    21: { abbreviation: 'phx', natStatAbbreviation: 'PHO', displayName: 'Phoenix Suns', leagueId: 46, natStatId: 14 },
    22: { abbreviation: 'por', natStatAbbreviation: 'POR', displayName: 'Portland Trail Blazers', leagueId: 46, natStatId: 4 },
    23: { abbreviation: 'sac', natStatAbbreviation: 'SAC', displayName: 'Sacramento Kings', leagueId: 46, natStatId: 15 },
    24: { abbreviation: 'sa', natStatAbbreviation: 'SAS', displayName: 'San Antonio Spurs', leagueId: 46, natStatId: 17 },
    25: { abbreviation: 'okc', natStatAbbreviation: 'OKC', displayName: 'Oklahoma City Thunder', leagueId: 46, natStatId: 35 },
    26: { abbreviation: 'utah', natStatAbbreviation: 'UTA', displayName: 'Utah Jazz', leagueId: 46, natStatId: 26 },
    27: {abbreviation: 'wsh', natStatAbbreviation: 'WAS', displayName: 'Washington Wizards', leagueId: 46, natStatId: 20 },
    28: { abbreviation: 'tor', natStatAbbreviation: 'TOR', displayName: 'Toronto Raptors', leagueId: 46, natStatId: 10 },
    29: { abbreviation: 'mem', natStatAbbreviation: 'MEM', displayName: 'Memphis Grizzlies', leagueId: 46, natStatId: 31 },
    30: {abbreviation: 'cha', natStatAbbreviation: 'CHH', displayName: 'Charlotte Hornets', leagueId: 46, natStatId: 3 },

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