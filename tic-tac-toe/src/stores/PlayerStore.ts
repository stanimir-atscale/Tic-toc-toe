import { action, observable } from "mobx";
import { IPlayer } from "../interfaces/IPlayer";

export class PlayerStore {
  @observable players: Array<IPlayer> = [
    {
      id: 1,
      name: "",
      mark: "X",
      turns: [],
      wins: 0,
    },
    {
      id: 2,
      name: "",
      mark: "O",
      turns: [],
      wins: 0,
    },
  ];

  @action addPlayerTurn = (id: number, position: number) => {
    // this.players.map((player) => {
    //   if (player.id !== id) return;
    //   //TODO: check if turns position exist in turns array => toast.info("")
    //   player.turns.push(position);
    //   //TODO: checkForWinTurn(id) => toast.success()
    //   //TODO: increasePlayerWins(id)
    //   //TODO: check for end game without winner
    //   //TODO: startNewGame()
    // });
  };

  private increasePlayerWins = (id: number) => {};

  private checkForWinTurn = (id: number) => {};

  startNewGame = () => {
    //TODO: reset players turns array for every player and reset turnFieldsStore
  };
}
