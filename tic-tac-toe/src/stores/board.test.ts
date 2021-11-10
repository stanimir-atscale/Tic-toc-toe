import GameStore from "./GameStore";

const store = new GameStore();

const mockBoardCells = [
  { playerId: null },
  { playerId: null },
  { playerId: null },
  { playerId: null },
  { playerId: null },
  { playerId: null },
  { playerId: null },
  { playerId: null },
  { playerId: null },
];

const clickedCellId = 0;
const playerId = 0;

describe("Game Store", () => {
  it("Should check update cell", () => {
    store.board.cells = mockBoardCells;
    store.board.updateCellProperty(clickedCellId, playerId);
    const clickedCell = store.board.cells.find(
      (cell, i) => i === clickedCellId
    );
    expect(clickedCell?.playerId).toBe(playerId);
  });
});
