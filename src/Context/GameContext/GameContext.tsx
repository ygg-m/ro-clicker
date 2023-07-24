import {
  ClickDefault,
  CountDefault,
  CurrentDefault,
} from "@/Data/DefaultValues";
import {
  getCritRate,
  getHitRate,
  getSoftDefense,
  getSoftMagicDefense,
  getStatusATK,
  getStatusMATK,
  getWeaponATK,
} from "@/Helpers/getStats";
import { EquipmentSlotTypes } from "@/Types/Character/Equipment";
import {
  ClickTypes,
  CountTypes,
  CurrentTypes,
  DetailWindowData,
} from "@/Types/GameTypes";
import { ItemTypes } from "@/Types/Item";
import { createContext, useContext, useEffect, useState } from "react";
import { damageTarget } from "./Utils/damageTarget";
import { useLogs } from "./Utils/log";
import { targetList } from "@/Data/EnemyList";

interface LogEntry {
  timestamp: Date;
  message: string;
}

type GameContextType = {
  click: ClickTypes;
  count: CountTypes;
  current: CurrentTypes;
  setCurrent: Function;
  handleClickerButton: Function;
  powerUpClick: Function;
  detailWindows: DetailWindowData[];
  handleDetailWindow: Function;
  handleCloseDetailWindow: Function;
  basicAttack: Function;
  logs: LogEntry[];
  setLogs: Function;
  updateStats: Function;
};

const GameContext = createContext<GameContextType>({
  click: ClickDefault,
  count: CountDefault,
  current: CurrentDefault,
  setCurrent: () => {},
  handleClickerButton: () => {},
  powerUpClick: () => {},
  detailWindows: [],
  handleDetailWindow: () => {},
  handleCloseDetailWindow: () => {},
  basicAttack: () => {},
  logs: [],
  setLogs: () => {},
  updateStats: () => {},
});

export const useGame = () => useContext(GameContext);

type GameContextProps = { children: React.ReactNode };

export const GameProvider: React.FC<GameContextProps> = ({ children }) => {
  const { log } = useLogs();

  const [click, setClick] = useState<ClickTypes>(ClickDefault);
  const [count, setCount] = useState<CountTypes>(CountDefault);
  const [current, setCurrent] = useState<CurrentTypes>(CurrentDefault);
  const [detailWindows, setDetailWindows] = useState<DetailWindowData[]>([]);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  // logger
  // const log = (message: string) => {
  //   const entry: LogEntry = {
  //     timestamp: new Date(),
  //     message,
  //   };
  //   setLogs((prevLogs) => [...prevLogs, entry]);
  // };
  //

  const damageTarget = (value: number) => {
    const newHealthPoints = current.target.healthPoints - value;
    const targetData = targetList.find((e) => e.id === current.target.id);
    const targetName = targetData?.name;

    setCurrent({
      ...current,
      target: {
        ...current.target,
        healthPoints: newHealthPoints,
      },
    });

    log(
      `Damaged ${targetName} in ${value} points and left with ${newHealthPoints} Health Points.`
    );
  };

  function handleDetailWindow(
    e: React.MouseEvent,
    equipData?: EquipmentSlotTypes,
    itemData?: ItemTypes
  ) {
    e.preventDefault();
    const x = e.clientX;
    const y = e.clientY;
    equipData
      ? setDetailWindows((prev) => [...prev, { x, y, equipData }])
      : setDetailWindows((prev) => [...prev, { x, y, itemData }]);
  }

  function handleCloseDetailWindow(index: number) {
    setDetailWindows((prev) => prev.filter((_, i) => i !== index));
  }

  function basicAttack() {
    const randomNumber = Math.random() * (0.2 - -0.8) + -0.8;
    const attack = current.character.stats.sideStats.attack;
    const randomAttack = Math.floor(attack + attack * randomNumber);

    damageTarget(randomAttack);
  }

  function updateStats() {
    updateCharacterSubStat_Attack();
    // updateCharacterSubStat_MagicAttack();
    // updateCharacterSubStat_SoftDefense();
    // updateCharacterSubStat_SoftMagicDefense();
    // updateCharacterSubStat_HitRate();
    // updateCharacterSubStat_CritRate();
  }

  function updateCharacterSubStat_Attack() {
    const charATK = getStatusATK({
      weaponClass: current.character.equipment.handR?.itemData.subtype || "",
      baseLevel: current.character.baseLevel,
      str: current.character.stats.mainStats.strength,
      dex: current.character.stats.mainStats.dexterity,
      luk: current.character.stats.mainStats.luck,
    });

    const weaponATK = getWeaponATK({
      baseWeaponDamage: current.character.equipment.handR?.itemData.attack || 0,
      weaponClass: current.character.equipment.handR?.itemData.subtype || "",
      weaponLevel: current.character.equipment.handR?.itemData.weaponLevel || 0,
      upgradeLevel: current.character.equipment.handR?.upgradeLevel || 0,
      str: current.character.stats.mainStats.strength,
      dex: current.character.stats.mainStats.dexterity,
    });

    log(`Char ATK: ${charATK.toString()}`);
    log(`Weapon ATK: ${weaponATK.toString()}`);

    const result = Math.floor(charATK + weaponATK);

    log(`Result Char + Weapon: ${result}`);

    setCurrent((prevCurrent) => ({
      ...prevCurrent,
      character: {
        ...prevCurrent.character,
        stats: {
          ...prevCurrent.character.stats,
          sideStats: {
            ...prevCurrent.character.stats.sideStats,
            attack: result,
          },
        },
      },
    }));
  }

  function updateCharacterSubStat_MagicAttack() {
    const result = getStatusMATK({
      baseLevel: current.character.baseLevel,
      int: current.character.stats.mainStats.intelligence,
      dex: current.character.stats.mainStats.dexterity,
      luk: current.character.stats.mainStats.luck,
    });

    setCurrent({
      ...current,
      character: {
        ...current.character,
        stats: {
          ...current.character.stats,
          sideStats: {
            ...current.character.stats.sideStats,
            magicAttack: result,
          },
        },
      },
    });
  }

  // TODO: add hard def
  // https://irowiki.org/wiki/DEF#Hard_DEF

  function updateCharacterSubStat_SoftDefense() {
    const result = getSoftDefense({
      baseLevel: current.character.baseLevel,
      vit: current.character.stats.mainStats.vitality,
      agi: current.character.stats.mainStats.agility,
    });

    setCurrent({
      ...current,
      character: {
        ...current.character,
        stats: {
          ...current.character.stats,
          sideStats: {
            ...current.character.stats.sideStats,
            defense: result,
          },
        },
      },
    });
  }

  // TODO: add hard m def
  //

  function updateCharacterSubStat_SoftMagicDefense() {
    const result = getSoftMagicDefense({
      baseLevel: current.character.baseLevel,
      int: current.character.stats.mainStats.intelligence,
      vit: current.character.stats.mainStats.vitality,
      dex: current.character.stats.mainStats.dexterity,
    });

    setCurrent({
      ...current,
      character: {
        ...current.character,
        stats: {
          ...current.character.stats,
          sideStats: {
            ...current.character.stats.sideStats,
            magicDefense: result,
          },
        },
      },
    });
  }

  function updateCharacterSubStat_HitRate() {
    const result = getHitRate({
      baseLevel: current.character.baseLevel,
      dex: current.character.stats.mainStats.dexterity,
      luk: current.character.stats.mainStats.luck,
    });

    setCurrent({
      ...current,
      character: {
        ...current.character,
        stats: {
          ...current.character.stats,
          sideStats: {
            ...current.character.stats.sideStats,
            hitRate: result,
          },
        },
      },
    });
  }

  function updateCharacterSubStat_CritRate() {
    const result = getCritRate(current.character.stats.mainStats.luck);

    setCurrent({
      ...current,
      character: {
        ...current.character,
        stats: {
          ...current.character.stats,
          sideStats: {
            ...current.character.stats.sideStats,
            critRate: result,
          },
        },
      },
    });
  }

  function addClickPowerToCountPoints() {
    setCount({
      ...count,
      points: (count.points += click.power),
    });
  }

  function handleClickerButton() {
    addClickPowerToCountPoints();
  }

  function powerUpClick(num: number) {
    setClick({
      ...click,
      power: click.power + num,
    });
  }

  useEffect(() => {
    updateStats();
  }, []);

  // useEffect(() => {
  //   // update every 1 second
  //   const interval = setInterval(() => {
  //     updateStats();
  //     basicAttack();
  //   }, 1000);
  // }, []);

  const value: GameContextType = {
    click,
    count,
    current,
    setCurrent,
    handleClickerButton,
    powerUpClick,
    detailWindows,
    handleDetailWindow,
    handleCloseDetailWindow,
    basicAttack,
    logs,
    setLogs,
    updateStats,
  };
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
