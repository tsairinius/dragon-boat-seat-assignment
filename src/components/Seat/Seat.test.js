import React from "react";
import { render } from "@testing-library/react";
import Seat from "./Seat";
import userEvent from "@testing-library/user-event";

it("renders Seat component without crashing", () => {
  const onSeatClick = jest.fn();
  render(<Seat id={1} onSeatClick={onSeatClick} />);
});

it("calls appropriate callback function when Seat is clicked on", () => {
  const onSeatClick = jest.fn();
  const { getByTestId } = render(<Seat id={1} onSeatClick={onSeatClick} />);
  userEvent.click(getByTestId("seat1"));
  expect(onSeatClick).toHaveBeenCalledTimes(1);
});
