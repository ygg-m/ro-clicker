import { Character } from "./Character/Base";
import { EquipmentSlotTypes } from "./Character/Equipment";
import { ItemTypes } from "./Item";

export interface CurrentTypes {
  character: Character;
  target: {
    id: number;
    healthPoints: number;
  };
  map: {
    id: number;
    enemiesDefeated: number;
  };
}

export interface ClickTypes {
  power: number;
}

export interface CountTypes {
  clicks: number;
  points: number;
}

export interface DetailWindowData {
  x: number;
  y: number;
  equipData?: EquipmentSlotTypes,
  itemData?: ItemTypes
};

export interface DetailData {

}

export interface MapTypes {
  id: number;
  data: MapDataTypes;
  enemiesDefeated: number;
}

interface MapDataTypes {
  id: number,
  nameID: string,
  name: string,
  image: string,
  monsterList: 
      {
          id: number,
          quantity: number,
          respawnTime: number,
      }[]
}
