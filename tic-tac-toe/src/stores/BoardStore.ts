import { action, makeAutoObservable, observable } from "mobx";
import { ICell } from "./interfaces/ICell";
import mockedBoard from "./models/board.json";

export class BoardStore {
  @observable cells: Array<ICell> = mockedBoard.cells;
  constructor() {
    makeAutoObservable(this);
  }

  @action updateCellProperty(cellId: string, playerId: string) {
    const cellIndex = this.cells.findIndex((cell) => cell.id === cellId);

    if (!this.cells[cellIndex].playerId) {
      this.cells[cellIndex].playerId = playerId;
    }
  }

  @action checkCurrentPlayerWin(currentPlayerId: string): string {
    //TODO: make 2 dimensional array
    let currentWinPlayerId = "";
    let currentPlayerMarkCount = 0;

    this.cells.forEach((cell: ICell) => {
      if (cell.playerId !== currentPlayerId) return;
      currentPlayerMarkCount++;
    });

    if (currentPlayerMarkCount < 3) return currentWinPlayerId;

    const colsLength = 3;
    const isEqualToCurrentPlayerId = (cell: ICell) =>
      cell.playerId === currentPlayerId;
    const matrixCheck = [];
    const twoDimensionalArray = this.toMatrix(this.cells, colsLength);

    for (let i = 0; i < colsLength; i++) {
      matrixCheck.push(this.getRowArray(twoDimensionalArray, i));
      matrixCheck.push(this.getColumnArray(twoDimensionalArray, i));
    }

    matrixCheck.push(
      this.getFirstDiagonalArray(twoDimensionalArray, colsLength)
    );
    matrixCheck.push(
      this.getSecondaryDiagonal(twoDimensionalArray, colsLength)
    );

    matrixCheck.forEach((row: Array<ICell>) => {
      const check = row.every(isEqualToCurrentPlayerId);
      if (check) currentWinPlayerId = currentPlayerId;
    });

    if (currentPlayerMarkCount === 5 && currentWinPlayerId !== currentPlayerId)
      currentWinPlayerId = "-1";

    return currentWinPlayerId;
  }

  @action resetBoard() {
    return this.cells.map((cell: ICell) => {
      return (cell.playerId = "");
    });
  }

  private getFirstDiagonalArray(arr: Array<Array<ICell>>, colsLength: number) {
    const firstDiagonalArray = [];
    for (let i = 0; i < colsLength; i++) {
      for (let j = 0; j < colsLength; j++) {
        if (i === j) {
          firstDiagonalArray.push(arr[i][j]);
        }
      }
    }
    return firstDiagonalArray;
  }

  private getSecondaryDiagonal(arr: Array<Array<ICell>>, colsLength: number) {
    const secondaryDiagonal = [];
    for (let i = 0; i < colsLength; i++) {
      for (let j = 0; j < colsLength; j++) {
        if (i + j === colsLength - 1) {
          secondaryDiagonal.push(arr[i][j]);
        }
      }
    }
    return secondaryDiagonal;
  }

  private getColumnArray(arr: Array<Array<ICell>>, col: number) {
    return arr.map((x: Array<ICell>) => x[col]);
  }

  private getRowArray(arr: Array<Array<ICell>>, row: number) {
    return arr[row];
  }

  private toMatrix(arr: Array<ICell>, colsLength: number) {
    let res = [];
    for (let i = 0; i < arr.length; i = i + colsLength)
      res.push(arr.slice(i, i + colsLength));
    return res;
  }
}
