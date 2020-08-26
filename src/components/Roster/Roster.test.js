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
  const paddlerBob = {
    id: uuidv4(),
    name: "Bob",
    gender: "male",
    weight: "125",
    inBoat: false,
    seatId: "",
    isSelected: false,
  };

  const { getByTestId } = render(
    <Store>
      <Roster label={"Roster"} paddlers={[paddlerBob]} />
    </Store>
  );

  expect(screen.getByText("Bob").parentElement).toBe(getByTestId("roster"));
});
