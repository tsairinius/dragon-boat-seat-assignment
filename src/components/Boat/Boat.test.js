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
    name: "Bob",
    gender: "male",
    weight: "125",
    inBoat: true,
    seatId: 3,
    isSelected: false,
  };

  render(
    <Store>
      <Boat paddlersInBoat={[paddler]} />
    </Store>
  );

  expect(screen.getByText("Bob").parentElement).toBe(
    screen.getByTestId("seat3")
  );
});
