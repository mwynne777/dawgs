const GameCard = ({ stats }: { stats: string[] }) => {
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
  ] = stats;
  return (
    <table className="min-w-full border-collapse border border-gray-200">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-200 px-4 py-2">MIN</th>
          <th className="border border-gray-200 px-4 py-2">PTS</th>
          <th className="border border-gray-200 px-4 py-2">REB</th>
          <th className="border border-gray-200 px-4 py-2">AST</th>
          <th className="border border-gray-200 px-4 py-2">STL</th>
          <th className="border border-gray-200 px-4 py-2">BLK</th>
          <th className="hidden border border-gray-200 px-4 py-2 sm:table-cell">
            FG
          </th>
          <th className="hidden border border-gray-200 px-4 py-2 sm:table-cell">
            3PT
          </th>
          <th className="hidden border border-gray-200 px-4 py-2 sm:table-cell">
            TO
          </th>
          <th className="border border-gray-200 px-4 py-2">+/-</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border border-gray-200 px-4 py-2">{min}</td>
          <td className="border border-gray-200 px-4 py-2">{pts}</td>
          <td className="border border-gray-200 px-4 py-2">{reb}</td>
          <td className="border border-gray-200 px-4 py-2">{ast}</td>
          <td className="border border-gray-200 px-4 py-2">{stl}</td>
          <td className="border border-gray-200 px-4 py-2">{blk}</td>
          <td className="hidden border border-gray-200 px-4 py-2 sm:table-cell">
            {fg}
          </td>
          <td className="hidden border border-gray-200 px-4 py-2 sm:table-cell">
            {threePt}
          </td>
          <td className="hidden border border-gray-200 px-4 py-2 sm:table-cell">
            {to}
          </td>
          <td className="border border-gray-200 px-4 py-2">{plusMinus}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default GameCard;
