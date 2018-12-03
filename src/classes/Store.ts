import Player from "./Player";

import { action, observable } from "mobx";

import BotStrategy from "./BotStrategy";

export default class Store {
  private botStrategy = new BotStrategy();

  public user = new Player("User");
  public bot = new Player("Bot");
  @observable public result = "";
  @observable public userWins = 0;
  @observable public botWins = 0;
  @observable public ties = 0;
  @observable public round = 1;
  @observable public detailedHistory: Array<{ round: number; result: string; winner: Player | undefined }> = [];
  @observable public timerResult = "Prepare for combat!";
  public winner: Player | undefined;
  public chosenBotStrategy = "Science"; // Bot uses theScientificWay strategy by default

  @action
  public declareWinner = (user: Player, bot: Player) => {
    if (user.weapon !== undefined && bot.weapon !== undefined) {
      if (user.weapon.winAgainst.indexOf(bot.weapon.name) !== -1) {
        // User win
        this.resultOfRound(user, bot);
      } else if (bot.weapon.winAgainst.indexOf(user.weapon.name) !== -1) {
        // Bot win
        this.resultOfRound(bot, user);
      } else {
        // Tie
        this.resultOfRound(user, bot);
      }
    }

    this.user.isReady = false;
    this.bot.isReady = false;
  };

  @action
  public resultOfRound = (winner: Player, loser: Player) => {
    if (winner.weapon !== undefined && loser.weapon !== undefined) {
      if (winner.weapon.name === loser.weapon.name) {
        this.result = "Tie";
        this.ties += 1;
        this.round += 1;
        this.winner = undefined;
      } else {
        this.result = `${winner.weapon.name} beats ${loser.weapon.name}! ${winner.name} Wins!`;
        if (winner.name === this.user.name) {
          this.userWins += 1;
        } else {
          this.botWins += 1;
        }
        this.round += 1;
        this.winner = winner;
      }

      this.detailedHistory.push({ round: this.round, result: this.result, winner: this.winner });
    }
  };

  @action
  public playAgain = () => {
    this.chosenBotStrategy = "Science";
    this.result = "";
    this.userWins = 0;
    this.botWins = 0;
    this.ties = 0;
    this.detailedHistory = [];
    this.round = 0;
    this.timerResult = "Prepare for combat!";
  };

  public chooseBotStrategy = (chosenBotStrategy: string, bot: Player) => {
    this.chosenBotStrategy = chosenBotStrategy;

    if (chosenBotStrategy === "Counter") {
      this.botStrategy.counterPreviousWinner(this.detailedHistory, bot);
    } else if (chosenBotStrategy === "Science") {
      this.botStrategy.theScientificWay(this.detailedHistory, bot);
    } else {
      this.botStrategy.randomWeapon(bot);
    }
  };
}