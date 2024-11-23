import { TeamAbbreviation } from "./teams";

export type Player = {
    id: string;
    name: string;
  };

const PLAYERS: Player[] = [
    { id: "5105565", name: "Donovan Clingan" },
    { id: "4432190", name: "Andre Jackson" },
    { id: "4433083", name: "Cam Spencer" },
    { id: "4683750", name: "Jordan Hawkins" },
    { id: "4845367", name: "Stephon Castle" },
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