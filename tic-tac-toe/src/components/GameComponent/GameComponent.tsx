import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import Store from "../../stores/Store";
import { CellComponent } from "../CellComponent/CellComponent";
import { ICell } from "../../interfaces/ICell";
import { GameInfoComponent } from "../GameInfoComponent/GameInfoComponent";
import { IPlayer } from "../../interfaces/IPlayer";
import { EndGameComponent } from "../EndGameComponent/EndGameComponent";

type storeProps = {
  store?: Store;
};

@inject("store")
@observer
export class GameComponent extends Component<storeProps> {
  private handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    this.props.store?.boardStore.updateCellProperty(
      event.target.id,
      this.props.store?.currentPlayer.id.toString()
    );

    const isCurrentPlayerWin =
      this.props.store?.boardStore.checkCurrentPlayerWin(
        this.props.store?.currentPlayer.id
      );

    if (isCurrentPlayerWin === undefined) {
      this.props.store?.setGameFinished("");
    }

    if (isCurrentPlayerWin) {
      this.props.store?.setGameFinished(this.props.store?.currentPlayer.name);
      this.props.store?.playerStore.increasePlayerWins(
        this.props.store?.currentPlayer.id
      );
      return;
    }

    this.props.store?.changeCurrentPlayer();
  };

  private handleResetBoardClick = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    this.props.store?.boardStore.resetBoard();
    this.props.store?.resetCurrentPlayer();
    this.props.store?.setGameFinished("");
  };

  private handleClickNewGame = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    this.props.store?.boardStore.resetBoard();
    this.props.store?.resetCurrentPlayer();
  };

  private renderGameInfo() {
    return this.props.store?.playerStore.players.map((player: IPlayer) => {
      return <GameInfoComponent player={player} key={player.id} />;
    });
  }

  private renderCells() {
    return this.props.store?.boardStore.cells.map((cell: ICell) => {
      return (
        <CellComponent
          cell={cell}
          currentPlayerMark={this.props.store?.currentPlayer.mark || "x"}
          onChange={this.handleCheckboxChange}
          key={cell.id}
        />
      );
    });
  }

  private renderEndGameDialog() {
    if (!this.props.store?.gameParams.isGameFinished) return null;
    return (
      <EndGameComponent
        winnerName={this.props.store?.gameParams.winnerName}
        onClick={this.handleResetBoardClick}
      />
    );
  }

  private renderCurrentPlayerName() {
    if (!this.props.store?.currentPlayer.name) return null;
    return (
      <div className="ttt-playerTurnMessage">
        Is {this.props.store?.currentPlayer.name} turn!
      </div>
    );
  }

  private renderButtonForNewGame() {
    return (
      <button className="ttt-newGame" onClick={this.handleClickNewGame}>
        New game
      </button>
    );
  }

  render() {
    return (
      <div className="ttt-game">
        <h1 className="ttt-title">TIC TAC TOE</h1>
        <div className="ttt-title">{this.renderGameInfo()}</div>

        {this.renderCurrentPlayerName()}

        <div className="ttt-board-container">
          <div className="ttt-board">{this.renderCells()}</div>
          <div className="ttt-btn-bar">{this.renderButtonForNewGame()}</div>
        </div>
        {this.renderEndGameDialog()}
      </div>
    );
  }
}
