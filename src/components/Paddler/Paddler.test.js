import React from "react";
import { render } from "@testing-library/react";
import Paddler from "./Paddler";
import { v4 as uuidv4 } from "uuid";
import userEvent from "@testing-library/user-event";

let paddlerProfile;
let onPaddlerClick;
let onPaddlerMouseEnter;
let onPaddlerMouseLeave;
beforeAll(() => {
  onPaddlerClick = jest.fn();
  onPaddlerMouseEnter = jest.fn();
  onPaddlerMouseLeave = jest.fn();

  paddlerProfile = {
    id: uuidv4(),
    name: "John",
    gender: "male",
    weight: "345",
    inBoat: false,
    seatId: "",
    isActive: false,
  };
});

it("renders Paddler component without crashing", () => {
  render(
    <Paddler
      paddlerProfile={paddlerProfile}
      onPaddlerClick={onPaddlerClick}
      onPaddlerMouseEnter={onPaddlerMouseEnter}
      onPaddlerMouseLeave={onPaddlerMouseLeave}
    />
  );
});

it("displays name of paddler when component is created", () => {
  const { getByText } = render(
    <Paddler
      paddlerProfile={paddlerProfile}
      onPaddlerClick={onPaddlerClick}
      onPaddlerMouseEnter={onPaddlerMouseEnter}
      onPaddlerMouseLeave={onPaddlerMouseLeave}
    />
  );
  expect(getByText("John")).toBeInTheDocument();
});

it("calls appropriate callback function when Paddler component is clicked on", () => {
  const { getByText } = render(
    <Paddler
      paddlerProfile={paddlerProfile}
      onPaddlerClick={onPaddlerClick}
      onPaddlerMouseEnter={onPaddlerMouseEnter}
      onPaddlerMouseLeave={onPaddlerMouseLeave}
    />
  );
  const paddlerComponent = getByText("John");

  userEvent.click(paddlerComponent);
  expect(onPaddlerClick).toHaveBeenCalledTimes(1);
});

it("calls appropriate callback function when mouse is over Paddler component", () => {
  const { getByText } = render(
    <Paddler
      paddlerProfile={paddlerProfile}
      onPaddlerClick={onPaddlerClick}
      onPaddlerMouseEnter={onPaddlerMouseEnter}
      onPaddlerMouseLeave={onPaddlerMouseLeave}
    />
  );
  const paddlerComponent = getByText("John");

  userEvent.hover(paddlerComponent);

  expect(onPaddlerMouseEnter).toHaveBeenCalled();
});

it("calls appropriate callback function when mouse hovers then unhovers from Paddler component", () => {
  const { getByText } = render(
    <Paddler
      paddlerProfile={paddlerProfile}
      onPaddlerClick={onPaddlerClick}
      onPaddlerMouseEnter={onPaddlerMouseEnter}
      onPaddlerMouseLeave={onPaddlerMouseLeave}
    />
  );
  const paddlerComponent = getByText("John");

  userEvent.hover(paddlerComponent);
  userEvent.unhover(paddlerComponent);

  expect(onPaddlerMouseLeave).toHaveBeenCalledTimes(1);
});
