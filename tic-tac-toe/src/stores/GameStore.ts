import { action, makeAutoObservable, observable } from "mobx";
import { IGameParams } from "./interfaces/IGameParams";
import { IPlayer } from "./interfaces/IPlayer";
import { Board } from "./Board";
import mockedPlayers from "./models/players.json"
import mockedGameParams from "./models/game-params.json";

export default class GameStore {
  board: Board;
  @observable players: Array<IPlayer>
  @observable currentPlayer: IPlayer;
  @observable gameParams: IGameParams;

  constructor() {
    this.board = new Board();
    this.players = mockedPlayers.players;
    this.currentPlayer = this.players[0];
    this.gameParams = mockedGameParams;
    makeAutoObservable(this);
  }

  @action increasePlayerWins(playerId: number) {
    const playerIndex = this.players.findIndex((player) => player.id === playerId);
    this.players[playerIndex].wins++;
  };

  @action changeCurrentPlayer() {
    if (this.currentPlayer.id === 0) {
      this.currentPlayer = this.players[1];
    } else {
      this.currentPlayer = this.players[0];
    }
  };

  @action resetCurrentPlayer() {
    this.currentPlayer = this.players[0];
  };

  @action setGameFinished(winnerName: string) {
    this.gameParams = {
      isGameFinished: !this.gameParams.isGameFinished,
      winnerName
    };
  };
}
