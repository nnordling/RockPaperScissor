import { reaction } from "mobx";
import { observer } from "mobx-react";
import * as React from "react";

import GameSettings from "./components/GameSettings";
import ListWeapons from "./components/ListWeapons";
import MainArea from "./components/MainArea";
// import NewGameSettings from "./components/NewGameSettings";
import Scoreboard from "./components/Scoreboard";

import Store from "./classes/Store";
import UserFunctions from "./classes/UserFunctions";

import "./App.css";

@observer
class App extends React.Component {

  constructor(name: string) {
    super(name);
    reaction(
      () => this.store.user.isReady,
      isReady => {
        if (isReady) {
          this.store.declareWinner(this.store.user, this.store.bot);
        }
      }
    );
  }

  private store = new Store();
  private userFunc = new UserFunctions(this.store);

  public componentDidMount(): void {
    this.userFunc.timer();
  }

  public render() {
    return (
      <div className="flexContainer">
        <GameSettings chooseBotStrategy={this.store.chooseBotStrategy} bot={this.store.bot}/>
        <Scoreboard
          userWins={this.store.userWins}
          botWins={this.store.botWins}
          tieGames={this.store.ties}
          round={this.store.round}
          userName={this.store.user.name}
          botName={this.store.bot.name}
          playAgain={this.store.playAgain}
        />
        <MainArea timer={this.store.timerResult} result={this.store.result}/>
        <ListWeapons pickWeapon={this.userFunc.userPickWeapon} />
      </div>
    );
  }
}

export default App;
