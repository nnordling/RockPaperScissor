import { observer } from "mobx-react";
import * as React from "react"
import Player from "../classes/Player";

interface HistoryProps {
  history: Array<{round:number, result: string, winner: undefined | Player}>;
}

@observer
export default class History extends React.Component<HistoryProps, {}> {
  public render() {
    let history = this.props.history.map((hist, index) => {
      return (
        <li key={index} className="list-group-item">
          {hist.round}. {hist.result}
        </li>
      );
    });

    return (
      <div className="showHistory">
        <ul className="list-group historyList">{history}</ul>
      </div>
    );
  }
}