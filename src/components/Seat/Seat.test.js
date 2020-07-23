import React from 'react';
import { render } from '@testing-library/react';
import Seat from './Seat';
import {v4 as uuidv4} from 'uuid';
import userEvent from '@testing-library/user-event';

let handleSeatClick;
let handlePaddlerClick;
let handlePaddlerMouseEnter;
let handlePaddlerMouseLeave;
let paddlersInBoat;
beforeAll(() => {
    handleSeatClick = jest.fn();
    handlePaddlerClick = jest.fn();
    handlePaddlerMouseEnter = jest.fn();
    handlePaddlerMouseLeave = jest.fn();

    const paddlerBob = {
        id: uuidv4(),
        name: 'Bob', 
        gender: 'male', 
        weight: '125', 
        inBoat: true,
        seatId: 1,
        isActive: false
     };

     const paddlerLisa = {
        id: uuidv4(),
        name: 'Lisa', 
        gender: 'female', 
        weight: '150', 
        inBoat: true,
        seatId: 2,
        isActive: false
     };

     paddlersInBoat = [paddlerBob, paddlerLisa];
});

it('renders Seat component without crashing', () => {
    render(<Seat id={1} paddlersInBoat={[]} handleSeatClick={handleSeatClick} handlePaddlerClick={handlePaddlerClick} handlePaddlerMouseEnter={handlePaddlerMouseEnter} handlePaddlerMouseLeave={handlePaddlerMouseLeave}/>);
});

it('renders Seat with Paddler inside of it', () => {
    const { getByTestId, getByText } = render(<Seat id={1} paddlersInBoat={paddlersInBoat} handleSeatClick={handleSeatClick} handlePaddlerClick={handlePaddlerClick} handlePaddlerMouseEnter={handlePaddlerMouseEnter} handlePaddlerMouseLeave={handlePaddlerMouseLeave}/>);
    expect(getByTestId('seat1').firstChild).toBe(getByText('Bob'));
});

it('calls appropriate callback function when Seat is clicked on', () => {
    const { getByTestId } = render(<Seat id={1} paddlersInBoat={[]} handleSeatClick={handleSeatClick} handlePaddlerClick={handlePaddlerClick} handlePaddlerMouseEnter={handlePaddlerMouseEnter} handlePaddlerMouseLeave={handlePaddlerMouseLeave}/>);
    userEvent.click(getByTestId('seat1'));
    expect(handleSeatClick).toHaveBeenCalledTimes(1);
});

