import * as React from "react"

interface GameSettingsProps {
  chooseBotStrategy: (chosenBotStrategy: string) => void;
}

export default class GameSettings extends React.Component<GameSettingsProps, {}> {
  private pickBotStrategy = (chosenBotStrategy: string) => {
    return () => {this.props.chooseBotStrategy(chosenBotStrategy)}
  };

  public render() {
    return (
      <div className={"gameSettings"}>
        <div className="btn-group mb-2 mt-2" role="group">
          <button type="button" className="btn btn-secondary" onClick={this.pickBotStrategy("Science")}>1</button>
          <button type="button" className="btn btn-secondary" onClick={this.pickBotStrategy("Counter")}>2</button>
          <button type="button" className="btn btn-secondary" onClick={this.pickBotStrategy("Random")}>3</button>
        </div>
      </div>
    );
  }
}