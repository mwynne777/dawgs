import { teams } from "./teams"

type ScoreboardResponse = {
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

const getScoreboardUrl = (date: Date) => {
    const dateParam = date.getFullYear() +
        String(date.getMonth() + 1).padStart(2, '0') +
        String(date.getDate()).padStart(2, '0');
    
    return `${process.env.NEXT_PUBLIC_STATS_API_BASE_URL}scoreboard?region=us&lang=en&contentorigin=espn&limit=100&calendartype=offdays&includeModules=videos&dates=${dateParam}&tz=America%2FNew_York`;
}

export const getGamesByDate = async (date: Date) => {
    const scoreboardResponse = await fetch(getScoreboardUrl(date))
    const scoreboardResponseParsed: ScoreboardResponse = await scoreboardResponse.json()
    const gamesIncludingTeamsOfInterest = scoreboardResponseParsed.events.filter(event => Object.values(teams).includes(parseInt(event.competitions[0]!.competitors[0]!.team.id)) || Object.values(teams).includes(parseInt(event.competitions[0]!.competitors[1]!.team.id)))
    return gamesIncludingTeamsOfInterest.map(g => ({ 
        id: g.id, 
        teamIds: [g.competitions[0]!.competitors[0]!.team.id, g.competitions[0]!.competitors[1]!.team.id] as [string, string],
        name: g.name,
        date: new Date(g.date),
        status: g.status.type.detail
     }))
}