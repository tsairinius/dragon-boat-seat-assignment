import React from 'react';
import { render } from '@testing-library/react';
import Boat from './Boat';

it('renders Boat component without crashing', () => {
  const handlePaddlerClick = jest.fn();
  const handleSeatClick = jest.fn();
  const handlePaddlerMouseEnter = jest.fn();
  const handlePaddlerMouseLeave = jest.fn();

  render(<Boat paddlersInBoat={[]} handlePaddlerClick={handlePaddlerClick} handleSeatClick={handleSeatClick} handlePaddlerMouseEnter={handlePaddlerMouseEnter} handlePaddlerMouseLeave={handlePaddlerMouseLeave}/>);
});
