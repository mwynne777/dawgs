export type TeamAbbreviation = 'no' | 'mil' | 'por' | 'sa' | 'mem' | 'bkn'

export const teams: Record<number, {abbreviation: string, displayName: string, leagueId: number, natStatId: number, color: string, affiliateCode?: string}> = {
    1: {abbreviation: 'atl', displayName: 'Atlanta Hawks', leagueId: 46, natStatId: 6, color: '#C8102E' },
    2: {abbreviation: 'bos', displayName: 'Boston Celtics', leagueId: 46, natStatId: 5, color: '#007A33' },
    3: { abbreviation: 'no', displayName: 'New Orleans Pelicans', leagueId: 46, natStatId: 38, color: '#0C2340' },
    4: { abbreviation: 'chi', displayName: 'Chicago Bulls', leagueId: 46, natStatId: 8, color: '#CE1141' },
    5: { abbreviation: 'cle', displayName: 'Cleveland Cavaliers', leagueId: 46, natStatId: 9, color: '#860038' },
    6: {abbreviation: 'dal', displayName: 'Dallas Mavericks', leagueId: 46, natStatId: 23, color: '#00538C' },
    7: { abbreviation: 'den', displayName: 'Denver Nuggets', leagueId: 46, natStatId: 24, color: '#0E2240' },
    8: { abbreviation: 'det', displayName: 'Detroit Pistons', leagueId: 46, natStatId: 22, color: '#C8102E' },
    9: { abbreviation: 'gsw', displayName: 'Golden State Warriors', leagueId: 46, natStatId: 25, color: '#1D428A' },
    10: {abbreviation: 'hou', displayName: 'Houston Rockets', leagueId: 46, natStatId: 1, color: '#CE1141' },
    11: { abbreviation: 'ind', displayName: 'Indiana Pacers', leagueId: 46, natStatId: 18, color: '#002D62' },
    12: {abbreviation: 'lac', displayName: 'Los Angeles Clippers', leagueId: 46, natStatId: 11, color: '#c8102E' },
    13: { abbreviation: 'lal', displayName: 'Los Angeles Lakers', leagueId: 46, natStatId: 27, color: '#552583'},
    14: {abbreviation: 'mia', displayName: 'Miami Heat', leagueId: 46, natStatId: 16, color: '#98002E' },
    15: { abbreviation: 'mil', displayName: 'Milwaukee Bucks', leagueId: 46, natStatId: 7, color: '#00471B'},
    16: { abbreviation: 'min', displayName: 'Minnesota Timberwolves', leagueId: 46, natStatId: 2, color: '#0C2340'},
    17: { abbreviation: 'bkn', displayName: 'Brooklyn Nets', leagueId: 46, natStatId: 36, color: '#000000'},
    18: {abbreviation: 'nyk', displayName: 'New York Knicks', leagueId: 46, natStatId: 21, color: '#006BB6' },
    19: {abbreviation: 'orl', displayName: 'Orlando Magic', leagueId: 46, natStatId: 13, color: '#0077c0' },
    20: {abbreviation: 'phi', displayName: 'Philadelphia 76ers', leagueId: 46, natStatId: 28, color: '#006bb6' },
    21: { abbreviation: 'phx', displayName: 'Phoenix Suns', leagueId: 46, natStatId: 14, color: '#1D1160' },
    22: { abbreviation: 'por', displayName: 'Portland Trail Blazers', leagueId: 46, natStatId: 4, color: '#E03A3E' },
    23: { abbreviation: 'sac', displayName: 'Sacramento Kings', leagueId: 46, natStatId: 15, color: '#5a2d81' },
    24: { abbreviation: 'sa', displayName: 'San Antonio Spurs', leagueId: 46, natStatId: 17, color: '#000000'},
    25: { abbreviation: 'okc', displayName: 'Oklahoma City Thunder', leagueId: 46, natStatId: 35, color: '#007ac1' },
    26: { abbreviation: 'utah', displayName: 'Utah Jazz', leagueId: 46, natStatId: 26, color: '#002B5C' },
    27: {abbreviation: 'wsh', displayName: 'Washington Wizards', leagueId: 46, natStatId: 20, color: '#002B5C' },
    28: { abbreviation: 'tor', displayName: 'Toronto Raptors', leagueId: 46, natStatId: 10, color: '#CE1141' },
    29: { abbreviation: 'mem', displayName: 'Memphis Grizzlies', leagueId: 46, natStatId: 31, color: '#5D76A9' },
    30: {abbreviation: 'cha', displayName: 'Charlotte Hornets', leagueId: 46, natStatId: 3, color: '#1d1160' },
    // Arkansas RimRockers
    32: { abbreviation: 'aus', displayName: 'Austin Spurs', leagueId: 69, natStatId: 1702, color: '#000000', affiliateCode: 'sa'},
    33: { abbreviation: 'bhm', displayName: 'Birmingham Squadron', leagueId: 69, natStatId: 16673, color: '#0C2340', affiliateCode: 'no'},
    34: { abbreviation: 'cap', displayName: 'Capital City Go-Go', leagueId: 69, natStatId: 7451, color: '#002B5C', affiliateCode: 'wsh' },
    35: { abbreviation: 'cle', displayName: 'Cleveland Charge', leagueId: 69, natStatId: 1703, color: '#860038', affiliateCode: 'cle' },
    36: { abbreviation: 'cpk', displayName: 'College Park Skyhawks', leagueId: 69, natStatId: 7531, color: '#C8102E', affiliateCode: 'atl' },
    37: { abbreviation: 'del', displayName: 'Delaware Blue Coats', leagueId: 69, natStatId: 1704, color: '#006bb6', affiliateCode: 'phi' },
    // Erie BayHawks
    // Fort Worth Flyers
    // G League Ignite
    41: { abbreviation: 'grg', displayName: 'Grand Rapids Gold', leagueId: 69, natStatId: 16674, color: '#0E2240', affiliateCode: 'den' },
    42: { abbreviation: 'gbo', displayName: 'Greensboro Swarm', leagueId: 69, natStatId: 1711, color: '#1d1160', affiliateCode: 'cha' },
    43: { abbreviation: 'ind', displayName: 'Indiana Mad Ants', leagueId: 69, natStatId: 1708, color: '#002D62', affiliateCode: 'ind'},
    44: { abbreviation: 'iow', displayName: 'Iowa Wolves', leagueId: 69, natStatId: 1713, color: '#0C2340', affiliateCode: 'min' },
    45: { abbreviation: 'lin', displayName: 'Long Island Nets', leagueId: 69, natStatId: 1714, color: '#003DA5', affiliateCode: 'bkn' },
    46: { abbreviation: 'mrc', displayName: 'Maine Celtics', leagueId: 69, natStatId: 1716, color: '#007A33', affiliateCode: 'bos' },
    47: { abbreviation: 'mem', displayName: 'Memphis Hustle', leagueId: 69, natStatId: 3673, color: '#DA291C', affiliateCode: 'mem' },
    48: { abbreviation: 'mex', displayName: 'Mexico City Capitanes', leagueId: 69, natStatId: 16675, color: '#1D4289' },
    49: { abbreviation: 'mcc', displayName: 'Motor City Cruise', leagueId: 69, natStatId: 1710, color: '#C8102E', affiliateCode: 'det' },
    // Northern Arizona Suns
    51: { abbreviation: 'okb', displayName: 'Oklahoma City Blue', leagueId: 69, natStatId: 1719, color: '#007ac1', affiliateCode: 'okc' },
    52: { abbreviation: 'osc', displayName: 'Osceola Magic', leagueId: 69, natStatId: 3674, color: '#0077c0', affiliateCode: 'orl' },
    53: { abbreviation: 'osr', displayName: 'Raptors 905', leagueId: 69, natStatId: 1720, color: '#CE1141', affiliateCode: 'tor' },
    54: { abbreviation: 'rgv', displayName: 'Rio Grande Valley Vipers', leagueId: 69, natStatId: 1722, color: '#CE1141', affiliateCode: 'hou' },
    55: { abbreviation: 'rip', displayName: 'Rip City Remix', leagueId: 69, natStatId: 1731, color: '#C8102E', affiliateCode: 'por' },
    56: { abbreviation: 'slc', displayName: 'Salt Lake City Stars', leagueId: 69, natStatId: 1724, color: '#002B5C', affiliateCode: 'utah' },
    57: { abbreviation: 'sdc', displayName: 'San Diego Clippers', leagueId: 69, natStatId: 3676, color: '#c8102E', affiliateCode: 'lac' },
    58: { abbreviation: 'scw', displayName: 'Santa Cruz Warriors', leagueId: 69, natStatId: 1725, color: '#1D428A', affiliateCode: 'gsw' },
    59: { abbreviation: 'sfs', displayName: 'Sioux Falls Skyforce', leagueId: 69, natStatId: 1726, color: '#98002E', affiliateCode: 'mia' },
    60: { abbreviation: 'sbl', displayName: 'South Bay Lakers', leagueId: 69, natStatId: 1715, color: '#552583', affiliateCode: 'lal' },
    61: { abbreviation: 'sto', displayName: 'Stockton Kings', leagueId: 69, natStatId: 1721, color: '#5a2d81', affiliateCode: 'sac' },
    62: { abbreviation: 'tex', displayName: 'Texas Legends', leagueId: 69, natStatId: 1727, color: '#00538C', affiliateCode: 'dal' },
    63: { abbreviation: 'val', displayName: 'Valley Suns', leagueId: 69, natStatId: 2038901, color: '#1D1160', affiliateCode: 'phx' },
    64: { abbreviation: 'wes', displayName: 'Westchester Knicks', leagueId: 69, natStatId: 1728, color: '#006BB6', affiliateCode: 'nyk' },
    65: { abbreviation: 'wcb', displayName: 'Windy City Bulls', leagueId: 69, natStatId: 1729, color: '#CE1141', affiliateCode: 'chi' },
    66: { abbreviation: 'wis', displayName: 'Wisconsin Herd', leagueId: 69, natStatId: 3675, color: '#00471B', affiliateCode: 'mil' }
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