import Store from "../classes/Store";
import UserFunctions from "../classes/UserFunctions";
import { lizard, paper, rock, scissor, spock } from "../classes/Weapons";

describe("UserFunctions", () => {
  describe("userPickWeapon", () => {
    let store = new Store();
    let userFuncs = new UserFunctions(store);

    it("should set User weapon to Rock", () => {
      userFuncs.userPickWeapon(rock);
      expect(store.user.weapon).toBe(rock);
    });

    it("should set User weapon to Paper", () => {
      userFuncs.userPickWeapon(paper);
      expect(store.user.weapon).toBe(paper);
    });

    it("should set User weapon to Scissor", () => {
      userFuncs.userPickWeapon(scissor);
      expect(store.user.weapon).toBe(scissor);
    });

    it("should set User weapon to Lizard", () => {
      userFuncs.userPickWeapon(lizard);
      expect(store.user.weapon).toBe(lizard);
    });

    it("should set User weapon to Spock", () => {
      userFuncs.userPickWeapon(spock);
      expect(store.user.weapon).toBe(spock);
    });
  });
});
