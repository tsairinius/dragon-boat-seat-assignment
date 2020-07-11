import React from 'react';
import ReactDOM from 'react-dom';
import { cleanup } from '@testing-library/react';
import App from './App';

afterEach(cleanup);

it('renders App component without crashing', () => {
  const container = document.createElement('div');
  ReactDOM.render(<App />, container);
});

