import Enzyme, { mount, render, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import GameStore from "../../../stores/GameStore";
import { CellComponent } from "./CellComponent";

Enzyme.configure({ adapter: new Adapter() });

const store = new GameStore();

const mockCellIndex = 0;

let mockProps = {
  playerId: null,
  cellIndex: mockCellIndex,
  currentPlayerMark: "x",
  onChange: function () {
    store.checkboxChange(mockCellIndex);
  },
};
describe("GameComponent", () => {
  it("Should check mark onto hovered cell", () => {
    const component = shallow(<CellComponent {...mockProps} />);
    component.find(".ttt-label").simulate("mouseOver");
    expect(component.find(".label--x").exists()).toBe(true);
  });
  it("Should check mark onto clicked cell", () => {
    const component = mount(<CellComponent {...mockProps} />);
    component.find("input").at(0).simulate("change", { target: { checked: true } });
    component.update();
    expect(component.find(".mark--x").exists()).toBe(true);
  });
  it("Should check mark changed after second click", () => {
    // const component = shallow(<CellComponent {...mockProps} />);
    // component.find(".ttt-label").simulate("click");
    // expect(component.find(".mark--x").exists()).toBe(true);
    // component.find(".ttt-label").simulate("click");
    // expect(component.find(".mark--x").exists()).toBe(true);
  });
});
