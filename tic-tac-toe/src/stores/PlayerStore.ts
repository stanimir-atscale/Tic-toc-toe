import { action, makeAutoObservable, observable } from "mobx";
import { IPlayer } from "../interfaces/IPlayer";
import mockedPlayers from "../models/players.json"

export class PlayerStore {
  @observable players: Array<IPlayer> = mockedPlayers.players;
  constructor() {
    makeAutoObservable(this);
  }

  @action increasePlayerWins = (playerId: string) => {
    const playerIndex = this.players.findIndex((player) => player.id === playerId);
    this.players[playerIndex].wins++;
  };
}
