import React from 'react';
import { render } from '@testing-library/react';
import Tabs from './Tabs';
import userEvent from '@testing-library/user-event';
import {screen} from '@testing-library/dom';

it('renders Tabs component without crashing', () => {
    render(
    <Tabs>
        <div label='Tab1'>Tab1</div>
    </Tabs>);
});

it('shows tab that was last clicked on', () => {
    render(
      <Tabs>
          <div label='Cat'>Meow!</div>
          <div label='Dog'>Woof!</div>
          <div label='Pig'>Oink!</div>
      </Tabs>  
    );

    userEvent.click(screen.getByRole('button', {name: 'Pig'}));
    userEvent.click(screen.getByRole('button', {name: 'Dog'}));

    expect(screen.getByText('Woof!')).toBeInTheDocument();
    expect(screen.queryByText('Meow!')).not.toBeInTheDocument();
    expect(screen.queryByText('Oink!')).not.toBeInTheDocument();
});


