import { baseExpTable, firstJobExpTable } from "@/Data/ExperienceTables";
import { jobList } from "@/Data/Jobs";
import useGameStore from "@/Stores/game";
import usePageStore from "@/Stores/page";
import { JobData } from "@/Types/Job";
import { DraggableWindow } from "./DraggableWindow";
import { GrayButton } from "./GrayButton";
import { MenuHeader } from "./MenuHeader";

interface ParameterProps {
  name: string;
  value: number;
  totalValue: number;
}

const Parameter = ({ name, value, totalValue }: ParameterProps) => {
  const percentage = Math.floor((value / totalValue) * 100);

  return (
    <div className="grid grid-cols-[18px_1fr] gap-2">
      <span>{name}</span>
      <div className="w-full">
        <div className="relative z-0 h-3 w-full">
          <div
            style={{ width: `${percentage}%` }}
            className="bg-progress-bar h-full rounded-full border border-gray-600"
          />
          <div className="absolute top-[20%] -z-10 h-[80%] w-full rounded-full bg-gray-300" />
        </div>

        <div className="flex justify-between text-sm">
          <span>
            {value} / {totalValue}
          </span>
          <span>{percentage}%</span>
        </div>
      </div>
    </div>
  );
};

interface LevelProps {
  name: string;
  value: number;
  exp: number;
  expToLevel: number;
}

const Level = ({ name, value, exp, expToLevel }: LevelProps) => {
  const percentage = Math.floor((exp / expToLevel) * 100);

  return (
    <div
      className="tooltip grid grid-cols-[.4fr_1fr] items-center gap-2 hover:bg-gray-300"
      data-tip={`${exp} / ${expToLevel} (${percentage}%)`}
    >
      <div>
        {name} Lv. {value}
      </div>
      <div className="h-2 w-full border border-gray-400 bg-white">
        <div
          className="h-full bg-blue-600"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

interface WeightProps {
  value: number;
  totalValue: number;
}

const Weight = ({ value, totalValue }: WeightProps) => {
  const percentage = Math.floor((value / totalValue) * 100);

  return (
    <div>
      Weight: {value} / {totalValue} ({percentage}%)
    </div>
  );
};

const Zeny = ({ value }: { value: number }) => {
  return <div>Zeny: {value}</div>;
};

export const BasicInfo = () => {
  const page = usePageStore((state) => state);
  const { name, job, baseLevel, baseExp, jobLevel, jobExp } = useGameStore(
    (state) => state.current.mainCharacter
  );

  const {
    healthPoints,
    spiritPoints,
    totalHealthPoints,
    totalSpiritPoints,
    weight,
    totalWeight,
    zeny,
  } = useGameStore((state) => state.current.mainCharacter.stats.baseStats);

  const { name: jobName } =
    (jobList.find((e) => e.id === job) as JobData) || "Unknown";
  const baseExpToLevel = baseExpTable[baseLevel];
  const jobExpToLevel = firstJobExpTable[jobLevel];

  // <DraggableWindow title="Basic Info" originX={0} originY={0}>
  return (
    <article className="">
      <MenuHeader name="Basic Info" />
      <div className="grid grid-cols-[1fr_0.5fr]">
        <div className="flex flex-col">
          <div className="grid grid-cols-[0.5fr_1fr] gap-2 p-2 px-3">
            <div className="flex flex-col text-sm">
              <span>{name}</span>
              <span>{jobName}</span>
            </div>

            <div className="grid gap-2 text-sm">
              <Parameter
                name="HP"
                value={healthPoints}
                totalValue={totalHealthPoints}
              />
              <Parameter
                name="SP"
                value={spiritPoints}
                totalValue={totalSpiritPoints}
              />
            </div>
          </div>

          <div className="p-1 px-2 text-sm">
            <div className="rounded-lg bg-gray-200 p-1 px-2">
              <Level
                name="Base"
                value={baseLevel}
                exp={baseExp}
                expToLevel={baseExpToLevel}
              />
              <Level
                name="Job"
                value={jobLevel}
                exp={jobExp}
                expToLevel={jobExpToLevel}
              />
            </div>
          </div>

          <div className="bg-lines border-t border-gray-400 p-1 px-3 text-sm">
            <Weight value={weight} totalValue={totalWeight} />
            <Zeny value={zeny} />
          </div>
        </div>
        <div className="bg-lines grid grid-cols-2 gap-2 border-l border-gray-400 p-2 text-sm">
          <GrayButton name="status" />
          <GrayButton name="option" onClick={() => page.toggleOptionsMenu()} />
          <GrayButton name="items" />
          <GrayButton name="equip" />
          <GrayButton name="skill" />
          <GrayButton name="map" />
          <GrayButton name="comm" />
          <GrayButton name="friend" />
        </div>
      </div>
    </article>
  );
  // </DraggableWindow>
};
