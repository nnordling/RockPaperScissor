import { action, observable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";

import GameSettings from "./components/GameSettings";
import History from "./components/History";
import ListWeapons from "./components/ListWeapons";
// import NewGameSettings from "./components/NewGameSettings";
import Scoreboard from "./components/Scoreboard";

import BotStrategy from "./classes/BotStrategy";
import Player from "./classes/Player";
import { getAllWeapons, Weapon } from "./classes/Weapons";

import "./App.css";

@observer
class App extends React.Component {
  @observable private result = "";
  @observable private userWins = 0;
  @observable private botWins = 0;
  @observable private ties = 0;
  @observable private round = 0;
  @observable private detailedHistory: Array<{ round: number; result: string; winner: Player | undefined }> = [];
  @observable private timerResult = "Prepare for combat!";
  private winner: Player | undefined;
  private chosenBotStrategy = "Science"; // Bot uses theScientificWay strategy by default
  private playerIsReady = false;

  @action
  private declareWinner = () => {
    if (this.user.weapon !== undefined && this.bot.weapon !== undefined) {
      if (this.user.weapon.winAgainst.indexOf(this.bot.weapon.name) !== -1) {
        // User win
        this.resultOfRound(this.user, this.bot);
      } else if (this.bot.weapon.winAgainst.indexOf(this.user.weapon.name) !== -1) {
        // Bot win
        this.resultOfRound(this.bot, this.user);
      } else {
        // Tie
        this.resultOfRound(this.user, this.bot);
      }
    }
  };

  private resultOfRound = (winner: Player, loser: Player) => {
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
      this.playerIsReady = false;
    }
  };

  private userPickWeapon = (weapon: Weapon) => {
    this.chooseBotStrategy(this.chosenBotStrategy);
    this.user.selectedWeapon(weapon);
    this.playerIsReady = true;

    if (this.round === 0) {
      this.declareWinner();
      this.timer();
    }
  };

  @action
  private playAgain = () => {
    this.chosenBotStrategy = "Science";
    this.result = "";
    this.userWins = 0;
    this.botWins = 0;
    this.ties = 0;
    this.detailedHistory = [];
    this.round = 0;
    this.timerResult = "Prepare for combat!";
  };

  private chooseBotStrategy = (chosenBotStrategy: string) => {
    this.chosenBotStrategy = chosenBotStrategy;

    if (chosenBotStrategy === "Counter") {
      this.botStrategy.counterPreviousWinner(this.detailedHistory, this.bot);
    } else if (chosenBotStrategy === "Science") {
      this.botStrategy.theScientificWay(this.detailedHistory, this.bot);
    } else {
      this.botStrategy.randomWeapon(this.bot);
    }
  };

  private timer = () => {
    let weapons = ["Reveal!", "Spock", "Lizard", "Scissor", "Paper", "Rock"];
    let sec = weapons.length -1;

    let timer = setInterval(action(() => {
      this.timerResult = weapons[sec];
      sec--;

      if (sec < 0) {
        if (this.playerIsReady) {
          this.declareWinner();
        } else {
          this.youWereTooSlow();
        }
        clearInterval(timer);
        setTimeout(action(() => {
          this.timer();
        }), 1000);
      }
    }), 400);
  };

  private youWereTooSlow = () => {
    this.chooseBotStrategy(this.chosenBotStrategy);
    let randomWeapon = getAllWeapons[Math.floor(Math.random() * getAllWeapons.length)];
    this.user.selectedWeapon(randomWeapon);
    this.declareWinner();
  };

  public render() {
    return (
      <div className="flexContainer">
        <GameSettings chooseBotStrategy={this.chooseBotStrategy} />
        <Scoreboard
          userWins={this.userWins}
          botWins={this.botWins}
          tieGames={this.ties}
          round={this.round}
          userName={this.user.name}
          botName={this.bot.name}
          playAgain={this.playAgain}
        />
        <History history={this.detailedHistory} />
        <div id="timer">{this.timerResult}</div>
        <div className="resultPreviousRound">
          <h6 className="mt-2 mb-2 text-center">{this.result}</h6>
        </div>
        <ListWeapons pickWeapon={this.userPickWeapon} />
      </div>
    );
  }
}

export default App;