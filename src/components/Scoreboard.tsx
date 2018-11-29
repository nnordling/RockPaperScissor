import { observer } from "mobx-react";
import * as React from "react"

interface ScoreboardProps {
  userWins: number;
  botWins: number;
  tieGames: number;
  round: number;
  userName: string;
  botName: string;
  playAgain: () => void
}

@observer
export default class Scoreboard extends React.Component<ScoreboardProps, {}> {
  // private showSettings = true;
  // private showScoreboard = false;

  public render() {
    if (this.props.userWins === 50) {
      alert(`${this.props.userName} wins in ${this.props.round} rounds! W: ${this.props.userWins} L: ${this.props.botWins} T: ${this.props.tieGames}`);
      this.props.playAgain();
    } else if (this.props.botWins === 50) {
      alert(`${this.props.botName} wins in ${this.props.round} rounds! W: ${this.props.botWins} L: ${this.props.userWins} T: ${this.props.tieGames}`);
      this.props.playAgain();
    }

    return (
      <div className={"scoreboard"}>
        <ul className="list-group">
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Round:
            <span className="badge badge-primary badge-pill">
              {this.props.round + 1}
            </span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            {this.props.userName} Wins:
            <span className="badge badge-success badge-pill">
              {this.props.userWins}
            </span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            {this.props.botName} Wins:
            <span className="badge badge-danger badge-pill">
              {this.props.botWins}
            </span>
          </li>
          <li className="list-group-item d-flex justify-content-between align-items-center">
            Ties:
            <span className="badge badge-warning badge-pill">
              {this.props.tieGames}
            </span>
          </li>
        </ul>
      </div>
    );
  }
}