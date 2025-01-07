import type { Player } from "~/app/dashboard/players";
import { teams } from "~/app/dashboard/teams";

const PlayerCard = ({ player }: { player: Player }) => {
  return (
    <>
      <div className="flex justify-between">
        <div className="flex gap-2">
          <div className="text-xl font-bold">{player.name}</div>
          <div className="self-end text-base">
            {teams[player.teamId]?.displayName}
          </div>
        </div>
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
      <div>
        <div>Recent Games</div>
        <div>Some stats</div>
      </div>
    </>
  );
};

export default PlayerCard;
