import BotStrategy from "../classes/BotStrategy";
import Player from "../classes/Player";
import { paper, rock, scissor } from "../classes/Weapons";

describe("BotStrategy", () => {
  let botStrat = new BotStrategy();
  let bot = new Player("Bot");
  let detailedHistory: Array<{ round: number; result: string; winner: Player }> = [];

  describe("pickRandomWeapon", () => {
    it("should call randomWeapon() if detailedHistory < 0", () => {
      botStrat.randomWeapon = jest.fn();

      botStrat.counterPreviousWinner(detailedHistory, bot);
      expect(botStrat.randomWeapon).toBeCalled();
    });
  });

  describe("theScientificWay", () => {
    // User won previous round
    it("Bot should play weapon that would've beat previous winner", () => {
      let user2 = new Player("User");

      user2.weapon = rock;
      Math.random = jest.fn(() => 0);

      detailedHistory.push({ round: 1, result: "string", winner: user2 });
      botStrat.theScientificWay(detailedHistory, bot);
      expect(bot.weapon).toBe(paper)
    });

    // Bot won previous round
    it("Bot should anticipate user weapon and counter", () => {
      let prevWinner = new Player("Bot");

      Math.random = jest.fn(() => 0);

      prevWinner.weapon = rock;
      detailedHistory.push({ round: 1, result: "string", winner: prevWinner });
      botStrat.theScientificWay(detailedHistory, bot);
      expect(bot.weapon).toBe(scissor);
    });
  });
});
