import React from 'react';
import ReactDOM from 'react-dom';
import { cleanup } from '@testing-library/react';
import renderer from 'react-test-renderer';
import CreatePaddlerForm from './CreatePaddlerForm';

afterEach(cleanup);

it('renders CreatePaddlerForm component without crashing', () => {
  const container = document.createElement('div');
  ReactDOM.render(<CreatePaddlerForm />, container);
});

it('rendered CreatePaddlerForm matches snapshot', () => {
    const tree = renderer.create(<CreatePaddlerForm />).toJSON();
    expect(tree).toMatchSnapshot();
});

