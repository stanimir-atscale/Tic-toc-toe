import { Game } from "../enums/Game";
import GameStore from "./GameStore";

const store = new GameStore();
// TODO use method to generate cell array by length and array with indexes
const mockDrawBoardCells = [
  { playerId: 0 },
  { playerId: 1 },
  { playerId: 1 },
  { playerId: 1 },
  { playerId: 0 },
  { playerId: 0 },
  { playerId: 0 },
  { playerId: 0 },
  { playerId: 1 },
];
const mockContinuePlayBoardCells = [
  { playerId: 0 },
  { playerId: 0 },
  { playerId: null },
  { playerId: 1 },
  { playerId: 1 },
  { playerId: 0 },
  { playerId: 1 },
  { playerId: 0 },
  { playerId: null },
];
const mockPlayerHorizontalWinBoardCells = [
  { playerId: 0 },
  { playerId: 0 },
  { playerId: 0 },
  { playerId: 1 },
  { playerId: 1 },
  { playerId: null },
  { playerId: null },
  { playerId: null },
  { playerId: null },
];
const mockPlayerVerticalWinBoardCells = [
  { playerId: 0 },
  { playerId: 1 },
  { playerId: null },
  { playerId: 0 },
  { playerId: 1 },
  { playerId: null },
  { playerId: 0 },
  { playerId: null },
  { playerId: null },
];
const mockPlayerFirstDiagonalWinBoardCells = [
  { playerId: 0 },
  { playerId: 1 },
  { playerId: null },
  { playerId: 1 },
  { playerId: 0 },
  { playerId: null },
  { playerId: null },
  { playerId: null },
  { playerId: 0 },
];
const mockPlayerSecondDiagonalWinBoardCells = [
  { playerId: null },
  { playerId: 1 },
  { playerId: 0 },
  { playerId: 1 },
  { playerId: 0 },
  { playerId: null },
  { playerId: 0 },
  { playerId: null },
  { playerId: null },
];
const currentPlayerId = 0;
const gameParamsOnDraw = {
  isGameFinished: true,
  winnerName: "",
};
const gameParamsOnWin = {
  isGameFinished: true,
  winnerName: "Player 1",
};

describe("Game Store", () => {
  describe("Game Condition", () => {
    it("Should check on draw", () => {
      store.board.cells = mockDrawBoardCells;
      const gameOverCondition =
        store.board.checkGameOverCondition(currentPlayerId);
      expect(gameOverCondition).toBe(Game.Draw);
    });
    it("Should check on continue play", () => {
      store.board.cells = mockContinuePlayBoardCells;
      const gameOverCondition =
        store.board.checkGameOverCondition(currentPlayerId);
      expect(gameOverCondition).toBe(Game.Continue);
    });
    it("Should check on horizontal player win", () => {
      store.board.cells = mockPlayerHorizontalWinBoardCells;
      const gameOverCondition =
        store.board.checkGameOverCondition(currentPlayerId);
      expect(gameOverCondition).toBe(Game.Win);
    });
    it("Should check on vertical player win", () => {
      store.board.cells = mockPlayerVerticalWinBoardCells;
      const gameOverCondition =
        store.board.checkGameOverCondition(currentPlayerId);
      expect(gameOverCondition).toBe(Game.Win);
    });
    it("Should check on first diagonal win", () => {
      store.board.cells = mockPlayerFirstDiagonalWinBoardCells;
      const gameOverCondition =
        store.board.checkGameOverCondition(currentPlayerId);
      expect(gameOverCondition).toBe(Game.Win);
    });
    it("Should check on second diagonal win", () => {
      store.board.cells = mockPlayerSecondDiagonalWinBoardCells;
      const gameOverCondition =
        store.board.checkGameOverCondition(currentPlayerId);
      expect(gameOverCondition).toBe(Game.Win);
    });
  });
  describe("Game Over", () => {
    it("Should check on draw", () => {
      store.gameOver(Game.Draw);
      expect(store.gameParams.isGameFinished).toBe(
        gameParamsOnDraw.isGameFinished
      );
      expect(store.gameParams.winnerName).toBe(gameParamsOnDraw.winnerName);
    });
    it("Should check on win", () => {
      const currentPlayerWins = store.currentPlayer.wins;

      store.gameOver(Game.Win);

      expect(store.gameParams.winnerName).toBe(gameParamsOnWin.winnerName);

      const player = store.players.find(
        (player) => player.id === store.currentPlayer.id
      );
      expect(player?.wins).toBe(currentPlayerWins + 1);
    });
    it("Should check on continue play", () => {
      const currentPlayerId = store.currentPlayer.id;
      store.gameOver(Game.Continue);
      expect(store.currentPlayer.id).not.toBe(currentPlayerId);
    });
  });
});
