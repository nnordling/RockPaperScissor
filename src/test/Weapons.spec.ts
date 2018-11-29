import { getWeaponByName, rock} from "../classes/Weapons";

describe("Weapons", () => {
  describe("getWeaponByName",  () => {
    it("should return a Weapon", () => {
      let weaponName = "Rock";
      getWeaponByName(weaponName);

      expect(getWeaponByName(weaponName)).toBe(rock);
    });
  });
});
