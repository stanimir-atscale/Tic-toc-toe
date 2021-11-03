import { action, makeAutoObservable, observable } from "mobx";
import { ICell } from "../interfaces/ICell";
import mockedBoard from "../models/board.json";

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

  @action checkCurrentPlayerWin(currentPlayerId: string): boolean | undefined {
    let isCurrentPlayerWin = false;

    let currentPlayerMarkCount = 0;

    this.cells.forEach((cell: ICell) => {
      if (cell.playerId !== currentPlayerId) return;
      currentPlayerMarkCount++;
    });

    if (currentPlayerMarkCount < 3) return isCurrentPlayerWin;

    if (
      (this.cells[0].playerId === currentPlayerId &&
        this.cells[1].playerId === currentPlayerId &&
        this.cells[2].playerId === currentPlayerId) ||
      (this.cells[3].playerId === currentPlayerId &&
        this.cells[4].playerId === currentPlayerId &&
        this.cells[5].playerId === currentPlayerId) ||
      (this.cells[6].playerId === currentPlayerId &&
        this.cells[7].playerId === currentPlayerId &&
        this.cells[8].playerId === currentPlayerId) ||
      (this.cells[0].playerId === currentPlayerId &&
        this.cells[3].playerId === currentPlayerId &&
        this.cells[6].playerId === currentPlayerId) ||
      (this.cells[1].playerId === currentPlayerId &&
        this.cells[4].playerId === currentPlayerId &&
        this.cells[7].playerId === currentPlayerId) ||
      (this.cells[2].playerId === currentPlayerId &&
        this.cells[5].playerId === currentPlayerId &&
        this.cells[8].playerId === currentPlayerId) ||
      (this.cells[0].playerId === currentPlayerId &&
        this.cells[4].playerId === currentPlayerId &&
        this.cells[8].playerId === currentPlayerId) ||
      (this.cells[2].playerId === currentPlayerId &&
        this.cells[4].playerId === currentPlayerId &&
        this.cells[6].playerId === currentPlayerId)
    ) {
      isCurrentPlayerWin = !isCurrentPlayerWin;
    }

    if (currentPlayerMarkCount === 5 && !isCurrentPlayerWin) return undefined;

    return isCurrentPlayerWin;
  }

  @action resetBoard = () => {
    return this.cells.map((cell: ICell) => {
      return (cell.playerId = "");
    });
  };
}
