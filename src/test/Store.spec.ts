import BotStrategy from "../classes/BotStrategy";
import Player from "../classes/Player";
import Store from "../classes/Store";
import { paper, rock } from "../classes/Weapons";

describe("Store", () => {
  let botStrategy = new BotStrategy();
  let store = new Store();
  let detailedHistory: Array<{ round: number; result: string; winner: Player }> = [];

  describe("declareWinner", () => {
    it("should call resultOfRound", () => {
      let user1 = new Player("User");
      let bot1 = new Player("Bot");

      user1.selectedWeapon(rock);
      bot1.selectedWeapon(paper);

      store.resultOfRound = jest.fn();

      store.declareWinner(user1, bot1);
      expect(store.resultOfRound).toBeCalled()
    });
  });

  describe("chooseBotStrategy", () => {
    it("should call counterPreviousWinner", () => {
      let strategy = "Counter";
      let bot = new Player("Bot");

      botStrategy.counterPreviousWinner = jest.fn();
      store.chooseBotStrategy(strategy, bot);
      botStrategy.counterPreviousWinner(detailedHistory, bot);

      expect(botStrategy.counterPreviousWinner).toBeCalled()
    });

    it("should call theScientificWay", () => {
      let strategy = "Science";
      let bot = new Player("Bot");

      botStrategy.theScientificWay = jest.fn();
      store.chooseBotStrategy(strategy, bot);
      botStrategy.theScientificWay(detailedHistory, bot);

      expect(botStrategy.theScientificWay).toBeCalled();
    });

    it("should call randomWeapon", () => {
      let strategy = "Random";
      let bot = new Player("Bot");

      botStrategy.randomWeapon = jest.fn();
      store.chooseBotStrategy(strategy, bot);
      botStrategy.randomWeapon(bot);

      expect(botStrategy.randomWeapon).toBeCalled();
    });
  });
});
