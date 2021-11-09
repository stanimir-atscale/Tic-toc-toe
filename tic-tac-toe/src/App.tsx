import "./App.css";
import { Component } from "react";
import { Provider } from "mobx-react";
import GameStore from "./stores/GameStore";
import { GameComponent } from "./components/GameComponent/GameComponent";

class App extends Component {
  private store: GameStore;

  constructor(props: any) {
    super(props);
    this.store = new GameStore();
  }
  render() {
    return (
      <Provider store={this.store}>
        <GameComponent />
      </Provider>
    );
  }
}

export default App;
