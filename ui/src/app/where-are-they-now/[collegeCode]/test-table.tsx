import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Database } from "~/lib/supabase-types";
import { SelectableStats, StatisticLabels } from "./stat-select";

type TestTableProps = {
  playerTotals: Database["public"]["Views"]["player_season_totals_with_details"]["Row"][];
  season: number;
  selectedStat: SelectableStats;
};
export function TestTable({
  playerTotals,
  season,
  selectedStat,
}: TestTableProps) {
  const statisticTotal = playerTotals.reduce(
    (acc, pt) => acc + pt[selectedStat]!,
    0,
  );

  playerTotals.sort((a, b) => {
    if (a[selectedStat] === null && b[selectedStat] === null) {
      return 0;
    }
    if (a[selectedStat] === null) {
      return 1;
    }
    return b[selectedStat]! - a[selectedStat]!;
  });
  return (
    <>
      <div className="mt-2 text-center text-lg font-bold">
        Player {StatisticLabels[selectedStat]} Totals for {season}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Player</TableHead>
            <TableHead className="text-right">
              {StatisticLabels[selectedStat]}
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {playerTotals.map((playerTotal) => (
            <TableRow key={playerTotal.id}>
              <TableCell className="font-medium">
                {playerTotal.full_name}
              </TableCell>
              <TableCell className="text-right">
                {playerTotal[selectedStat]?.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell className="text-right">
              {statisticTotal.toLocaleString()}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}
