import React from "react";
import { render } from "@testing-library/react";
import Roster from "./Roster";
import { v4 as uuidv4 } from "uuid";
import { screen } from "@testing-library/dom";

let onPaddlerClick;
let onPaddlerMouseEnter;
let onPaddlerMouseLeave;
beforeAll(() => {
  onPaddlerClick = jest.fn();
  onPaddlerMouseEnter = jest.fn();
  onPaddlerMouseLeave = jest.fn();
});

it("renders Roster without crashing", () => {
  render(
    <Roster
      label={"Roster"}
      paddlers={[]}
      onPaddlerClick={onPaddlerClick}
      onPaddlerMouseEnter={onPaddlerMouseEnter}
      onPaddlerMouseLeave={onPaddlerMouseLeave}
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
      onPaddlerClick={onPaddlerClick}
      onPaddlerMouseEnter={onPaddlerMouseEnter}
      onPaddlerMouseLeave={onPaddlerMouseLeave}
    />
  );

  expect(screen.getByText("Bob").parentElement).toBe(getByTestId("roster"));
});
