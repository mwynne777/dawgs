export const PLAYERS: Player[] = [
    { id: "5105565", name: "Donovan Clingan", teamId: 22, leagueId: 46 },
    { id: "4432190", name: "Andre Jackson", teamId: 15, leagueId: 46 },
    { id: "4433083", name: "Cam Spencer", teamId: 29, leagueId: 46 },
    { id: "4683750", name: "Jordan Hawkins", teamId: 3, leagueId: 46 },
    { id: "4845367", name: "Stephon Castle", teamId: 24, leagueId: 46 },
    { id: "4397179", name: "Tyrese Martin", teamId: 17, leagueId: 46 },
    // { id: "4592965", name: "Tristen Newton", teamId: 7, leagueId: 69 },
  ] as const;

export type Player = {
    id: string;
    name: string;
    teamId: number,
    leagueId: number,
    collegeId?: number,
    salary?: number | null
  };