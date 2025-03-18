import {
  Table,
  TableBody,
  TableCaption,
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
    <Table>
      <TableCaption>Player Totals for {season}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Player</TableHead>
          <TableHead>Points</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {playerTotals.map((playerTotal) => (
          <TableRow key={playerTotal.id}>
            <TableCell className="font-medium">
              {playerTotal.full_name}
            </TableCell>
            <TableCell className="text-right">{playerTotal.points}</TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell className="text-right">{totalPoints}</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
}
