import useGameStore from "@/Stores/game";

export const Enemy = () => {
  const target = useGameStore((state) => state.target);

  // Stats
  const currentHP = target.current.hp;
  const totalHP = target.base.hp;

  // Info
  const name = target.base.name;
  const level = target.base.level;

  // Sprites
  const idleSprite = target.base.sprites.idle;

  return (
    <div>
      <div className="grid items-end justify-center gap-2">
        <progress
          className="progress progress-success"
          value={currentHP}
          max={totalHP}
        ></progress>

        <div>
          HP: {currentHP} / {totalHP}
        </div>

        <img
          src={idleSprite}
          alt=""
          className="cursor-pointer rounded-lg bg-gray-50 p-4 duration-100 hover:bg-red-100"
        />

        <div>
          {name} Lv{level}
        </div>
      </div>
    </div>
  );
};
