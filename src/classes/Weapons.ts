import lizardImg from "../images/lizard.png";
import paperImg from "../images/paper.jpg";
import rockImg from "../images/rock.png";
import scissorImg from "../images/scissors.jpg";
import spockImg from "../images/spock.png";

export const enum WeaponName {
  Rock = "Rock",
  Paper = "Paper",
  Scissor = "Scissor",
  Lizard = "Lizard",
  Spock = "Spock"
}

export class Weapon {
  constructor(
    public readonly name: WeaponName,
    public readonly winAgainst: WeaponName[],
    public readonly loseAgainst: WeaponName[],
    public readonly img: string
  ) {}
}

export const rock = new Weapon(
  WeaponName.Rock,
  [WeaponName.Scissor, WeaponName.Lizard],
  [WeaponName.Paper, WeaponName.Spock],
  rockImg
);
export const paper = new Weapon(
  WeaponName.Paper,
  [WeaponName.Rock, WeaponName.Spock],
  [WeaponName.Scissor, WeaponName.Lizard],
  paperImg
);
export const scissor = new Weapon(
  WeaponName.Scissor,
  [WeaponName.Paper, WeaponName.Lizard],
  [WeaponName.Rock, WeaponName.Spock],
  scissorImg
);
export const lizard = new Weapon(
  WeaponName.Lizard,
  [WeaponName.Spock, WeaponName.Paper],
  [WeaponName.Rock, WeaponName.Scissor],
  lizardImg
);
export const spock = new Weapon(
  WeaponName.Spock,
  [WeaponName.Scissor, WeaponName.Rock],
  [WeaponName.Lizard, WeaponName.Paper],
  spockImg
);

export const getAllWeapons = [rock, paper, scissor, lizard, spock];

export function getWeaponByName(weaponName: string): Weapon {
  const weapon = getAllWeapons.find(selectWeapon => selectWeapon.name === weaponName);

  if (!weapon) {
    // Should never happen
    throw Error("Couldn't find a weapon. Something went terribly wrong");
  }

  return weapon;
}
