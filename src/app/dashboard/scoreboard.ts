import { leagues } from "./leagues"
import { teams } from "./teams"

type ScoreboardResponse = {
    leagues: [{id: string}]
    events: {
        id: string,
        date: string,
        name: string,
        competitions: {
            id: string,
            competitors: {
                team: {
                    id: string,
                    name: string,
                    abbreviation: string,
                    displayName: string
                }
            }[]
        }[],
        status: {
            type: {
                completed: boolean,
                detail: string
            }
        }
    }[]
}

const getScoreboardUrls = (date: string) => {
    const dateParam = date.replace(/-/g, '');
    
    const urls = Object.keys(leagues).map(l => `${process.env.NEXT_PUBLIC_STATS_API_BASE_URL}${l}/scoreboard?region=us&lang=en&contentorigin=espn&limit=100&calendartype=offdays&includeModules=videos&dates=${dateParam}&tz=America%2FNew_York`);
    return urls;
}

export const getGamesByDate = async (date: string) => {
    const urls = getScoreboardUrls(date);
    const scoreboardResponses = await Promise.all(urls.map(url => fetch(url)));
    const scoreboardResponseParsed = await Promise.all(scoreboardResponses.map(r => r.json() as Promise<ScoreboardResponse>))
    
    const gamesIncludingTeamsOfInterest = scoreboardResponseParsed.flatMap(r => r.events.map(e => ({...e, leagueId: parseInt(r.leagues[0].id)}))).filter(event => {
        const teamValues = Object.values(teams);
        const firstTeamMatch = teamValues[parseInt(event.competitions[0]!.competitors[0]!.team.id)];
        const secondTeamMatch = teamValues[parseInt(event.competitions[0]!.competitors[1]!.team.id)];
        return firstTeamMatch?.leagueId == event.leagueId || secondTeamMatch?.leagueId == event.leagueId
    })

    return gamesIncludingTeamsOfInterest.map(g => ({
        id: g.id, 
        teamIds: [g.competitions[0]!.competitors[0]!.team.id, g.competitions[0]!.competitors[1]!.team.id] as [string, string],
        name: g.name,
        date: new Date(g.date),
        status: g.status.type.detail,
        leagueId: g.leagueId
     }))
}