import "./App.css";
import { Component } from "react";
import { Provider } from "mobx-react";
import Store from "./stores/GameStore";
import { GameComponent } from "./components/GameComponent/GameComponent";

class App extends Component {
  private store: Store;

  constructor(props: any) {
    super(props);
    this.store = new Store();
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
