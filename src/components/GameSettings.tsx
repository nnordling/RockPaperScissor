import * as React from "react"

interface GameSettingsProps {
  difficulty: (difficulty: string) => void;
}

export default class GameSettings extends React.Component<GameSettingsProps, {}> {
  private pickDifficulty = (difficulty: string) => {
    return () => {this.props.difficulty(difficulty)}
  };

  public render() {
    return (
      <div className={"gameSettings"}>
        <div className="btn-group" role="group">
          <button type="button" className="btn btn-secondary" onClick={this.pickDifficulty("Random")}>Random</button>
          <button type="button" className="btn btn-secondary" onClick={this.pickDifficulty("WinBased")}>Pattern 1</button>
          <button type="button" className="btn btn-secondary" onClick={this.pickDifficulty("PreviousWinner")}>Pattern 2</button>
          <button type="button" className="btn btn-secondary" onClick={this.pickDifficulty("Dynamic")}>Pattern 3</button>
        </div>
      </div>
    );
  }
}