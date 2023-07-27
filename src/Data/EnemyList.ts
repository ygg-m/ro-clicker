// import PoringIdle from "@/Assets/Enemy/Idle/1002.gif";

export const targetList = [
  {
    id: 1002,
    name: "Poring",
    level: 1,
    race: "Plant",
    property: "Water 1",
    size: "Medium",
    hp: 50,
    sp: 10,
    maps: [
      {
        mapID: 0,
        ammount: 80,
      },
    ],
    mode: ["Looter"],
    sprites: {
      idle: require("@/Assets/Enemy/Idle/1002.gif"),
      attack: require("@/Assets/Enemy/Idle/1002.gif"),
      receiveDamage: require("@/Assets/Enemy/Idle/1002.gif"),
      death: require("@/Assets/Enemy/Idle/1002.gif"),
    },
    stats: {
      mainStats: {
        strength: 1,
        inteligence: 0,
        agility: 1,
        dexterity: 1,
        vitality: 6,
        luck: 30,
      },
      baseStats: {
        healthPoints: 50,
        hitRateNeededTo100: 22,
        fleeRateNeededTo95: 82,
        attackDelay: 1.87,
        attack: 8,
        defense: 0,
        magicDefense: 5,
      },
    },
    rewards: {
      baseExperience: 60,
      jobExperience: 30,
      itemDrops: [
        {
          itemID: 512,
          chance: 10,
        },
        {
          itemID: 512,
          chance: 1.5,
        },
        {
          itemID: 619,
          chance: 0.2,
        },
        {
          itemID: 713,
          chance: 15,
        },
        {
          itemID: 909,
          chance: 70,
        },
        {
          itemID: 938,
          chance: 4,
        },
        {
          itemID: 1202,
          chance: 1,
        },
        {
          itemID: 4001,
          chance: 0.01,
        },
      ],
    },
    skills: [
      {
        skillID: 1,
        level: 1,
      },
    ],
  },
  {
    id: 1007,
    name: "Fabre",
    level: 2,
    race: "Insect",
    property: "Earth 1",
    size: "Small",
    hp: 63,
    sp: 15,
    maps: [
      {
        mapID: 0,
        ammount: 40,
      },
    ],
    mode: ["Detector"],
    sprites: {
      idle: require("@/Assets/Enemy/Idle/1007.gif"),
      attack: require("@/Assets/Enemy/Idle/1007.gif"),
      receiveDamage: require("@/Assets/Enemy/Idle/1007.gif"),
      death: require("@/Assets/Enemy/Idle/1007.gif"),
    },
    stats: {
      mainStats: {
        strength: 1,
        inteligence: 0,
        agility: 2,
        dexterity: 7,
        vitality: 4,
        luck: 5,
      },
      baseStats: {
        healthPoints: 63,
        hitRateNeededTo100: 24,
        fleeRateNeededTo95: 84,
        attackDelay: 1.67,
        attack: 9,
        defense: 0,
        magicDefense: 0,
      },
    },
    rewards: {
      baseExperience: 90,
      jobExperience: 60,
      itemDrops: [
        {
          itemID: 511,
          chance: 7,
        },
        {
          itemID: 705,
          chance: 10,
        },
        {
          itemID: 721,
          chance: 0.05,
        },
        {
          itemID: 914,
          chance: 65,
        },
        {
          itemID: 949,
          chance: 5,
        },
        {
          itemID: 1501,
          chance: 2,
        },
        {
          itemID: 1502,
          chance: 0.08,
        },
        {
          itemID: 4002,
          chance: 0.01,
        },
      ],
    },
    skills: [
      {
        skillID: 1,
        level: 1,
      },
    ],
  },
];
