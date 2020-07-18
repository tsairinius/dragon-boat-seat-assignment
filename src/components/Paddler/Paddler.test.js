import React from 'react';
import { render } from '@testing-library/react';
import Paddler from './Paddler';
import {v4 as uuidv4} from 'uuid';
import userEvent from '@testing-library/user-event';

let paddlerProfile;
beforeAll(() => {
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
  const mockCallback = jest.fn();
  render(<Paddler paddlerProfile={paddlerProfile} handlePaddlerClick={mockCallback}/>);
});

it('displays name of paddler when component is created', () => {
  const mockCallback = jest.fn();
  const { getByText } = render(<Paddler paddlerProfile={paddlerProfile} handlePaddlerClick={mockCallback}/>);
  expect(getByText('John')).toBeInTheDocument();
});

it('calls callback function when Paddler component is clicked on', () => {
  const mockCallback = jest.fn();
  const { getByText } = render(<Paddler paddlerProfile={paddlerProfile} handlePaddlerClick={mockCallback}/>);
  const paddlerComponent = getByText('John');

  userEvent.click(paddlerComponent);
  expect(mockCallback).toHaveBeenCalledTimes(1);
});
