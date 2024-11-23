import { TeamAbbreviation } from "./teams";

export type Player = {
    id: string;
    name: string;
    teamId: number
  };

const PLAYERS: Player[] = [
    { id: "5105565", name: "Donovan Clingan", teamId: 22 },
    { id: "4432190", name: "Andre Jackson", teamId: 15 },
    { id: "4433083", name: "Cam Spencer", teamId: 29 },
    { id: "4683750", name: "Jordan Hawkins", teamId: 3 },
    { id: "4845367", name: "Stephon Castle", teamId: 24 },
  ] as const;

export const getPlayerByTeamAbbreviation = (abbrev: TeamAbbreviation): Player => {
    switch(abbrev) {
        case 'por':
            return PLAYERS[0]!
        case 'mil':
            return PLAYERS[1]!
        case 'mem':
            return PLAYERS[2]!
        case 'no':
            return PLAYERS[3]!
        default:
            return PLAYERS[4]!
    }
}