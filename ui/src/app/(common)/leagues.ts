export type LeagueAbbreviation = 'nba' | 'nba-development' /*| 'wnba'*/

export const leagues: Record<LeagueAbbreviation, {id: number, displayName: string}> = {
    nba: {id: 46, displayName: 'NBA'},
    'nba-development': {id: 69, displayName: 'NBA G League'},
    // wnba: {id: 59, displayName: 'WNBA'}
} as const;