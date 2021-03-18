import React from "react";
import { render } from "@testing-library/react";
import Paddler from "./Paddler";
import { v4 as uuidv4 } from "uuid";
import { screen } from "@testing-library/dom";
import Store from "../../Store";

const paddlerProfile = Object.freeze({
  id: uuidv4(),
  firstName: "John",
  lastName: "Smith",
  gender: "male",
  weight: "345",
  inBoat: false,
  seatId: "",
  isSelected: false,
});

const paddlerInitials = `${paddlerProfile.firstName[0].toUpperCase()}${paddlerProfile.lastName[0].toUpperCase()}`;

beforeEach(() => {
  render(
    <Store>
      <Paddler paddlerProfile={paddlerProfile} />
    </Store>
  );
});

it("displays initials of paddler when component is created", () => {
  expect(screen.getByText(paddlerInitials)).toBeInTheDocument();
});
