import { observer } from "mobx-react";
import React, { Component } from "react";
import { ICell } from "../../interfaces/ICell";

type defaultProps = {
  cell: ICell;
  currentPlayerMark: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

@observer
export class CellComponent extends Component<defaultProps> {
  render() {
    const { cell, currentPlayerMark, onChange } = this.props;
    const mark = cell.playerId === "0" ? "x" : "o";

    return (
      <>
        <input
          id={cell.id}
          type="radio"
          value={cell.id}
          checked={!!cell.playerId}
          onChange={onChange}
        />

        <div className={"ttt-cell cell--" + cell.id}>
          <div className={"ttt-mark mark--" + mark}></div>
          <label className={"ttt-label label--" + currentPlayerMark} htmlFor={cell.id} />
        </div>
      </>
    );
  }
}
