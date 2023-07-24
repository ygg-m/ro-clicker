import { damageTarget } from "./damageTarget";

export function basicAttack(currentAttack: number) {
  const randomNumber = Math.random() * (0.2 - -0.8) + -0.8;
  const attack = currentAttack;
  const randomAttack = Math.floor(attack + attack * randomNumber);

  damageTarget(randomAttack);
}
