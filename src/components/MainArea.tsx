import * as React from "react"

import {observer} from "mobx-react";

interface ResultProps {
  timer: string;
  result: string
}

@observer
export default class MainArea extends React.Component<ResultProps, {}> {
  public render() {
    return (
      <div className="mainArea">
        <h1 className="timer">{this.props.timer}</h1>
          <h6 className="mt-2 mb-2 text-center resultPreviousRound">{this.props.result}</h6>
      </div>
    );
  }
}