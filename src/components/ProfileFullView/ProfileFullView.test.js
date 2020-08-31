import React from "react";
import { render } from "@testing-library/react";
import { v4 as uuidv4 } from "uuid";
import ProfileFullView from "./ProfileFullView";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import Store from "../../Store";

let paddlerProfile;
beforeAll(() => {
  paddlerProfile = {
    id: uuidv4(),
    name: "John",
    gender: "Male",
    weight: "250",
    inBoat: false,
    seatId: "",
    isSelected: true,
    isHovered: false,
  };
});

beforeEach(() => {
  render(
    <Store>
      <ProfileFullView paddler={paddlerProfile} />
    </Store>
  );
});

it("displays extended options for selected paddler's profile", () => {
  expect(screen.getByRole("list")).toBeInTheDocument();
  expect(screen.getByText(`Name: ${paddlerProfile.name}`)).toBeInTheDocument();
  expect(
    screen.getByText(`Gender: ${paddlerProfile.gender}`)
  ).toBeInTheDocument();
  expect(
    screen.getByText(`Weight (lb): ${paddlerProfile.weight}`)
  ).toBeInTheDocument();

  expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
});

it("displays paddler form pre-filled with paddler info when edit button is clicked on", () => {
  userEvent.click(screen.getByRole("button", { name: "Edit" }));

  expect(screen.getByTestId("paddlerForm")).toBeInTheDocument();
  expect(screen.getByLabelText("Name").value).toBe(paddlerProfile.name);
  expect(screen.getByLabelText(paddlerProfile.gender).checked).toBeTruthy();
  expect(screen.getByLabelText("Weight(lb)").value).toBe(paddlerProfile.weight);
});

it("returns to profile in full-view window when user clicks back button from editing form", () => {
  userEvent.click(screen.getByRole("button", { name: "Edit" }));
  userEvent.click(screen.getByRole("button", { name: "Back" }));

  expect(screen.queryByTestId("paddlerForm")).not.toBeInTheDocument();
});
