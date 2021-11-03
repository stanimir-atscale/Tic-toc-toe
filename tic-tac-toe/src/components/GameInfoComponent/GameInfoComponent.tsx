import { observer } from "mobx-react";
import { Component } from "react";
import { IPlayer } from "../../interfaces/IPlayer";

type defaultProps = {
  player: IPlayer;
};

@observer
export class GameInfoComponent extends Component<defaultProps> {
  render() {
    const { name, mark, wins } = this.props.player;
    return (
      <div>
        <div className="ttt-gameInfoComponent">
          <br />
          <span>
            <span className="ttt-playerName">
              {name} (<span className="ttt-playerMark">{mark}</span>)
            </span>
          </span>
          <br />
          <span>
            WINS:
            <span className="ttt-playerWins">{wins}</span>
          </span>
        </div>
      </div>
    );
  }
}
