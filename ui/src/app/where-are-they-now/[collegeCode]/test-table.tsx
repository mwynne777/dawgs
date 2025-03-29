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

type TestTableProps = {
  playerTotals: Database["public"]["Views"]["player_season_totals_with_details"]["Row"][];
  season: number;
};
export function TestTable({ playerTotals, season }: TestTableProps) {
  const totalPoints = playerTotals.reduce(
    (acc, pt) => acc + (pt.points ?? 0),
    0,
  );
  return (
    <>
      <div className="mt-2 text-center text-lg font-bold">
        Player Point Totals for {season}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Player</TableHead>
            <TableHead className="text-right">Points</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {playerTotals.map((playerTotal) => (
            <TableRow key={playerTotal.id}>
              <TableCell className="font-medium">
                {playerTotal.full_name}
              </TableCell>
              <TableCell className="text-right">
                {playerTotal.points?.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Total</TableCell>
            <TableCell className="text-right">
              {totalPoints.toLocaleString()}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </>
  );
}
