import useGameStore from "@/Stores/game";
import usePageStore from "@/Stores/page";
import { useState } from "react";

export const Player = () => {
  const showStats = usePageStore((state) => state.isStatsAbovePlayerActive);
  const showName = usePageStore((state) => state.isNameBelowPlayerActive);
  const [isHovered, setIsHovered] = useState(false);
  const { mainCharacter, current } = useGameStore((state) => state);
  const totalHP = mainCharacter.stats.baseStats.healthPoints;
  const currentHP = current.mainCharacter.stats.baseStats.healthPoints;
  const healthPercent = (currentHP / totalHP) * 100;
  const totalSP = mainCharacter.stats.baseStats.spiritPoints;
  const currentSP = current.mainCharacter.stats.baseStats.spiritPoints;

  return (
    <div
      className="relative flex flex-col items-center"
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      <div
        className={`flex w-[5rem] flex-col items-center gap-[2px] rounded-md bg-neutral bg-opacity-60 p-[2px] duration-200 ${
          isHovered || showStats ? "opacity-100" : "opacity-0"
        }`}
      >
        <progress
          className={`progress ${
            healthPercent < 25 ? "progress-error" : "progress-success"
          }`}
          value={currentHP}
          max={totalHP}
        ></progress>
        <progress
          className="progress progress-info"
          value={currentSP}
          max={totalSP}
        ></progress>
      </div>
      <div
        className={`place-items-centerp-2 grid h-32 w-32 overflow-hidden duration-200 ${
          isHovered ? "brightness-125" : ""
        }`}
      >
        <img
          src={require("@/Assets/Player/Novice/idle-action.gif")}
          alt="Player Name"
          className="scale-[2.3]"
        />
      </div>
      <div className="absolute bottom-7 -z-[1] h-6 w-16 rounded-[100%] bg-neutral opacity-30 blur-sm" />
      <span
        className={`text-shadow pt-2 font-semibold duration-200 ${
          isHovered || showName ? "opacity-100" : "opacity-0"
        }`}
      >
        {mainCharacter.name}
      </span>
    </div>
  );
};

// TODO: animate shadow
