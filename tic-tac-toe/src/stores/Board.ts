import { action, makeAutoObservable, observable } from "mobx";
import { Game } from "../enums/Game";

const CELL_COUNT = 9;
export class Board {
  @observable cells: Array<number | null>;
  private minPlayerTurnsCountToWin = Math.sqrt(CELL_COUNT);
  private maxPlayerTurnsCountToWin = Math.floor(CELL_COUNT / 2 + 1);
  private matrixCheck: Array<Array<number>>;

  constructor() {
    this.cells = this.createCellArray(CELL_COUNT);
    this.matrixCheck = this.createMatrixFromCellsIds();
    makeAutoObservable(this);
  }

  @action updateCellProperty(cellId: number, playerId: number) {
    const cellIndex = this.cells.findIndex((cell, index) => index === cellId);

    if (!this.cells[cellIndex]) {
      this.cells[cellIndex] = playerId;
    }
  }

  @action resetBoard() {
    this.cells = this.createCellArray(CELL_COUNT);
  }

  createCellArray(
    arrayLength: number,
    playerTurnIndexArray?: Array<number | null>
  ): Array<number | null> {
    let cells = [];
    if (!playerTurnIndexArray) {
      for (let i = 0; i < arrayLength; i++) {
        cells.push(null);
      }
      return cells;
    }

    cells = playerTurnIndexArray;

    return cells;
  }

  checkGameOverCondition(currentPlayerId: number): number {
    let gameOverCondition = Game.Continue;
    let currentPlayerMarkCount = 0;

    this.cells.forEach((cell: number | null) => {
      if (cell !== currentPlayerId) {
        return;
      }
      currentPlayerMarkCount++;
    });

    if (currentPlayerMarkCount < this.minPlayerTurnsCountToWin)
      return gameOverCondition;

    this.matrixCheck.forEach((row) => {
      const check = row.every(
        (index: number) => this.cells[index] === currentPlayerId
      );
      if (check) {
        gameOverCondition = Game.Win;
      }
    });

    if (
      currentPlayerMarkCount === this.maxPlayerTurnsCountToWin &&
      gameOverCondition < Game.Win
    ) {
      gameOverCondition = Game.Draw;
    }

    return gameOverCondition;
  }

  private createMatrixFromCellsIds() {
    return [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
  }
}
