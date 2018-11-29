import { action } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";

import GameSettings from "./components/GameSettings";
import History from "./components/History";
import ListWeapons from "./components/ListWeapons";
import Scoreboard from "./components/Scoreboard";

import Player from "./classes/Player";
import Store from "./classes/Store";

import "./App.css";
import { getAllWeapons, Weapon } from "./classes/Weapons";

@observer
class App extends React.Component {
  private user = new Player("User");
  private bot = new Player("Bot");
  private store = new Store();

  public userPickWeapon = (weapon: Weapon) => {
    this.store.chooseBotStrategy(this.store.chosenBotStrategy, this.bot);
    this.user.selectedWeapon(weapon);
    this.store.playerIsReady = true;

    if (this.store.round === 0) {
      this.store.declareWinner(this.user, this.bot);
      this.timer();
    }
  };

  public timer = () => {
    let weapons = ["Rock", "Paper", "Scissor", "Lizard", "Spock", "Reveal!"];
    let sec = 0;

    let timer = setInterval(
      action(() => {
        this.store.timerResult = weapons[sec];
        sec++;

        if (sec === weapons.length) {
          if (this.store.playerIsReady) {
            this.store.declareWinner(this.user, this.bot);
          } else {
            this.youWereTooSlow();
          }
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

  public youWereTooSlow = () => {
    this.store.chooseBotStrategy(this.store.chosenBotStrategy, this.bot);
    let randomWeapon = getAllWeapons[Math.floor(Math.random() * getAllWeapons.length)];
    this.user.selectedWeapon(randomWeapon);
    this.store.declareWinner(this.user, this.bot);
  };


  public render() {
    return (
      <div className="flexContainer">
        <GameSettings
          chooseBotStrategy={this.store.chooseBotStrategy}
          bot={this.bot}
          displayBotStrategy={this.store.chosenBotStrategy}
        />
        <Scoreboard
          userWins={this.store.userWins}
          botWins={this.store.botWins}
          tieGames={this.store.ties}
          round={this.store.round}
          userName={this.user.name}
          botName={this.bot.name}
          playAgain={this.store.playAgain}
        />
        <History history={this.store.detailedHistory} />
        <div id="timer">{this.store.timerResult}</div>
        <div className="resultPreviousRound">
          <h6 className="mt-2 mb-2 text-center">{this.store.result}</h6>
        </div>
        <ListWeapons pickWeapon={this.userPickWeapon} />
      </div>
    );
  }
}

export default App;
