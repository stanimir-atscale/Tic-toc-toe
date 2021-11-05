import "./game-info-component.css"
import { observer } from "mobx-react";
import { Component } from "react";
import { IPlayer } from "../../../stores/interfaces/IPlayer";

type Props = {
  player: IPlayer;
};

@observer
export class GameInfoComponent extends Component<Props> {
  render() {
    const { name, mark, wins } = this.props.player;
    return (
        <div className="ttt-game-info-component">
          <br />
          <span>
            <span className="ttt-player-name">
              {name} (<span className="ttt-player-mark">{mark}</span>)
            </span>
          </span>
          <br />
          <span>
            WINS:
            <span className="ttt-player-wins">{wins}</span>
          </span>
        </div>
    );
  }
}
