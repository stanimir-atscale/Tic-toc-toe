import "./game-component.css";
import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import GameStore from "../../stores/GameStore";
import { ICell } from "../../interfaces/ICell";
import { IPlayer } from "../../interfaces/IPlayer";
import { CellComponent } from "./CellComponent/CellComponent";
import { GameInfoComponent } from "./GameInfoComponent/GameInfoComponent";
import { EndGameComponent } from "./EndGameComponent/EndGameComponent";

type Props = {
  store?: GameStore;
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
    return this.props.store?.board.cells.map((cell: ICell, index:number) => {
      return (
        <CellComponent
          cell={cell}
          cellIndex = {index}
          currentPlayerMark={this.props.store?.currentPlayer.mark || "x"}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            this.handleCheckboxChange(event);
          }}
          key={index}
        />
      );
    });
  }

  private handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.props.store?.board.updateCellProperty(
      Number(event.target.id),
      this.props.store?.currentPlayer.id
    );

    const gameCondition = this.props.store?.board.checkGameOverCondition(
      this.props.store?.currentPlayer.id
    );

    this.props.store?.gameOver(gameCondition);
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
