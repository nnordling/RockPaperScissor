import { observer } from "mobx-react";
import * as React from "react"

interface ScoreboardProps {
  result: string;
  userWins: number;
  botWins: number;
  tieGames: number;
  round: number;
  userName: string;
  botName: string;
}

@observer
export default class Scoreboard extends React.Component<ScoreboardProps, {}> {
  public render() {
    return (
      <div className={"scoreboard"}>
        <div>
          <h6 className="mt-2 mb-2 text-center">{this.props.result}</h6>
        </div>
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