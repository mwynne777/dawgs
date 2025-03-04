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
  leaguesToInclude?: number[];
};

const LeagueSelect = ({
  selectedLeague,
  setSelectedLeague,
  leaguesToInclude,
}: LeagueSelectProps) => {
  const allLeagues = [
    { value: "nba", id: 46, name: "NBA" },
    { value: "gl", id: 69, name: "G League" },
  ];

  const leaguesToShow = allLeagues.filter((league) =>
    leaguesToInclude ? leaguesToInclude.includes(league.id) : true,
  );

  if (leaguesToShow.length > 1) {
    leaguesToShow.unshift({
      value: "all",
      id: 0,
      name: "All - NBA & G League",
    });
  }

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
        {leaguesToShow.map((league) => (
          <SelectItem key={league.value} value={league.value}>
            {league.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LeagueSelect;
