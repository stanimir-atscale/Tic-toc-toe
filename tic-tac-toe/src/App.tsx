import { ToastContainer } from "react-toastify";
import { TicTacToeComponent } from "./components/TicTacToeComponent/TicTacToeComponent";
import "./App.css";
import { Component } from "react";
import Store from "./stores/Store";
import { Provider } from "mobx-react";

class App extends Component {
  private store: Store;

  constructor(props: any) {
    super(props);
    this.store = new Store();
  }
  render() {
    return (
      <Provider Store={this.store}>
        <div className="App">
          <TicTacToeComponent />
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
          />
        </div>
      </Provider>
    );
  }
}

export default App;
