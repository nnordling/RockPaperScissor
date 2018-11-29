import { Weapon } from "./Weapons";

export default class Player {
  public weapon: Weapon | undefined;
  constructor(public name: string) {
  }

  public selectedWeapon = (weapon: Weapon) => {
    this.weapon = weapon;
  }
}
