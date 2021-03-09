import React from "react";
import { render } from "@testing-library/react";
import { v4 as uuidv4 } from "uuid";
import ProfilePreview from "./ProfilePreview";
import { screen } from "@testing-library/dom";

const paddlerProfile = Object.freeze({
  id: uuidv4(),
  name: "John",
  gender: "male",
  weight: 250,
  inBoat: false,
  seatId: "",
  isSelected: false,
  isHovered: true,
})

it("renders ProfilePreview without crashing", () => {
  render(<ProfilePreview paddler={paddlerProfile} />);
});

it("displays info of specified paddler", () => {
  render(<ProfilePreview paddler={paddlerProfile} />);

  expect(screen.getByTestId("profileInfo")).toBeInTheDocument();
  expect(screen.getByText("Name:")).toBeInTheDocument();
  expect(screen.getByText("John")).toBeInTheDocument();
  expect(screen.getByText("Gender:")).toBeInTheDocument();  
  expect(screen.getByText("male")).toBeInTheDocument();
  expect(screen.getByText("Weight (lb):")).toBeInTheDocument();
  expect(screen.getByText("250")).toBeInTheDocument();
});
