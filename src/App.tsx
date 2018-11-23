import { action, observable } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";

import GameSettings from "./components/GameSettings"
import History from "./components/History";
import ListWeapons from "./components/ListWeapons";
import Scoreboard from "./components/Scoreboard";

import BotStrategy from "./classes/BotStrategy";
import Player from "./classes/Player";
import { lizard, paper, rock, scissor, spock, Weapon } from "./classes/Weapons";

import "./App.css";

let bot = new Player("Bot", "", []);
let user = new Player("User", "", []);
let botStrategy = new BotStrategy();

@observer
class App extends React.Component {
  @observable private result = "";
  @observable private userWins = 0;
  @observable private botWins = 0;
  @observable private ties = 0;
  @observable private round = 0;
  @observable private detailedHistory: Array<{round: number, result: string, winner: undefined | Player}> = [];
  @observable private winner: undefined | Player;
  @observable private winnerHistory: Weapon[] = [];
  @observable private difficulty = "Random"; // Random strategy by default
  @observable private playerIsReady = false;

  @action
  private declareWinner = () => {
    if (user.winAgainst.indexOf(bot.weapon) !== -1) {
      this.resultOfRound(user, bot);
      console.log(this.detailedHistory);
    } else if (bot.winAgainst.indexOf(user.weapon) !== -1) {
      this.resultOfRound(bot, user);
      console.log(this.detailedHistory);
    } else {
      this.result = "Tie";
      this.ties += 1;
      this.round += 1;
      this.winner = undefined;
    }

    this.detailedHistory.push({round: this.round, result: this.result, winner: this.winner});
    this.playerIsReady = false;

    if (this.userWins === 30) {
      alert(`${user.name} wins in ${this.round - 1} rounds! W: ${this.userWins} L: ${this.botWins} T: ${this.ties}`);
      this.playAgain();
    } else if (this.botWins === 30) {
      alert(`${bot.name} wins in ${this.round - 1} rounds! W: ${this.botWins} L: ${this.userWins} T: ${this.ties}`);
      this.playAgain();
    }
  };

  private resultOfRound = (winner: Player, loser: Player) => {
    this.result = `${winner.weapon} beats ${loser.weapon}! ${winner.name} Wins!`;
    if (winner.name === user.name) {
      this.userWins += 1;
    } else {
      this.botWins += 1;
    }
    this.round += 1;
    this.winner = winner;
    this.pushWinnerWeaponToHistory(winner.weapon);
  };

  private userPickWeapon = (weapon: Weapon) => {
    user.winAgainst = [];

    user.weapon = weapon.name;
    user.winAgainst = weapon.winAgainst;

    this.playerIsReady = true;
    console.log("difficulty", this.difficulty);

    if (this.playerIsReady) {
      this.botDifficulty(this.difficulty);
      this.declareWinner();
    }
  };

  private pushWinnerWeaponToHistory = (weapon: string) => {
    switch (weapon) {
      case ("Rock"): {
        this.winnerHistory.push(rock);
        break;
      }
      case ("Paper"): {
        this.winnerHistory.push(paper);
        break;
      }
      case ("Scissor"): {
        this.winnerHistory.push(scissor);
        break;
      }
      case ("Lizard"): {
        this.winnerHistory.push(lizard);
        break;
      }
      case ("Spock"): {
        this.winnerHistory.push(spock);
        break;
      }
    }
  };

  private playAgain = () => {
    this.result = "";
    this.userWins = 0;
    this.botWins = 0;
    this.ties = 0;
    this.detailedHistory = [];
    this.round = 0;
    this.winnerHistory = [];
    this.winner = undefined;
    this.difficulty = "";
  };

  private botDifficulty = (difficulty: string) => {
    this.difficulty = difficulty;
    if (this.playerIsReady) {
      if (difficulty === "WinBased") {
        botStrategy.mostWinsWeapon(this.winnerHistory, bot);
      } else if (difficulty === "PreviousWinner") {
        botStrategy.previousWinnerPattern(this.winnerHistory, bot);
      } else if (difficulty === "Dynamic") {
        botStrategy.dynamicPattern(this.winnerHistory, bot);
      } else {
        botStrategy.randomWeapon(bot);
      }
    }
  };

  public render() {
    return (
      <div className="App">
          <ListWeapons pickWeapon={this.userPickWeapon} />
          <Scoreboard result={this.result} userWins={this.userWins} botWins={this.botWins} tieGames={this.ties} round={this.round} userName={user.name} botName={bot.name}/>
          <GameSettings difficulty={this.botDifficulty}/>
          <History history={this.detailedHistory} />
      </div>
    );
  }
}

export default App;