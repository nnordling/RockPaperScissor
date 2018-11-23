import lizardImg from "../images/lizard.png"
import paperImg from "../images/paper.jpg";
import rockImg from "../images/rock.png";
import scissorImg from "../images/scissors.jpg";
import spockImg from "../images/spock.png"

export const enum WeaponName {
  Rock = "Rock",
  Paper = "Paper",
  Scissor = "Scissor",
  Lizard = "Lizard",
  Spock = "Spock"
}

export class Weapon {
  constructor(public id: number, public name: WeaponName, public winAgainst: WeaponName[], public img: string) {}
}

export const rock = new Weapon(0, WeaponName.Rock, [WeaponName.Scissor, WeaponName.Lizard], rockImg);
export const paper = new Weapon(1, WeaponName.Paper, [WeaponName.Rock, WeaponName.Spock], paperImg);
export const scissor = new Weapon(2, WeaponName.Scissor, [WeaponName.Paper, WeaponName.Lizard], scissorImg);
export const lizard = new Weapon(3, WeaponName.Lizard, [WeaponName.Spock, WeaponName.Paper], lizardImg);
export const spock = new Weapon(4, WeaponName.Spock, [WeaponName.Scissor, WeaponName.Rock], spockImg);

export const getAllWeapons = [rock, paper, scissor, lizard, spock];
