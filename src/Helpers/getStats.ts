import { refinementBonus } from "@/Data/RefinementBonus";

interface getStatusATKTypes {
  weaponClass: string;
  baseLevel: number;
  str: number;
  dex: number;
  luk: number;
}

export function getStatusATK({
  weaponClass: weaponClass,
  baseLevel: baseLevel,
  str: str,
  dex: dex,
  luk: luk,
}: getStatusATKTypes): number {
  const isDexWeapon =
    weaponClass === "Bow" ||
    weaponClass === "Gun" ||
    weaponClass === "Instrument" ||
    weaponClass === "Whip";

  if (isDexWeapon) return Math.floor(baseLevel / 4 + str / 5 + dex + luk / 3);
  else return Math.floor(baseLevel / 4 + str + dex / 5 + luk / 3);
}

interface getWeaponATKTypes {
  baseWeaponDamage: number;
  weaponClass: string;
  weaponLevel: number;
  upgradeLevel: number;
  str: number;
  dex: number;
}

export function getWeaponATK({
  baseWeaponDamage: baseWeaponDamage,
  weaponClass: weaponClass,
  weaponLevel: weaponLevel,
  upgradeLevel: upgradeLevel,
  str: str,
  dex: dex,
}: getWeaponATKTypes) {
  const Variance = getWeaponATK_Variance(baseWeaponDamage, weaponLevel);
  const StatBonus = getWeaponATK_StatBonus(
    weaponClass,
    baseWeaponDamage,
    str,
    dex
  );
  const RefinementBonus = getWeaponRefinementBonus(
    upgradeLevel,
    weaponLevel
  );

  return baseWeaponDamage + Variance + StatBonus + RefinementBonus;
}

function getWeaponATK_Variance(
  baseWeaponDamage: number,
  weaponLevel: number
): number {
  return 0.05 * weaponLevel * baseWeaponDamage;
}

function getWeaponATK_StatBonus(
  weaponClass: string,
  baseWeaponDamage: number,
  str: number,
  dex: number
): number {
  const isDexWeapon =
    weaponClass === "Bow" ||
    weaponClass === "Gun" ||
    weaponClass === "Instrument" ||
    weaponClass === "Whip";

  if (isDexWeapon) return (baseWeaponDamage * dex) / 200;
  else return (baseWeaponDamage * str) / 200;
}

function getWeaponRefinementBonus(
  upgradeLevel: number,
  weaponLevel: number
) {
  let refineBonuses;

  switch (weaponLevel) {
    case 1:
      refineBonuses = refinementBonus.weapon.level1[upgradeLevel];
      break;
    case 2:
      refineBonuses = refinementBonus.weapon.level2[upgradeLevel];
      break;
    case 3:
      refineBonuses = refinementBonus.weapon.level3[upgradeLevel];
      break;
    case 4:
      refineBonuses = refinementBonus.weapon.level4[upgradeLevel];
      break;
    default:
      refineBonuses = refinementBonus.weapon.level1[upgradeLevel];
      break;
  }

  const bonus = refineBonuses.baseBonus + refineBonuses.highUpgrade;

  return bonus;
}

interface getStatusMATKTypes {
  baseLevel: number,
  int: number,
  dex: number,
  luk: number,
}

export function getStatusMATK({
  baseLevel: baseLevel,
  int: int,
  dex: dex,
  luk: luk,
}: getStatusMATKTypes) {
  const result = Math.floor(Math.floor(baseLevel / 4) + int + Math.floor(int / 2) + Math.floor(dex / 5) + Math.floor(luk / 3))

  return result
}

interface getWeaponMATK {
  baseWeaponDamage: number,
  weaponLevel: number,
  upgradeLevel: number,
}

export function getWeaponMATK({
  baseWeaponDamage: baseWeaponDamage,
  weaponLevel: weaponLevel,
  upgradeLevel: upgradeLevel,
}: getWeaponMATK) {
  const refinemetBonus = getWeaponRefinementBonus(upgradeLevel, weaponLevel)
  const variance = (0.1 * weaponLevel) * (baseWeaponDamage + refinemetBonus)
  const result = baseWeaponDamage + variance + refinemetBonus

  return result
}

interface getSoftDefenseTypes {
  vit: number, agi: number, baseLevel: number
}

// TODO: add bonuses >> https://irowiki.org/wiki/DEF#Soft_DEF

export function getSoftDefense({
  vit: vit, agi: agi, baseLevel: baseLevel
}: getSoftDefenseTypes) {
  const result = Math.floor((vit / 2) + (agi / 5) + (baseLevel / 2))

  return result
}

interface getSoftMagicDefenseTypes {
  baseLevel: number,
  int: number,
  vit: number,
  dex: number,
}

// TODO: add bonuses >> https://irowiki.org/wiki/MDEF#Soft_MDEF

export function getSoftMagicDefense({
  baseLevel: baseLevel,
  int: int,
  vit: vit,
  dex: dex,
}: getSoftMagicDefenseTypes) {
  const result = Math.floor(int + (vit / 5) + (dex / 5) + (baseLevel / 4))

  return result
}

interface getHitRateTypes {
  baseLevel: number;
  dex: number;
  luk: number;
}

// TODO: add bonuses >> https://irowiki.org/wiki/Stats#HIT

export function getHitRate({
  baseLevel: baseLevel,
  dex: dex,
  luk: luk,
}: getHitRateTypes) {
  const result = 175 + baseLevel + dex + Math.floor(luk / 3)

  return result
}

export function getCritRate(luk:number) {
  const result = Math.floor(luk * 0.3)

  return result < 1 ? 1 : result
}