import { GameComponent } from './GameComponent';
import Enzyme, { render } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'mobx-react';
import GameStore from '../../stores/GameStore';

Enzyme.configure({ adapter: new Adapter() });

const store = new GameStore();

describe('GameComponent', () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = render(
      <Provider store={store}>
      </Provider>
    );
  });
  it('Should check hovered cell mark', () => {
    const gameComponent = wrapper.find(GameComponent);
  });
  it('Should check clicked cell mark', () => {
    const gameComponent = wrapper.find(GameComponent);
  });
  it('Should check is mark changed after second click', () => {
    const gameComponent = wrapper.find(GameComponent);
  });
});
