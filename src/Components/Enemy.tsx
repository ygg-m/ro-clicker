import { useGame } from "@/Context/GameContext/GameContext";
import { targetList } from "@/Data/EnemyList";
import { EnemyTypes } from "@/Types/Enemy/Base";

export const Enemy = () => {
  const { current } = useGame();
  const data = targetList.find((e) => e.id === current.target.id) as EnemyTypes;

  const currentHP = current.target.healthPoints;
  const totalHP = data.stats.baseStats.healthPoints;

  return (
    <div>
      <div className="grid items-end justify-center gap-2">
        HP: {currentHP} / {totalHP}
        <img
          src={data.sprites.idle}
          alt=""
          className="cursor-pointer rounded-lg bg-gray-50 p-4 duration-100 hover:bg-red-100"
        />
      </div>
    </div>
  );
};
