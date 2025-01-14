import { NatStatPlayerPerfs } from "~/app/seed/[leagueId]/[teamId]/player-card";

const GameCard = ({ playerPerfs }: { playerPerfs: NatStatPlayerPerfs[] }) => {
  return (
    <div className="overflow-x-auto">
      <table className="border-collapse text-sm">
        <thead>
          <tr className="border-b border-t bg-gray-100 text-center">
            <th className="px-1 py-1">DATE</th>
            <th className="px-1 py-1">OPP</th>
            <th className="px-1 py-1">MIN</th>
            <th className="px-1 py-1">PTS</th>
            <th className="px-1 py-1">REB</th>
            <th className="px-1 py-1">AST</th>
            <th className="hidden px-1 py-1 sm:table-cell">STL</th>
            <th className="px-1 py-1">BLK</th>
            <th className="hidden px-1 py-1 sm:table-cell">FG</th>
            <th className="hidden px-1 py-1 sm:table-cell">3PT</th>
            <th className="hidden px-1 py-1 sm:table-cell">TO</th>
            <th className="hidden px-1 py-1 sm:table-cell">+/-</th>
          </tr>
        </thead>
        <tbody>
          {playerPerfs.map((perf) => {
            const [
              min,
              fg,
              threePt,
              _ft,
              _ored,
              _dred,
              reb,
              ast,
              stl,
              blk,
              to,
              _pf,
              plusMinus,
              pts,
            ] = perf.statline;
            return (
              <tr key={perf.id} className="border-b text-center">
                <td className="px-1 py-1">
                  {new Date(perf.gameday)
                    .toLocaleString("en-US", {
                      timeZone: "America/New_York",
                    })
                    .split(",")[0]
                    ?.split("/")
                    .map((part, i) => {
                      if (i === 2) return part.substring(2);
                      return part.padStart(2, "0");
                    })
                    .join("/")}
                </td>
                <td className="px-1 py-1">{perf["opponent-team-code"]}</td>
                <td className="px-1 py-1">{min}</td>
                <td className="px-1 py-1">{pts}</td>
                <td className="px-1 py-1">{reb}</td>
                <td className="px-1 py-1">{ast}</td>
                <td className="hidden px-1 py-1 sm:table-cell">{stl}</td>
                <td className="px-1 py-1">{blk}</td>
                <td className="hidden px-1 py-1 sm:table-cell">{fg}</td>
                <td className="hidden px-1 py-1 sm:table-cell">{threePt}</td>
                <td className="hidden px-1 py-1 sm:table-cell">{to}</td>
                <td className="hidden px-1 py-1 sm:table-cell">{plusMinus}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default GameCard;
