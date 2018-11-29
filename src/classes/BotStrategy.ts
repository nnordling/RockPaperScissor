import Player from "./Player";
import { getAllWeapons, getWeaponByName, lizard, paper, rock, scissor, spock, Weapon } from "./Weapons";

export default class BotStrategy {
  public randomWeapon = (bot: Player) => {
    // Bot picks a weapon at random
    let randomWeapon = getAllWeapons[Math.floor(Math.random() * getAllWeapons.length)];
    bot.selectedWeapon(randomWeapon);
  };

  public counterPreviousWinner = (
    detailedHistory: Array<{ round: number; result: string; winner: Player | undefined }>,
    bot: Player
  ) => {
    // Bot have a bigger chance of picking a weapon that would've beaten the previous winning weapon
    if (detailedHistory.length > 0) {
      detailedHistory.map(history => {
        // Return this.randomWeapon(bot) if history.winner or history.winner.weapon === undefined
        if (history.winner !== undefined) {
          if (history.winner.weapon !== undefined) {
            let weaponsArray = [rock, paper, scissor, lizard, spock];
            history.winner.weapon.loseAgainst.map(selectWeapon => {
              let weapons = getWeaponByName(selectWeapon);

              weaponsArray.push(weapons);
            });
            bot.selectedWeapon(weaponsArray[Math.floor(Math.random() * weaponsArray.length)]);
          }
        }
      });
    } else {
      this.randomWeapon(bot);
    }
  };

  public theScientificWay = (
      detailedHistory: Array<{ round: number; result: string; winner: Player | undefined }>,
      bot: Player
    ) => {
      let beatPreviousWinner: Weapon[] = [];
      if (detailedHistory.length > 0) {
        let previousRound = detailedHistory[detailedHistory.length - 1];
        if (previousRound.winner !== undefined) {
          if (previousRound.winner.weapon !== undefined) {
            if (previousRound.winner.name !== bot.name) {
              // Bot lost previous round and will pick a weapon that would've beaten the winner of previous round
              previousRound.winner.weapon.loseAgainst.map(weapon => {
                let weapons = getWeaponByName(weapon);
                if (weapons !== undefined)  {
                  beatPreviousWinner.push(weapons);
                }
              });
              bot.selectedWeapon(beatPreviousWinner[Math.floor(Math.random() * beatPreviousWinner.length)]);
              return;

            } else if (previousRound.winner.name === bot.name) {
              // Bot won previous round (i.e Rock)
              // User will most likely play something that would beat Bot's previous winning hand (Paper, Spock)
              // Therefor Bot will anticipate and counter that move (Scissor, Lizard, Lizard, Paper)
              let anticipateUserPick: Weapon[] = [];
              let botWeaponPool: Weapon[] = [];
              previousRound.winner.weapon.loseAgainst.map(weapon => {
                anticipateUserPick.push(getWeaponByName(weapon));
              });

              anticipateUserPick.map(userWeapon => {
                userWeapon.loseAgainst.map(weapon => {
                  botWeaponPool.push(getWeaponByName(weapon));
                });
              });

              bot.selectedWeapon(botWeaponPool[Math.floor(Math.random() * botWeaponPool.length)]);
              return;
            }
          }
        }
      }
      this.randomWeapon(bot);
  };
}
