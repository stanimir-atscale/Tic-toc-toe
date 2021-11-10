import "./cell-component.css";
import { observer } from "mobx-react";
import React, { Component } from "react";

type Props = {
  playerId: number | null;
  cellIndex: number;
  currentPlayerMark: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

@observer
export class CellComponent extends Component<Props> {
  render() {
    const { playerId, cellIndex, currentPlayerMark, onChange } = this.props;
    let mark = "";
    if (typeof playerId === "number") {
      mark = playerId === 0 ? "x" : "o";
    };

    return (
      <>
        <input
          id={cellIndex.toString()}
          type="radio"
          value={cellIndex.toString()}
          checked={!!mark}
          onChange={onChange}
        />

        <div className={`${"ttt-cell cell--" + cellIndex}`}>
          <div className={"ttt-mark mark--" + mark}></div>
          <label
            className={"ttt-label label--" + currentPlayerMark}
            htmlFor={cellIndex.toString()}
          />
        </div>
      </>
    );
  }
}
