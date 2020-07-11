import React from 'react';
import ReactDOM from 'react-dom';
import { cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Paddler from './Paddler';

afterEach(cleanup);

it('renders Paddler component without crashing', () => {
  const container = document.createElement('div');
  ReactDOM.render(<Paddler />, container);
});

it('rendered Paddler matches snapshot', () => {
    const tree = renderer.create(<Paddler />).toJSON();
    expect(tree).toMatchSnapshot();
});
