import React from "react";
import { render } from "@testing-library/react";
import { v4 as uuidv4 } from "uuid";
import ProfileFullView from "./ProfileFullView";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

let paddlerProfile;
let handleFormSubmit;
let handleFullViewDelete;
let handleFullViewCancel;
let handleMoveToRoster;
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

  handleFormSubmit = jest.fn();
  handleFullViewDelete = jest.fn();
  handleMoveToRoster = jest.fn();
  handleFullViewCancel = jest.fn();
});

it("displays extended options for selected paddler's profile", () => {
  render(
    <ProfileFullView
      paddler={paddlerProfile}
      onFormSubmit={handleFormSubmit}
      onFullViewDelete={handleFullViewDelete}
      onMoveToRoster={handleMoveToRoster}
      onFullViewCancel={handleFullViewCancel}
    />
  );

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
  render(
    <ProfileFullView
      paddler={paddlerProfile}
      onFormSubmit={handleFormSubmit}
      onFullViewDelete={handleFullViewDelete}
      onMoveToRoster={handleMoveToRoster}
      onFullViewCancel={handleFullViewCancel}
    />
  );
  userEvent.click(screen.getByRole("button", { name: "Edit" }));

  expect(screen.getByTestId("paddlerForm")).toBeInTheDocument();
  expect(screen.getByLabelText("Name").value).toBe(paddlerProfile.name);
  expect(screen.getByLabelText(paddlerProfile.gender).checked).toBeTruthy();
  expect(screen.getByLabelText("Weight(lb)").value).toBe(paddlerProfile.weight);
});

it("returns to profile in full-view window when user clicks back button from editing form", () => {
  render(
    <ProfileFullView
      paddler={paddlerProfile}
      onFormSubmit={handleFormSubmit}
      onFullViewDelete={handleFullViewDelete}
      onMoveToRoster={handleMoveToRoster}
      onFullViewCancel={handleFullViewCancel}
    />
  );

  userEvent.click(screen.getByRole("button", { name: "Edit" }));
  userEvent.click(screen.getByRole("button", { name: "Back" }));

  expect(screen.queryByTestId("paddlerForm")).not.toBeInTheDocument();
});
