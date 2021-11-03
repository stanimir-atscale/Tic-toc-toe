import { observer } from "mobx-react";
import { Component } from "react";

type defaultProps = {
  winnerName: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
};

@observer
export class EndGameComponent extends Component<defaultProps> {
  render() {
    const msg = this.props.winnerName
      ? this.props.winnerName + " Win!"
      : "Draw!";

    return (
      <div className="overlay">
        <div className="ttt-endgame">
          <span className="ttt-msg">{msg}</span>
          <button className="ttt-tryAgain" onClick={this.props.onClick}>
            Try again
          </button>
        </div>
      </div>
    );
  }
}
