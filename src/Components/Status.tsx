import { ArrowIcon } from "@/Assets/UI";
import { useGame } from "@/Context/GameContext/GameContext";
import { getBaseStatCost } from "@/Helpers/getBaseStatCost";
import { DraggableWindow } from "./DraggableWindow";

interface BaseStatProps {
  name: string;
  value: number;
  bonusValue: number;
}

const BaseStat = ({ name, value, bonusValue }: BaseStatProps) => {
  const levelUpCost = getBaseStatCost(value);
  const { statPoints } = useGame().current.character;
  const levelUpAvailable = statPoints > levelUpCost;

  return (
    <div className="grid grid-cols-[1.8rem_1fr] gap-2">
      <div className="font-bold text-blue-700">{name}</div>
      <div className="grid grid-cols-[1fr_1.5rem_1.5rem] items-center border border-gray-400 bg-gray-200 px-1 text-sm">
        <div className="flex gap-1">
          <span>{value}</span>
          <span>+{bonusValue}</span>
        </div>
        {levelUpAvailable ? (
          <div className="grid h-full cursor-pointer place-items-center border-l border-r border-gray-400">
            <ArrowIcon className="h-4" />
          </div>
        ) : (
          <div className="grid h-full place-items-center border-l border-r border-gray-400"></div>
        )}
        <div className="text-right">{levelUpCost}</div>
      </div>
    </div>
  );
};

interface SubStatProps {
  name: string;
  value: number;
  bonusValue: number;
}

const SubStat = ({ name, value, bonusValue }: SubStatProps) => {
  return (
    <div className="flex justify-between border-b border-gray-400">
      <div className="font-bold text-blue-700">{name}</div>

      <div className="flex">
        <span>{value}</span>
        <span>+{bonusValue}</span>
      </div>
    </div>
  );
};

export const Status = () => {
  const { mainStats, sideStats } = useGame().current.character.stats;
  const { strength, agility, vitality, intelligence, dexterity, luck, bonus } =
    mainStats;
  const {
    attack,
    magicAttack,
    hitRate,
    critRate,
    defense,
    magicDefense,
    fleeRate,
    attackSpeed,
  } = sideStats;
  return (
    <section className="grid w-full max-w-md overflow-hidden rounded-lg bg-gray-50 text-gray-800 outline outline-1 outline-gray-800">
      <DraggableWindow title="Status" originX={0} originY={215}>
      <article className="grid grid-cols-[1fr_.8fr_.8fr] grid-rows-6 gap-2 p-2 px-3">
        <BaseStat name="Str" value={strength} bonusValue={bonus.strength} />
        <SubStat
          name="Atk"
          value={attack}
          bonusValue={sideStats.bonus.attack}
        />
        <SubStat
          name="Def"
          value={defense}
          bonusValue={sideStats.bonus.defense}
        />

        <BaseStat name="Agi" value={agility} bonusValue={bonus.agility} />
        <SubStat
          name="Matk"
          value={magicAttack}
          bonusValue={sideStats.bonus.magicAttack}
        />
        <SubStat
          name="Mdef"
          value={magicDefense}
          bonusValue={sideStats.bonus.magicDefense}
        />

        <BaseStat name="Vit" value={vitality} bonusValue={bonus.vitality} />
        <SubStat
          name="Hit"
          value={hitRate}
          bonusValue={sideStats.bonus.hitRate}
        />
        <SubStat
          name="Flee"
          value={fleeRate}
          bonusValue={sideStats.bonus.fleeRate}
        />

        <BaseStat
          name="Int"
          value={intelligence}
          bonusValue={bonus.intelligence}
        />
        <SubStat
          name="Critical"
          value={critRate}
          bonusValue={sideStats.bonus.critRate}
        />
        <SubStat
          name="Aspd"
          value={attackSpeed}
          bonusValue={sideStats.bonus.attackSpeed}
        />

        <BaseStat name="Dex" value={dexterity} bonusValue={bonus.dexterity} />
        <div className="col-span-2" />

        <BaseStat name="Luk" value={luck} bonusValue={bonus.luck} />
        <div className="col-span-2">
          <div className="flex justify-between border-b border-gray-400">
            <div className="font-bold text-blue-700">Status Point</div>
            <span>48</span>
          </div>
        </div>
      </article>
      </DraggableWindow>
    </section>
  );
};
