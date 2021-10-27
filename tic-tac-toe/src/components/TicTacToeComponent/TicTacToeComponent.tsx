import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import Store from "../../stores/Store";

type StoreProps = {
  Store?: Store;
};

@inject("Store")
@observer
export class TicTacToeComponent extends Component<StoreProps> {
  render() {
    const players = this.props.Store?.playerStore.players.map((player) => {
      return <div key={player.id}>{player.mark}</div>;
    });
    return <div>{players}</div>;
  }
}
