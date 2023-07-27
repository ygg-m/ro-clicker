import useGameStore from "@/Stores/game";

export const Enemy = () => {
  const target = useGameStore((state) => state.target);
  const game = useGameStore((state) => state);

  // Stats
  const currentHP = target.current.hp;
  const totalHP = target.base.hp;

  // Info
  const name = target.base.name;
  const level = target.base.level;
  const size = target.base.size;

  // Sprites
  const idleSprite = target.base.sprites.idle;

  return (
    <div className="relative flex h-full flex-col items-center justify-between gap-2">
      <div className="flex w-[5rem] flex-col items-center gap-[2px] rounded-md bg-neutral bg-opacity-60 p-[2px] duration-200">
        <progress
          className="progress progress-success"
          value={currentHP}
          max={totalHP}
        ></progress>
      </div>

      <div className="flex h-full items-end">
        <img
          src={idleSprite}
          alt=""
          onClick={() => game.basicAttack()}
          className="attack rounded-lg duration-200 hover:brightness-125 -mb-1"
        />
      </div>
      <div
        className={`absolute bottom-7 -z-[1] rounded-[100%] bg-neutral opacity-30 blur-sm ${
          size === "Small"
            ? "h-4 w-10"
            : size === "Medium"
            ? "h-6 w-14"
            : "w-18 h-6"
        }`}
      />
      <div className="text-shadow duration h-8 pt-2 font-semibold">{name}</div>
    </div>
  );
};
