import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import GameStore from "../../../stores/GameStore";
import { CellComponent } from "./CellComponent";

Enzyme.configure({ adapter: new Adapter() });

describe("GameComponent", () => {
  it("Should check mark onto hovered cell", () => {
    const mockProps = new MockProps();
    const component = shallow(
      <CellComponent {...mockProps.getMockedProps()} />
    );
    component.find(".ttt-label").simulate("mouseOver");
    expect(component.find(".label--x").exists()).toBe(true);
  });
  it("Should check mark onto clicked cell", () => {
    const mockProps = new MockProps();
    const component = shallow(
      <CellComponent {...mockProps.getMockedProps()} />
    );
    component.find("input").simulate("change", { target: { checked: true } });
    component.setProps({
      playerId: mockProps.store.board.cells[mockProps.mockCellIndex],
    });
    expect(component.find(".mark--x").exists()).toBe(true);
  });
  it("Should check mark is changed after second click on the same cell", () => {
    const mockProps = new MockProps();
    const component = shallow(
      <CellComponent {...mockProps.getMockedProps()} />
    );

    component.find("input").simulate("change", { target: { checked: true } });
    component.setProps({
      playerId: mockProps.store.board.cells[mockProps.mockCellIndex],
    });
    expect(component.find(".mark--x").exists()).toBe(true);
    expect(component.find("input").props().checked).toBe(true);
  });
});

class MockProps {
  mockCellIndex = 0;
  store = new GameStore();

  getMockedProps() {
    let that = this;
    return {
      playerId: this.store.board.cells[this.mockCellIndex],
      cellIndex: this.mockCellIndex,
      currentPlayerMark: "x",
      onChange: function () {
        that.store.checkboxChange(that.mockCellIndex);
      },
    };
  }
}
