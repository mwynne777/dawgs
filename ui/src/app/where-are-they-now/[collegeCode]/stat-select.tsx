import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Database } from "~/lib/supabase-types";

export type SelectableStats =
  | "points"
  | "rebounds"
  | "assists"
  | "blocks"
  | "steals"
  | "turnovers"
  | "games_played";

export const StatisticLabels = {
  points: "Points",
  rebounds: "Rebounds",
  assists: "Assists",
  blocks: "Blocks",
  steals: "Steals",
  turnovers: "Turnovers",
  games_played: "Games Played",
} satisfies Record<SelectableStats, string>;

type StatSelectProps = {
  selectedStat: keyof Database["public"]["Views"]["player_season_totals_with_details"]["Row"];
  setSelectedStat: (stat: SelectableStats) => void;
};

const StatSelect = ({ selectedStat, setSelectedStat }: StatSelectProps) => {
  return (
    <div className="mb-4 flex w-full justify-center">
      <div className="flex items-center">
        <Label htmlFor="stat-select">Selected Statistic:</Label>
        <span className="ml-2">
          <Select value={selectedStat} onValueChange={setSelectedStat}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="points">Points</SelectItem>
              <SelectItem value="rebounds">Rebounds</SelectItem>
              <SelectItem value="assists">Assists</SelectItem>
              <SelectItem value="blocks">Blocks</SelectItem>
              <SelectItem value="steals">Steals</SelectItem>
              <SelectItem value="turnovers">Turnovers</SelectItem>
              <SelectItem value="games_played">Games Played</SelectItem>
            </SelectContent>
          </Select>
        </span>
      </div>
    </div>
  );
};

export default StatSelect;
