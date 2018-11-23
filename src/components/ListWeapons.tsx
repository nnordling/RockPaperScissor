import * as React from "react";

import { getAllWeapons, Weapon } from "../classes/Weapons";

export default class ListWeapons extends React.Component<any, {}> {
  private handlePickWeapon = (weapon: Weapon) => {
    return () => {
      this.props.pickWeapon(weapon);
    };
  };

  public render() {
    let weapons = getAllWeapons.map(weapon => {
      return (
        <button
          key={weapon.id}
          onClick={this.handlePickWeapon(weapon)}
          type="button"
          className="btn btn-outline-secondary"
        >
          <img src={weapon.img} alt="Rock" height="48px" width="48px" />
        </button>
      );
    });
    return (
      <div className="weapons">
        <div className="btn-group mt-2" role="group">
          {weapons}
        </div>
      </div>
    );
  }
}
