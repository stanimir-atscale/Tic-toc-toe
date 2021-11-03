import { action, makeAutoObservable, observable } from "mobx";
import { IGameParams } from "../interfaces/IGameParams";
import { IPlayer } from "../interfaces/IPlayer";
import { BoardStore } from "./BoardStore";
import { PlayerStore } from "./PlayerStore";
import mockedGameParams from "../models/game-params.json";

export default class Store {
  playerStore: PlayerStore;
  boardStore: BoardStore;
  @observable currentPlayer: IPlayer;
  @observable gameParams: IGameParams;

  constructor() {
    this.playerStore = new PlayerStore();
    this.boardStore = new BoardStore();
    this.currentPlayer = this.playerStore.players[0];
    this.gameParams = mockedGameParams;
    makeAutoObservable(this);
  }

  @action changeCurrentPlayer = () => {
    if (this.currentPlayer.id === "0") {
      this.currentPlayer = this.playerStore.players[1];
    } else {
      this.currentPlayer = this.playerStore.players[0];
    }
  };

  @action resetCurrentPlayer = () => {
    this.currentPlayer = this.playerStore.players[0];
  };

  @action setGameFinished = (winnerName: string) => {
    this.gameParams = {
      isGameFinished: !this.gameParams.isGameFinished,
      winnerName
    };
  };
}
