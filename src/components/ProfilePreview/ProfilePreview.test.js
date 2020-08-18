import React from "react";
import { render } from "@testing-library/react";
import { v4 as uuidv4 } from "uuid";
import ProfilePreview from "./ProfilePreview";
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
    isSelected: false,
    isHovered: true,
  };
});

it("renders ProfilePreview without crashing", () => {
  render(<ProfilePreview paddler={paddlerProfile} />);
});

it("displays info of specified paddler", () => {
  render(<ProfilePreview paddler={paddlerProfile} />);

  expect(screen.getByRole("list")).toBeInTheDocument();
  expect(screen.getByText("Name: John")).toBeInTheDocument();
  expect(screen.getByText("Gender: male")).toBeInTheDocument();
  expect(screen.getByText("Weight (lb): 250")).toBeInTheDocument();
});
