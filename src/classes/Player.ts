import { Weapon } from "./Weapons";

import { action, observable } from "mobx";

export default class Player {
  public weapon: Weapon | undefined;
  @observable public isReady = false;

  constructor(public name: string) {}

  @action
  public selectedWeapon = (weapon: Weapon) => {
    this.weapon = weapon;

    if (weapon !== undefined) {
      this.isReady = true;
    }
  };
}
