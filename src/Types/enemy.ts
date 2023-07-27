export interface EnemyTypes {
  id: number;
  name: string;
  level: number;
  race: string;
  property: string;
  size: string;
  hp: number;
  sp: number;
  sprites: {
    idle: string;
    attack: string;
    receiveDamage: string;
    death: string;
  };
  stats: EnemyStats;
  rewards: EnemyRewards;
  skills: EnemySkill[];
}

export interface EnemyRewards {
  baseExperience: number;
  jobExperience: number;
  itemDrops: EnemyDrop[];
}

export interface EnemyDrop {
  itemID: number;
  chance: number;
}

export interface EnemySkill {
  skillID: number;
  level: number;
}

export interface EnemyStats {
  baseStats: {
    healthPoints: number;
    hitRateNeededTo100: number;
    fleeRateNeededTo95: number;
    attackDelay: number;
    attack: number;
    defense: number;
    magicDefense: number;
  };
  mainStats: {
    strength: number;
    inteligence: number;
    agility: number;
    dexterity: number;
    vitality: number;
    luck: number;
  };
}
