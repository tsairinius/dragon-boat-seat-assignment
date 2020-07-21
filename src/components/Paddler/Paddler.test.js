import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Paddler from './Paddler';
import {v4 as uuidv4} from 'uuid';
import userEvent from '@testing-library/user-event';

let paddlerProfile;
let handlePaddlerClick;
let handlePaddlerMouseEnter;
let handlePaddlerMouseLeave;
beforeAll(() => {
  handlePaddlerClick = jest.fn();
  handlePaddlerMouseEnter = jest.fn();
  handlePaddlerMouseLeave = jest.fn();

  paddlerProfile = {
    id: uuidv4(),
    name: 'John', 
    gender: 'male', 
    weight: '345', 
    inBoat: false,
    seatId: '',
    isActive: false
  };
});

it('renders Paddler component without crashing', () => {
  render(<Paddler paddlerProfile={paddlerProfile} handlePaddlerClick={handlePaddlerClick} handlePaddlerMouseEnter={handlePaddlerMouseEnter} handlePaddlerMouseLeave={handlePaddlerMouseLeave}/>);
});

it('displays name of paddler when component is created', () => {
  const { getByText } = render(<Paddler paddlerProfile={paddlerProfile} handlePaddlerClick={handlePaddlerClick} handlePaddlerMouseEnter={handlePaddlerMouseEnter} handlePaddlerMouseLeave={handlePaddlerMouseLeave}/>);
  expect(getByText('John')).toBeInTheDocument();
});

it('calls appropriate callback function when Paddler component is clicked on', () => {
  const { getByText } = render(<Paddler paddlerProfile={paddlerProfile} handlePaddlerClick={handlePaddlerClick} handlePaddlerMouseEnter={handlePaddlerMouseEnter} handlePaddlerMouseLeave={handlePaddlerMouseLeave}/>);
  const paddlerComponent = getByText('John');

  userEvent.click(paddlerComponent);
  expect(handlePaddlerClick).toHaveBeenCalledTimes(1);
});

it('calls appropriate callback function when mouse is over Paddler component', () => {
  const { getByText } = render(<Paddler paddlerProfile={paddlerProfile} handlePaddlerClick={handlePaddlerClick} handlePaddlerMouseEnter={handlePaddlerMouseEnter} handlePaddlerMouseLeave={handlePaddlerMouseLeave}/>);
  const paddlerComponent = getByText('John');

  userEvent.hover(paddlerComponent);

  expect(handlePaddlerMouseEnter).toHaveBeenCalled();
});

it('calls appropriate callback function when mouse hovers then unhovers from Paddler component', () => {
  const { getByText } = render(<Paddler paddlerProfile={paddlerProfile} handlePaddlerClick={handlePaddlerClick} handlePaddlerMouseEnter={handlePaddlerMouseEnter} handlePaddlerMouseLeave={handlePaddlerMouseLeave}/>);
  const paddlerComponent = getByText('John');

  userEvent.hover(paddlerComponent);
  userEvent.unhover(paddlerComponent);

  expect(handlePaddlerMouseLeave).toHaveBeenCalledTimes(1);
});
