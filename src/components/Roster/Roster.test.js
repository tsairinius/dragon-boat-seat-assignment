import React from 'react';
import ReactDOM from 'react-dom';
import { cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import Roster from './Roster';

afterEach(cleanup);

it('renders Roster component without crashing', () => {
  const container = document.createElement('div');
  ReactDOM.render(<Roster />, container);
});

it('rendered Roster matches snapshot', () => {
    const tree = renderer.create(<Roster />).toJSON();
    expect(tree).toMatchSnapshot();
});
