import * as React from "react"
import Player from "../classes/Player";

import { observer } from "mobx-react";

interface GameSettingsProps {
  chooseBotStrategy: (chosenBotStrategy: string, bot: Player) => void;
  bot: Player;
  displayBotStrategy: string;
}

@observer
export default class GameSettings extends React.Component<GameSettingsProps, {}> {
  private pickBotStrategy = (chosenBotStrategy: string) => {
    return () => {this.props.chooseBotStrategy(chosenBotStrategy, this.props.bot)}
  };

  public render() {
    return (
      <div className={"gameSettings"}>
        <div>{this.props.displayBotStrategy}</div>
        <div className="btn-group mb-2 mt-2" role="group">
          <button type="button" className="btn btn-secondary" onClick={this.pickBotStrategy("Science")}>1</button>
          <button type="button" className="btn btn-secondary" onClick={this.pickBotStrategy("Counter")}>2</button>
          <button type="button" className="btn btn-secondary" onClick={this.pickBotStrategy("Random")}>3</button>
        </div>
      </div>
    );
  }
}