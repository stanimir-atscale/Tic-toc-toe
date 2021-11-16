import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import GameStore from "../../../stores/GameStore";
import { CellComponent } from "./CellComponent";
import { observable } from "mobx";

Enzyme.configure({ adapter: new Adapter() });
const mockCellIndex = 0;
let store: GameStore;
let mockProps: {
  playerId: number | null;
  cellIndex: number;
  currentPlayerMark: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

describe("GameComponent", () => {
  beforeEach(() => {
    store = new GameStore();
    mockProps = {
      playerId: store.board.cells[mockCellIndex],
      cellIndex: mockCellIndex,
      currentPlayerMark: "x",
      onChange: function () {
        store.checkboxChange(mockCellIndex);
      },
    };
  });
  it("Should check mark onto hovered cell", () => {
    const component = shallow(<CellComponent {...mockProps} />);
    component.find(".ttt-label").simulate("mouseOver");
    expect(component.find(".label--x").exists()).toBe(true);
  });
  it("Should check mark onto clicked cell", () => {
    const component = shallow(<CellComponent {...mockProps} />);
    component.find("input").simulate("change", { target: { checked: true } });
    component.setProps({
      playerId: store.board.cells[mockCellIndex],
    });
    expect(component.find(".mark--x").exists()).toBe(true);
  });
  it("Should check mark is changed after second click on the same cell", () => {
    const component = shallow(<CellComponent {...mockProps} />);

    component.find("input").simulate("change", { target: { checked: true } });
    component.setProps({
      playerId: store.board.cells[mockCellIndex],
    });
    expect(component.find(".mark--x").exists()).toBe(true);
    expect(component.find("input").props().checked).toBe(true);
  });
});
