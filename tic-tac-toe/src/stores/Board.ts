import { action, makeAutoObservable, observable } from "mobx";
import { Game } from "../enums/Game";
import { ICell } from "../interfaces/ICell";

const CELL_COUNT = 9;
export class Board {
  @observable cells: Array<ICell>;
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

    if (!this.cells[cellIndex].playerId) {
      this.cells[cellIndex].playerId = playerId;
    }
  }

  @action resetBoard() {
    return this.cells.map((cell: ICell) => {
      return (cell.playerId = null);
    });
  }
// playerTurnIndexArray = [
    //   [0, 1, 1],
    //   [1, 0, 0],
    //   [0, 0, 1],
    // ]
  createCellArray(arrayLength: number, playerTurnIndexArray?: Array<number>) {
    const cells = [];
    if (!playerTurnIndexArray) {
      for (let i = 0; i < arrayLength; i++) {
        cells.push({ playerId: null });
      }
    }else {
      for (let i = 0; i < arrayLength; i++) {
        cells.push({ playerId: null });
      }
    }
    return cells;
  }

  checkGameOverCondition(currentPlayerId: number): number {
    let gameOverCondition = Game.Continue;
    let currentPlayerMarkCount = 0;

    this.cells.forEach((cell: ICell) => {
      if (cell.playerId !== currentPlayerId) {
        return;
      }
      currentPlayerMarkCount++;
    });

    if (currentPlayerMarkCount < this.minPlayerTurnsCountToWin)
      return gameOverCondition;

    this.matrixCheck.forEach((row) => {
      const check = row.every(
        (index: number) => this.cells[index].playerId === currentPlayerId
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
