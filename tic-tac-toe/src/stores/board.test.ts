import GameStore from "./GameStore";

const store = new GameStore();

const mockBoardCells = store.board.createCellArray(9);

const clickedCellId = 0;
const playerId = 0;

describe("Game Store", () => {
  it("Should check update cell", () => {
    store.board.cells = mockBoardCells;
    store.board.updateCellProperty(clickedCellId, playerId);
    const clickedCell = store.board.cells.find(
      (cell, i) => i === clickedCellId
    );
    expect(clickedCell).toBe(playerId);
  });
});
