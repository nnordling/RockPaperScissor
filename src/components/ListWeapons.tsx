import * as React from "react";

import { getAllWeapons, Weapon } from "../classes/Weapons";

export default class ListWeapons extends React.Component<any, {}> {
  private handlePickWeapon = (weapon: Weapon) => {
    return () => {
      this.props.pickWeapon(weapon);
    };
  };

  public render() {
    let weapons = getAllWeapons.map((weapon, index) => {
      return (
        <button
          key={index}
          onClick={this.handlePickWeapon(weapon)}
          type="button"
          className="btn btn-outline-secondary"
        >
          <img src={weapon.img} alt="Rock" height="48px" width="48px" />
        </button>
      );
    });
    return (
      <div className="listWeapons">
        <div className="btn-group" role="group">
          {weapons}
        </div>
      </div>
    );
  }
}
