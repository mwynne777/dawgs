import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

type LeagueSelectProps = {
  selectedLeague: "nba" | "gl" | "all";
  setSelectedLeague: (league: "nba" | "gl" | "all") => void;
};

const LeagueSelect = ({
  selectedLeague,
  setSelectedLeague,
}: LeagueSelectProps) => {
  return (
    <Select
      value={selectedLeague}
      onValueChange={(value) =>
        setSelectedLeague(value as "nba" | "gl" | "all")
      }
      defaultValue="all"
    >
      <SelectTrigger className="mb-8">
        <SelectValue placeholder="Select a league" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All</SelectItem>
        <SelectItem value="nba">NBA</SelectItem>
        <SelectItem value="gl">G League</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default LeagueSelect;
