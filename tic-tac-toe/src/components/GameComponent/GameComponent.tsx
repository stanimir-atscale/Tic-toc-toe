import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import Store from "../../stores/GameStore";
import { CellComponent } from "./CellComponent/CellComponent";
import { ICell } from "../../stores/interfaces/ICell";
import { GameInfoComponent } from "./GameInfoComponent/GameInfoComponent";
import { IPlayer } from "../../stores/interfaces/IPlayer";
import { EndGameComponent } from "./EndGameComponent/EndGameComponent";

type Props = {
  store?: Store;
};

@inject("store")
@observer
export class GameComponent extends Component<Props> {
  render() {
    return (
      <div className="ttt-game-component">
        <h1 className="ttt-title">TIC TAC TOE</h1>
        <div className="ttt-game-info-container">{this.renderGameInfo()}</div>

        {this.props.store?.currentPlayer.name && (
          <div className="ttt-player-turn-message">
            Is {this.props.store?.currentPlayer.name} turn!
          </div>
        )}

        <div className="ttt-board-container">
          <div className="ttt-board">{this.renderCells()}</div>
          <div className="ttt-btn-bar">
            <button
              className="ttt-newGame"
              onClick={(
                event: React.MouseEvent<HTMLButtonElement, MouseEvent>
              ) => {
                this.handleClickNewGame(event);
              }}
            >
              New game
            </button>
          </div>
        </div>
        {this.props.store?.gameParams.isGameFinished && (
          <EndGameComponent
            winnerName={this.props.store?.gameParams.winnerName}
            onClick={(
              event: React.MouseEvent<HTMLButtonElement, MouseEvent>
            ) => {
              this.handleResetBoardClick(event);
            }}
          />
        )}
      </div>
    );
  }

  private renderGameInfo() {
    return this.props.store?.players.map((player: IPlayer) => {
      return <GameInfoComponent player={player} key={player.id} />;
    });
  }

  private renderCells() {
    return this.props.store?.board.cells.map((cell: ICell) => {
      return (
        <CellComponent
          cell={cell}
          currentPlayerMark={this.props.store?.currentPlayer.mark || "x"}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            this.handleCheckboxChange(event);
          }}
          key={cell.id}
        />
      );
    });
  }

  private handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.props.store?.board.updateCellProperty(
      Number(event.target.id),
      this.props.store?.currentPlayer.id
    );

    const isCurrentPlayerWin = this.props.store?.board.checkCurrentPlayerWin(
      this.props.store?.currentPlayer.id
    );

    if (isCurrentPlayerWin === "-1") {
      this.props.store?.setGameFinished("");
      return;
    }

    if (isCurrentPlayerWin) {
      this.props.store?.setGameFinished(this.props.store?.currentPlayer.name);
      this.props.store?.increasePlayerWins(this.props.store?.currentPlayer.id);
      return;
    }

    this.props.store?.changeCurrentPlayer();
  }

  private handleResetBoardClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    this.props.store?.board.resetBoard();
    this.props.store?.resetCurrentPlayer();
    this.props.store?.setGameFinished("");
  }

  private handleClickNewGame(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    this.props.store?.board.resetBoard();
    this.props.store?.resetCurrentPlayer();
  }
}
