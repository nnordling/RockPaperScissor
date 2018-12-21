import * as React from "react"

import Player from "../classes/Player";
import Store from "../classes/Store";

import { observer } from "mobx-react";

interface GameSettingsProps {
  chooseBotStrategy: (chosenBotStrategy: string, bot: Player) => void;
  bot: Player;
}

@observer
export default class NewGameSettings extends React.Component<GameSettingsProps, {}> {
  constructor(public store: Store) {
    super(store)
  }

  private pickBotStrategy = (event: any) => {
    this.props.chooseBotStrategy(event.target.value, this.props.bot);
  };

  private pickNumberOfWins = (event: any) => {
    // this.props.setTotalNumberOfWins(event.target.value);
  };

  public render() {
    return (
      <div className={"gameSettings"}>
        <h4>Choose Bot Strategy: </h4>
        <div className="botStrategy mb-2">
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="Random" onChange={this.pickBotStrategy}/>
            <label className="form-check-label" htmlFor="inlineRadio1">Random Weapon</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="Counter" onChange={this.pickBotStrategy}/>
            <label className="form-check-label" htmlFor="inlineRadio2">Counter</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="Science" onChange={this.pickBotStrategy}/>
            <label className="form-check-label" htmlFor="inlineRadio2">Science</label>
          </div>
        </div>

        <h4>First to..</h4>
        <div className="numberOfWins mb-2">
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value={1} onChange={this.pickNumberOfWins}/>
            <label className="form-check-label" htmlFor="inlineRadio1">30 Wins</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value={40} onChange={this.pickNumberOfWins}/>
            <label className="form-check-label" htmlFor="inlineRadio2">40 Wins</label>
          </div>
          <div className="form-check form-check-inline">
            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value={50} onChange={this.pickNumberOfWins}/>
            <label className="form-check-label" htmlFor="inlineRadio2">50 Wins</label>
          </div>
        </div>

        <button type="button" className="btn btn-primary">Play!</button>
      </div>
    );
  }
}