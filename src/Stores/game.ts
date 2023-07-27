import { Character } from "@/Types/Character/Base";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { CharacterDefault } from "@/Data/DefaultValues";
import { EnemyTypes } from "@/Types/enemy";
import { targetList } from "@/Data/EnemyList";
import { getStatusATK, getWeaponATK } from "@/Helpers/getStats";
import { MapTypes } from "@/Types/GameTypes";
import { mapList } from "@/Data/Maps";

type State = {
  // Current Game Stats
  current: {
    mainCharacter: Character;
    map: MapTypes;
  };

  // Main Character
  mainCharacter: Character;
  basicAttack: () => void;
  updateStats: () => void;
  updateMainCharacterAttack: () => void;

  // Target
  target: {
    current: EnemyTypes;
    base: EnemyTypes;
  };
  setMainTarget: (newTarget: EnemyTypes) => void;
  removeTargetHP: (value: number) => void;

  // Map
  map: MapTypes;
  setMap: (newMap: MapTypes) => void;

  // Utils
  logs: LogEntry[];
  log: (message: string) => void;
};

interface LogEntry {
  timestamp: Date;
  message: string;
}

// TODO: sepparate logs between Combat, Items, Status
// todo: different colors between logs
// todo: primary, secondary, etc, colors
// todo: add enemy attack based on their attack speed
// todo: add options to fight or flee
// todo: remove enemy when it dies, rolls another from same map
// todo: add exp when enemy dies
// todo: add loot when enemy dies
// todo: multiple enemies if don't kill faster
// todo: basic attack delay based on ASPD
// todo: auto-attack option
// todo: use Status Point to increase stats
// todo: add basic skills (unlock stuff)
// todo: add first aid (recover hp)
// todo: add character death (lose XP, start with less hp)
// todo: add escape from battle
// todo: add delay between encounters
// todo: add fake death (runs from enemy after a delay)

const useGameStore = create<State>()(
  persist(
    (set) => ({
      // Current Game Stats
      current: {
        mainCharacter: CharacterDefault,
        map: { id: 0, data: mapList[0], enemiesDefeated: 0 },
      },

      // Main Character
      mainCharacter: CharacterDefault,

      // TODO: Update other Stats

      // actions
      basicAttack: () => {
        const randomNumber = Math.random() * (0.2 - -0.8) + -0.8;
        const attack =
          useGameStore.getState().mainCharacter.stats.sideStats.attack;
        const randomAttack = Math.floor(attack + attack * randomNumber);

        useGameStore.getState().removeTargetHP(randomAttack);

        const targetName = useGameStore.getState().target.base.name;
        const targetCurrentHP = useGameStore.getState().target.current.hp;
        useGameStore
          .getState()
          .log(
            `Damaged ${targetName} in ${randomAttack} points and left with ${targetCurrentHP} Health Points.`
          );
      },
      updateStats: () => {
        useGameStore.getState().updateMainCharacterAttack();
      },
      updateMainCharacterAttack: () => {
        set((state) => {
          const charATK = getStatusATK({
            weaponClass:
              state.mainCharacter.equipment.handR?.itemData.subtype || "",
            baseLevel: state.mainCharacter.baseLevel,
            str: state.mainCharacter.stats.mainStats.strength,
            dex: state.mainCharacter.stats.mainStats.dexterity,
            luk: state.mainCharacter.stats.mainStats.luck,
          });

          const weaponATK = getWeaponATK({
            baseWeaponDamage:
              state.mainCharacter.equipment.handR?.itemData.attack || 0,
            weaponClass:
              state.mainCharacter.equipment.handR?.itemData.subtype || "",
            weaponLevel:
              state.mainCharacter.equipment.handR?.itemData.weaponLevel || 0,
            upgradeLevel:
              state.mainCharacter.equipment.handR?.upgradeLevel || 0,
            str: state.mainCharacter.stats.mainStats.strength,
            dex: state.mainCharacter.stats.mainStats.dexterity,
          });

          const result = Math.floor(charATK + weaponATK);

          return {
            ...state,
            mainCharacter: {
              ...state.mainCharacter,
              stats: {
                ...state.mainCharacter.stats,
                sideStats: {
                  ...state.mainCharacter.stats.sideStats,
                  attack: result,
                },
              },
            },
          };
        });
      },

      // Target
      target: { current: targetList[0], base: targetList[0] },

      // Actions
      setMainTarget: (newTarget: EnemyTypes) => {
        set(() => ({ target: { current: newTarget, base: newTarget } }));
      },
      removeTargetHP: (value: number) => {
        set((state) => {
          const newHpValue = state.target.current.hp - value;
          return {
            target: {
              ...state.target,
              current: { ...state.target.current, hp: newHpValue },
            },
          };
        });
      },

      // Map
      map: { id: 0, data: mapList[0], enemiesDefeated: 0 },
      setMap: (newMap) => {},

      // Utils
      logs: [],
      log: (message) => {
        const entry: LogEntry = {
          timestamp: new Date(),
          message,
        };
        set((state) => ({ logs: [...state.logs, entry].slice(-150) }));
      },
    }),
    {
      name: "game",
      // filters persisted states
      partialize: (state) =>
        Object.fromEntries(
          Object.entries(state).filter(([key]) => !["logs"].includes(key))
        ),
    }
  )
);

export default useGameStore;
