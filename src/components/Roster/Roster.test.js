import React from "react";
import { render } from "@testing-library/react";
import Roster from "./Roster";
import { v4 as uuidv4 } from "uuid";
import { screen } from "@testing-library/dom";

let handlePaddlerClick;
let handlePaddlerMouseEnter;
let handlePaddlerMouseLeave;
beforeAll(() => {
  handlePaddlerClick = jest.fn();
  handlePaddlerMouseEnter = jest.fn();
  handlePaddlerMouseLeave = jest.fn();
});

it("renders Roster without crashing", () => {
  render(
    <Roster
      label={"Roster"}
      paddlers={[]}
      handlePaddlerClick={handlePaddlerClick}
      handlePaddlerMouseEnter={handlePaddlerMouseEnter}
      handlePaddlerMouseLeave={handlePaddlerMouseLeave}
    />
  );
});

it("renders Paddler in Roster", () => {
  const paddlerBob = {
    id: uuidv4(),
    name: "Bob",
    gender: "male",
    weight: "125",
    inBoat: true,
    seatId: 1,
    isActive: false,
  };

  const { getByTestId } = render(
    <Roster
      label={"Roster"}
      paddlers={[paddlerBob]}
      handlePaddlerClick={handlePaddlerClick}
      handlePaddlerMouseEnter={handlePaddlerMouseEnter}
      handlePaddlerMouseLeave={handlePaddlerMouseLeave}
    />
  );

  expect(screen.getByText("Bob").parentElement).toBe(getByTestId("roster"));
});
