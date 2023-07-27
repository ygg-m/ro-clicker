import useGameStore from "@/Stores/game";
import { useEffect, useState } from "react";

export const Player = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { mainCharacter, current } = useGameStore((state) => state);
  return (
    <div
      className="relative flex flex-col items-center"
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
    >
      <div
        className={`flex w-[5rem] flex-col items-center gap-[2px] rounded-md bg-neutral bg-opacity-60 p-[2px] duration-200 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        <progress
          className="progress progress-success"
          value={mainCharacter.stats.baseStats.healthPoints}
          max={current.mainCharacter.stats.baseStats.healthPoints}
        ></progress>
        <progress
          className="progress progress-info"
          value="60"
          max="100"
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
      <div className="absolute bottom-[22px] -z-[1] h-6 w-16 rounded-[100%] bg-neutral opacity-30" />
      <span
        className={`font-bold duration-200 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        {mainCharacter.name}
      </span>
    </div>
  );
};

// TODO: animate shadow
