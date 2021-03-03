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

  expect(screen.getByTestId("profileInfo")).toBeInTheDocument();
  expect(screen.getByText("Name:")).toBeInTheDocument();
  expect(screen.getByText("John")).toBeInTheDocument();
  expect(screen.getByText("Gender:")).toBeInTheDocument();  
  expect(screen.getByText("male")).toBeInTheDocument();
  expect(screen.getByText("Weight (lb):")).toBeInTheDocument();
  expect(screen.getByText("250")).toBeInTheDocument();
});
