import React from "react";
import { render } from "@testing-library/react";
import { v4 as uuidv4 } from "uuid";
import ProfileInfo from "./ProfileInfo";
import { screen } from "@testing-library/dom";

let paddlerProfile;
beforeAll(() => {
  paddlerProfile = {
    id: uuidv4(),
    name: "John",
    gender: "male",
    weight: 250,
    inBoat: false,
    seatId: "",
    isSelected: true,
    isHovered: false,
  };
});

it("displays provided paddler's info", () => {
  render(<ProfileInfo paddler={paddlerProfile} />);

  expect(screen.getByRole("list")).toBeInTheDocument();
  expect(screen.getByText("Name: John")).toBeInTheDocument();
  expect(screen.getByText("Gender: male")).toBeInTheDocument();
  expect(screen.getByText("Weight (lb): 250")).toBeInTheDocument();
});
