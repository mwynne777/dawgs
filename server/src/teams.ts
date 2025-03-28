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
    31: { abbreviation: 'ark', natStatAbbreviation: 'ARK', displayName: 'Arkansas RimRockers', leagueId: 69, natStatId: 1701 },
    32: { abbreviation: 'aus', natStatAbbreviation: 'AUS', displayName: 'Austin Spurs', leagueId: 69, natStatId: 1702 },
    33: { abbreviation: 'bhm', natStatAbbreviation: 'BHM', displayName: 'Birmingham Squadron', leagueId: 69, natStatId: 16673 },
    34: { abbreviation: 'cap', natStatAbbreviation: 'CAP', displayName: 'Capital City Go-Go', leagueId: 69, natStatId: 7451 },
    35: { abbreviation: 'cle', natStatAbbreviation: 'CLE', displayName: 'Cleveland Charge', leagueId: 69, natStatId: 1703 },
    36: { abbreviation: 'cpk', natStatAbbreviation: 'CPK', displayName: 'College Park Skyhawks', leagueId: 69, natStatId: 7531 },
    37: { abbreviation: 'del', natStatAbbreviation: 'DEL', displayName: 'Delaware Blue Coats', leagueId: 69, natStatId: 1704 },
    38: { abbreviation: 'eri', natStatAbbreviation: 'ERI', displayName: 'Erie BayHawks', leagueId: 69, natStatId: 1705 },
    39: { abbreviation: 'fwf', natStatAbbreviation: 'FWF', displayName: 'Fort Worth Flyers', leagueId: 69, natStatId: 1709 },
    40: { abbreviation: 'gli', natStatAbbreviation: 'GLI', displayName: 'G League Ignite', leagueId: 69, natStatId: 1730 },
    41: { abbreviation: 'grg', natStatAbbreviation: 'GRG', displayName: 'Grand Rapids Gold', leagueId: 69, natStatId: 16674 },
    42: { abbreviation: 'gbo', natStatAbbreviation: 'GBO', displayName: 'Greensboro Swarm', leagueId: 69, natStatId: 1711 },
    43: { abbreviation: 'ind', natStatAbbreviation: 'IND', displayName: 'Indiana Mad Ants', leagueId: 69, natStatId: 1708 },
    44: { abbreviation: 'iow', natStatAbbreviation: 'IOW', displayName: 'Iowa Wolves', leagueId: 69, natStatId: 1713 },
    45: { abbreviation: 'lin', natStatAbbreviation: 'LIN', displayName: 'Long Island Nets', leagueId: 69, natStatId: 1714 },
    46: { abbreviation: 'mrc', natStatAbbreviation: 'MRC', displayName: 'Maine Celtics', leagueId: 69, natStatId: 1716 },
    47: { abbreviation: 'mem', natStatAbbreviation: 'MEM', displayName: 'Memphis Hustle', leagueId: 69, natStatId: 3673 },
    48: { abbreviation: 'mex', natStatAbbreviation: 'MEX', displayName: 'Mexico City Capitanes', leagueId: 69, natStatId: 16675 },
    49: { abbreviation: 'mcc', natStatAbbreviation: 'MCC', displayName: 'Motor City Cruise', leagueId: 69, natStatId: 1710 },
    50: { abbreviation: 'nas', natStatAbbreviation: 'NAS', displayName: 'Northern Arizona Suns', leagueId: 69, natStatId: 1718 },
    51: { abbreviation: 'okb', natStatAbbreviation: 'OKB', displayName: 'Oklahoma City Blue', leagueId: 69, natStatId: 1719 },
    52: { abbreviation: 'osc', natStatAbbreviation: 'OSC', displayName: 'Osceola Magic', leagueId: 69, natStatId: 3674 },
    53: { abbreviation: 'osr', natStatAbbreviation: '905', displayName: 'Raptors 905', leagueId: 69, natStatId: 1720 },
    54: { abbreviation: 'rgv', natStatAbbreviation: 'RGV', displayName: 'Rio Grande Valley Vipers', leagueId: 69, natStatId: 1722 },
    55: { abbreviation: 'rip', natStatAbbreviation: 'RIP', displayName: 'Rip City Remix', leagueId: 69, natStatId: 1731 },
    56: { abbreviation: 'slc', natStatAbbreviation: 'SLC', displayName: 'Salt Lake City Stars', leagueId: 69, natStatId: 1724 },
    57: { abbreviation: 'sdc', natStatAbbreviation: 'SDC', displayName: 'San Diego Clippers', leagueId: 69, natStatId: 3676 },
    58: { abbreviation: 'scw', natStatAbbreviation: 'SCW', displayName: 'Santa Cruz Warriors', leagueId: 69, natStatId: 1725 },
    59: { abbreviation: 'sfs', natStatAbbreviation: 'SFS', displayName: 'Sioux Falls Skyforce', leagueId: 69, natStatId: 1726 },
    60: { abbreviation: 'sbl', natStatAbbreviation: 'SBL', displayName: 'South Bay Lakers', leagueId: 69, natStatId: 1715 },
    61: { abbreviation: 'sto', natStatAbbreviation: 'STO', displayName: 'Stockton Kings', leagueId: 69, natStatId: 1721 },
    62: { abbreviation: 'tex', natStatAbbreviation: 'TEX', displayName: 'Texas Legends', leagueId: 69, natStatId: 1727 },
    63: { abbreviation: 'val', natStatAbbreviation: 'VAL', displayName: 'Valley Suns', leagueId: 69, natStatId: 2038901 },
    64: { abbreviation: 'wes', natStatAbbreviation: 'WES', displayName: 'Westchester Knicks', leagueId: 69, natStatId: 1728 },
    65: { abbreviation: 'wcb', natStatAbbreviation: 'WCB', displayName: 'Windy City Bulls', leagueId: 69, natStatId: 1729 },
    66: { abbreviation: 'wis', natStatAbbreviation: 'WIS', displayName: 'Wisconsin Herd', leagueId: 69, natStatId: 3675 }
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