import type { Player } from "~/app/dashboard/players";
import { teams } from "~/app/dashboard/teams";

const PlayerCard = ({ player }: { player: Player }) => {
  return (
    <>
      <div className="flex justify-between">
        <div>{player.name}</div>
        <div>
          {player.salary && player.salary > 0
            ? player.salary.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })
            : "unknown"}
        </div>
      </div>
      <div>{teams[player.teamId]?.displayName}</div>
      <div>
        <div>Recent Games</div>
        <div>Some stats</div>
      </div>
    </>
  );
};

export default PlayerCard;
