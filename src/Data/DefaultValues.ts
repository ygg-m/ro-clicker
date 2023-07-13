import { ItemTypes } from "@/Types/Item";
import { armorList, weaponList } from "./EquipList";

  export const ClickDefault = {
    power: 1,
  };
  export const CountDefault = {
    clicks: 0,
    points: 0,
  };

  const CharEquipmentDefaultHandR = {
    itemData: weaponList.find(e => e.id === 1201) as ItemTypes,
    upgradeLevel: 7,
    cards: [],
    enchants: []
  }

  const CharEquipmentDefaultBody = {
    itemData: armorList.find(e => e.id === 2301) as ItemTypes,
    upgradeLevel: 4,
    cards: [],
    enchants: []
  }

  export const CharEquipmentDefault = {
    headTop: null,
    headMid: null,
    headBottom: null,
    body: CharEquipmentDefaultBody,
    handR: CharEquipmentDefaultHandR,
    handL: null,
    robe: null,
    shoes: null,
    accessoryR: null,
    accessoryL: null,
  }



  export const CharStatsDefault = {
    baseStats: {
      healthPoints: 40,
      totalHealthPoints: 40,
      spiritPoints: 11,
      totalSpiritPoints: 11,
      weight: 0,
      totalWeight: 2030,
      zeny: 1000,
      bonus: {
        totalHealthPoints: 0,
        totalSpiritPoints: 0,
        totalWeight: 0,
      }
    },
    mainStats: {
      strength: 1,
      agility: 1,
      vitality: 1,
      intelligence: 1,
      dexterity: 1,
      luck: 1,
      bonus: {
        strength: 0,
        agility: 0,
        vitality: 0,
        intelligence: 0,
        dexterity: 0,
        luck: 0,
      }
    },
    sideStats: {
      attack: 1,
      magicAttack: 1,
      hitRate: 2,
      critRate: 1,
      defense: 0,
      magicDefense: 0,
      fleeRate: 2,
      attackSpeed: 150,
      bonus: {
        attack: 0,
        magicAttack: 0,
        hitRate: 0,
        critRate: 0,
        defense: 0,
        magicDefense: 0,
        fleeRate: 0,
        attackSpeed: 0,
      }
    },
  }

  export const CharJobDefault = {
    name: "Novice",
    statsBonus: {
      strength: 0,
      agility: 0,
      vitality: 0,
      intelligence: 0,
      dexterity: 0,
      luck: 0,
    },
    baseSkills: [],
  }

  export const CharacterDefault = {
    name: "Ygg",
    job: 0,
    baseLevel: 1,
    baseExp: 0,
    jobLevel: 1,
    jobExp: 0,
    equipment: CharEquipmentDefault,
    stats: CharStatsDefault,
    statPoints: 48,
    skills: [{skillID: 0, acquiredLevel: 0}],
    skillPoints: 0,
  }


  export const CurrentDefault = {
    target: {
      id: 1002,
      healthPoints: 50,
    },
    map: { id: 0, enemiesDefeated: 0 },
    character: CharacterDefault,
  };