import React from "react";
import { render } from "@testing-library/react";
import Roster from "./Roster";
import { v4 as uuidv4 } from "uuid";
import { screen } from "@testing-library/dom";
import Store from "../../Store";

it("renders Roster without crashing", () => {
  render(<Roster label={"Roster"} paddlers={[]} />);
});

it("renders Paddler in Roster", () => {
  const paddler = {
    id: uuidv4(),
    firstName: "Bob",
    lastName: "Smith",
    gender: "male",
    weight: "125",
    inBoat: false,
    seatId: "",
    isSelected: false,
  };

  const paddlerInitials = `${paddler.firstName[0].toUpperCase()}${paddler.lastName[0].toUpperCase()}`;

  const { getByTestId } = render(
    <Store>
      <Roster label={"Roster"} paddlers={[paddler]} />
    </Store>
  );

  expect(screen.getByText(paddlerInitials).parentElement.parentElement).toBe(getByTestId("roster"));
});
