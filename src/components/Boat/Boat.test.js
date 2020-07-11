import React from 'react';
import ReactDOM from 'react-dom';
import { cleanup } from '@testing-library/react';
import Boat from './Boat';

afterEach(cleanup);

it('renders Boat component without crashing', () => {
  const container = document.createElement('div');
  ReactDOM.render(<Boat />, container);
});

