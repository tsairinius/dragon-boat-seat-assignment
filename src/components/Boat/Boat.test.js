import React from "react";
import { render } from "@testing-library/react";
import Boat from "./Boat";
import { screen } from "@testing-library/dom";
import { v4 as uuidv4 } from "uuid";
import Store from "../../Store";

it("renders Boat component without crashing", () => {
  render(
    <Store>
      <Boat paddlersInBoat={[]} />
    </Store>
  );
});

it("renders boat with paddler in specified seat", () => {
  const paddler = {
    id: uuidv4(),
    firstName: "Bob",
    lastName: "Smith",
    gender: "male",
    weight: "125",
    inBoat: true,
    seatId: 3,
    isSelected: false,
  };

  const paddlerInitials = `${paddler.firstName[0].toUpperCase()}${paddler.lastName[0].toUpperCase()}`;

  render(
    <Store>
      <Boat paddlersInBoat={[paddler]} />
    </Store>
  );

  expect(screen.getByText(paddlerInitials).parentElement.parentElement).toBe(
    screen.getByTestId("seat3")
  );
});
