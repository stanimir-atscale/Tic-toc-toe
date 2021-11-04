//type - Props  ---
// move sub components in game components folder ---
// check order of elements class of constitution  ---
// use methods not anonymous function ---
// check react events types return  --- 
//TODO use in html with && ---

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
  constructor(props: Props) {
    super(props);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.handleResetBoardClick = this.handleResetBoardClick.bind(this);
    this.handleClickNewGame = this.handleClickNewGame.bind(this);
    this.handleClickNewGame = this.handleClickNewGame.bind(this);
  }

  render() {
    return (
      <div className="ttt-game">
        <h1 className="ttt-title">TIC TAC TOE</h1>
        <div className="ttt-title">{this.renderGameInfo()}</div>

        {this.props.store?.currentPlayer.name && (
          <div className="ttt-playerTurnMessage">
            Is {this.props.store?.currentPlayer.name} turn!
          </div>
        )}

        <div className="ttt-board-container">
          <div className="ttt-board">{this.renderCells()}</div>
          <div className="ttt-btn-bar">
            <button className="ttt-newGame" onClick={this.handleClickNewGame}>
              New game
            </button>  
          </div>
        </div>
        {this.props.store?.gameParams.isGameFinished && (
          <EndGameComponent
            winnerName={this.props.store?.gameParams.winnerName}
            onClick={this.handleResetBoardClick}
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
          onChange={this.handleCheckboxChange}
          key={cell.id}
        />
      );
    });
  }

  private handleCheckboxChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.props.store?.board.updateCellProperty(
      event.target.id,
      this.props.store?.currentPlayer.id.toString()
    );

    const isCurrentPlayerWin =
      this.props.store?.board.checkCurrentPlayerWin(
        this.props.store?.currentPlayer.id
      );

    if (isCurrentPlayerWin === "-1") {
      this.props.store?.setGameFinished("");
      return;
    }

    if (isCurrentPlayerWin) {
      this.props.store?.setGameFinished(this.props.store?.currentPlayer.name);
      this.props.store?.increasePlayerWins(
        this.props.store?.currentPlayer.id
      );
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
