import Player from "./Player";
import { getAllWeapons, lizard, paper, rock, scissor, spock, Weapon, WeaponName } from "./Weapons";


export default class BotStrategy {
  public randomWeapon = (bot: Player) => {
    console.log("Random");
    bot.winAgainst = [];

    let randomWeapon = getAllWeapons[Math.floor(Math.random() * getAllWeapons.length)];

    bot.weapon = randomWeapon.name;
    // randomWeapon.winAgainst.map(weapon => bot.winAgainst.push(weapon));
    bot.winAgainst = randomWeapon.winAgainst;
    console.log("bot winAgainst", bot.winAgainst);
    // console.log("=", bot.winAgainst = randomWeapon.winAgainst);
    // console.log("push", randomWeapon.winAgainst.map(weapon => bot.winAgainst.push(weapon)))
  };

  public mostWinsWeapon = (winnerHistory: Weapon[], bot: Player) => {
    console.log("Most Wins");
    bot.winAgainst = [];
    let rockWins = winnerHistory.filter(rock => rock.name === WeaponName.Rock);
    let paperWins = winnerHistory.filter(paper => paper.name === WeaponName.Paper);
    let scissorWins = winnerHistory.filter(scissor => scissor.name === WeaponName.Scissor);
    let lizardWins = winnerHistory.filter(lizard => lizard.name === WeaponName.Lizard);
    let spockWins = winnerHistory.filter(spock => spock.name === WeaponName.Spock);

    let history = [rockWins, paperWins, scissorWins, lizardWins, spockWins];
    let mostWins = history.sort((a: Weapon[], b: Weapon[]) => b.length - a.length);
    console.log(mostWins.length);
    mostWins.length === 0
      ? this.randomWeapon(bot)
      : mostWins[0].map(weapon => {
        bot.weapon = weapon.name;
        bot.winAgainst = weapon.winAgainst;
        console.log(bot.winAgainst);
      });
  };

  public previousWinnerPattern = (winnerHistory: Weapon[], bot: Player) => {
    console.log("PreviousWinner");
    bot.winAgainst = [];
    if (winnerHistory.length !== 0) {
      console.log(winnerHistory);
      let previousWin = winnerHistory[winnerHistory.length - 1];
      this.getPreviousWinnerWeapon(previousWin.name, bot);
    } else {
      this.randomWeapon(bot);
    }
  };

  public getPreviousWinnerWeapon = (weapon: string, bot: Player) => {
    switch (weapon) {
      case ("Rock"): {
        bot.weapon = rock.name;
        rock.winAgainst.map(rockWin => {
          bot.winAgainst.push(rockWin)
        });
        break;
      }
      case ("Paper"): {
        bot.weapon =  paper.name;
        paper.winAgainst.map(paperWin => {
          bot.winAgainst.push(paperWin)
        });
        break;
      }
      case ("Scissor"): {
        bot.weapon =  scissor.name;
        scissor.winAgainst.map(scissorWin => {
          bot.winAgainst.push(scissorWin)
        });
        break;
      }
      case ("Lizard"): {
        bot.weapon =  lizard.name;
        lizard.winAgainst.map(lizardWin => {
          bot.winAgainst.push(lizardWin)
        });
        break;
      }
      case ("Spock"): {
        bot.weapon =  spock.name;
        spock.winAgainst.map(spockWin => {
          bot.winAgainst.push(spockWin)
        });
        break;
      }
    }
  };

  public dynamicPattern = (winnerHistory: Weapon[], bot: Player) => {

    console.log(winnerHistory, bot);
  }
}