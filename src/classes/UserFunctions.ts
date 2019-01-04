import Store from "./Store";
import { getAllWeapons, Weapon } from "./Weapons";

import { action } from "mobx";

export default class UserFunctions {
  constructor(public store: Store) {}

  @action
  public userPickWeapon = (weapon: Weapon) => {
    this.store.user.selectedWeapon(weapon);
  };

  public timer = () => {
    let weapons = ["Rock", "Paper", "Scissor", "Lizard", "Spock", "Reveal!"];
    let sec = 0;

    let timer = setInterval(
      action(() => {
        this.store.timerResult = weapons[sec];
        sec++;

        if (sec === weapons.length) {
          if (!this.store.user.isReady) {
            this.youWereTooSlow();
          }
          this.store.declareWinner(this.store.user, this.store.bot);
          clearInterval(timer);
          setTimeout(
            action(() => {
              this.timer();
            }),
            1000
          );
        }
      }),
      400
    );
  };

  @action
  public youWereTooSlow = () => {
    this.store.chooseBotStrategy(this.store.chosenBotStrategy, this.store.bot);

    let randomWeapon = getAllWeapons[Math.floor(Math.random() * getAllWeapons.length)];
    this.store.user.selectedWeapon(randomWeapon);
  };
}