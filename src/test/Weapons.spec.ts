import { getWeaponByName, lizard, paper, rock, scissor, spock } from "../classes/Weapons";

describe("Weapons", () => {
  describe("getWeaponByName",  () => {
    it("should return Rock", () => {
      expect(getWeaponByName("Rock")).toBe(rock);
    });

    it("should return Paper", () => {
      expect(getWeaponByName("Paper")).toBe(paper);
    });

    it("should return Scissor", () => {
      expect(getWeaponByName("Scissor")).toBe(scissor);
    });

    it("should return Lizard", () => {
      expect(getWeaponByName("Lizard")).toBe(lizard);
    });

    it("should return Spock", () => {
      expect(getWeaponByName("Spock")).toBe(spock);
    });

  });
});
