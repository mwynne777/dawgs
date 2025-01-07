const GameCard = ({ stats }: { stats: string[] }) => {
  return (
    <table className="min-w-full border-collapse border border-gray-200">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-200 px-4 py-2">MIN</th>
          <th className="border border-gray-200 px-4 py-2">FG</th>
          <th className="border border-gray-200 px-4 py-2">3PT</th>
          <th className="border border-gray-200 px-4 py-2">REB</th>
          <th className="border border-gray-200 px-4 py-2">AST</th>
          <th className="border border-gray-200 px-4 py-2">STL</th>
          <th className="border border-gray-200 px-4 py-2">BLK</th>
          <th className="border border-gray-200 px-4 py-2">TO</th>
          <th className="border border-gray-200 px-4 py-2">+/-</th>
          <th className="border border-gray-200 px-4 py-2">PTS</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="border border-gray-200 px-4 py-2">{stats[0]}</td>
          <td className="border border-gray-200 px-4 py-2">{stats[1]}</td>
          <td className="border border-gray-200 px-4 py-2">{stats[3]}</td>
          <td className="border border-gray-200 px-4 py-2">{stats[6]}</td>
          <td className="border border-gray-200 px-4 py-2">{stats[7]}</td>
          <td className="border border-gray-200 px-4 py-2">{stats[8]}</td>
          <td className="border border-gray-200 px-4 py-2">{stats[9]}</td>
          <td className="border border-gray-200 px-4 py-2">{stats[10]}</td>
          <td className="border border-gray-200 px-4 py-2">{stats[12]}</td>
          <td className="border border-gray-200 px-4 py-2">{stats[13]}</td>
        </tr>
      </tbody>
    </table>
  );
};

export default GameCard;
