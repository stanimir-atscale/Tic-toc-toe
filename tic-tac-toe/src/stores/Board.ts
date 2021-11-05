import { action, makeAutoObservable, observable } from "mobx";
import { ICell } from "./interfaces/ICell";

export class Board {
  private cellCount = 9;
  @observable cells: Array<ICell>;
  private minPlayerTurnsCountToWin = Math.sqrt(this.cellCount);
  private maxPlayerTurnsCountToWin = Math.floor(this.cellCount / 2 + 1);
  private matrixCheck: Array<Array<number>>;

  constructor() {
    this.cells = this.createCellArray(this.cellCount);
    this.matrixCheck = this.createMatrixFromCellsIds(this.cells, this.minPlayerTurnsCountToWin);
    makeAutoObservable(this);
  }

  @action updateCellProperty(cellId: number, playerId: number) {
    const cellIndex = this.cells.findIndex((cell) => cell.id === cellId);

    if (!this.cells[cellIndex].playerId) {
      this.cells[cellIndex].playerId = playerId;
    }
  }

  @action checkCurrentPlayerWin(currentPlayerId: number): string {
    let currentWinPlayerId = "";
    let currentPlayerMarkCount = 0;

    this.cells.forEach((cell: ICell) => {
      if (cell.playerId !== currentPlayerId) return;
      currentPlayerMarkCount++;
    });

    if (currentPlayerMarkCount < this.minPlayerTurnsCountToWin)
      return currentWinPlayerId;

    this.matrixCheck.forEach((row) => {
      const check = row.every((index: number) => this.cells[index].playerId === currentPlayerId);
      if (check) currentWinPlayerId = currentPlayerId.toString();
    });

    if (
      currentPlayerMarkCount === this.maxPlayerTurnsCountToWin &&
      currentWinPlayerId !== currentPlayerId.toString()
    )
      currentWinPlayerId = "-1";

    return currentWinPlayerId;
  }

  @action resetBoard() {
    return this.cells.map((cell: ICell) => {
      return (cell.playerId = null);
    });
  }

  private createMatrixFromCellsIds(arr: Array<ICell>, sideWidth: number) {
    return [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]
  }

  private createCellArray(arrayLength: number) {
    const cells = [];
    for (let i = 0; i < arrayLength; i++) {
      cells.push({ id: i, playerId: null });
    }
    return cells;
  }
}
