import BotStrategy from "../classes/BotStrategy";
import Player from "../classes/Player";
import { paper, rock, scissor } from "../classes/Weapons";

describe("BotStrategy", () => {
  describe("counterPreviousWinner", () => {
    it("should call randomWeapon() if detailedHistory < 0", () => {
      let detailedHistory: Array<{ round: number; result: string; winner: Player }> = [];
      let bot = new Player("Bot");
      let botStrat = new BotStrategy();
      botStrat.randomWeapon = jest.fn();

      botStrat.counterPreviousWinner(detailedHistory, bot);
      expect(botStrat.randomWeapon).toBeCalled();
    });

    it("should return weapon that would've beat previous winner", () => {
      let detailedHistory: Array<{ round: number; result: string; winner: Player }> = [];
      let user1 = new Player("User");
      let bot = new Player("Bot");
      let botStrat = new BotStrategy();

      user1.weapon = undefined;

      detailedHistory.push({ round: 1, result: "string", winner: user1 });
      botStrat.counterPreviousWinner(detailedHistory, bot);
      expect(bot.weapon).toBe(undefined);
    });
  });

  describe("theScientificWay", () => {
    it("should play weapon that would've beat previous winner", () => {
      let detailedHistory: Array<{ round: number; result: string; winner: Player }> = [];
      let user2 = new Player("User");
      let bot = new Player("Bot");
      let botStrat = new BotStrategy();

      user2.weapon = rock;
      Math.random = jest.fn(() => 0);

      detailedHistory.push({ round: 1, result: "string", winner: user2 });
      botStrat.theScientificWay(detailedHistory, bot);
      expect(bot.weapon).toBe(paper);
    });

    it("should anticipate user weapon and counter", () => {
      let detailedHistory: Array<{ round: number; result: string; winner: Player }> = [];
      let bot = new Player("Bot");
      let prevWinner = new Player("Bot");
      let botStrat = new BotStrategy();

      Math.random = jest.fn(() => 0);

      prevWinner.weapon = rock;
      detailedHistory.push({ round: 1, result: "string", winner: prevWinner });
      botStrat.theScientificWay(detailedHistory, bot);
      expect(bot.weapon).toBe(scissor);
    });
  });
});
