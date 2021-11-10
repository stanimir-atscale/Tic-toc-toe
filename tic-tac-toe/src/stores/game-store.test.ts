import { Game } from "../enums/Game";
import GameStore from "./GameStore";

const store = new GameStore();
const mockDrawBoardCells = store.board.createCellArray(9, [0,1,1,1,0,0,0,0,1]);
const mockContinuePlayBoardCells = store.board.createCellArray(9, [0,0,null,1,1,0,1,0,null]);
const mockPlayerHorizontalWinBoardCells = store.board.createCellArray(9, [0,0,0,1,1,null,null,null,null]);
const mockPlayerVerticalWinBoardCells = store.board.createCellArray(9, [0,1,null,0,1,null,0,null,null]);
const mockPlayerFirstDiagonalWinBoardCells = store.board.createCellArray(9, [0,1,null,1,0,null,null,null,0]);
const mockPlayerSecondDiagonalWinBoardCells = store.board.createCellArray(9, [null,1,0,1,0,null,0,null,null]);
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
