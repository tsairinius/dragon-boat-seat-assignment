import React from "react";
import { render } from "@testing-library/react";
import { v4 as uuidv4 } from "uuid";
import ProfileFullView from "./ProfileFullView";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import Store from "../../Store";

const paddlerInRoster = Object.freeze({
  id: uuidv4(),
  name: "John",
  gender: "Male",
  weight: "250",
  inBoat: false,
  seatId: "",
  isSelected: true,
  isHovered: false,
});

const paddlerInBoat = Object.freeze({
  ...paddlerInRoster,
  inBoat: true
});

describe("paddler edit behavior", () => {
  beforeEach(() => {
    render(
      <Store>
        <ProfileFullView paddler={paddlerInRoster} onTabChangeRequest={() => jest.fn()} />
      </Store>
    );
  });

  it("displays paddler form pre-filled with paddler info when edit button is clicked on", () => {
    userEvent.click(screen.getByRole("button", { name: "Edit" }));
  
    expect(screen.getByTestId("paddlerForm")).toBeInTheDocument();
    expect(screen.getByLabelText("Name").value).toBe(paddlerInRoster.name);
    expect(screen.getByLabelText(paddlerInRoster.gender).checked).toBeTruthy();
    expect(screen.getByLabelText("Weight(lb)").value).toBe(paddlerInRoster.weight);
  });
  
  it("returns to profile in full-view window when user clicks back button from editing form", () => {
    userEvent.click(screen.getByRole("button", { name: "Edit" }));
    userEvent.click(screen.getByRole("button", { name: "Back" }));
  
    expect(screen.queryByTestId("paddlerForm")).not.toBeInTheDocument();
  });
});

describe("display appropriate button for moving paddler between boat and roster", () => {
  const verifyPaddlerInfoAndOptionsDisplayed = (paddler) => {
    expect(screen.getByRole("list")).toBeInTheDocument();
    expect(screen.getByText(`Name: ${paddler.name}`)).toBeInTheDocument();
    expect(
      screen.getByText(`Gender: ${paddler.gender}`)
    ).toBeInTheDocument();
    expect(
      screen.getByText(`Weight (lb): ${paddler.weight}`)
    ).toBeInTheDocument();
  
    expect(screen.getByRole("button", { name: "Edit" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Delete" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Cancel" })).toBeInTheDocument();
  };

  it("for paddler in roster: displays options along with move-to-boat button for selected paddler", () => {
    render(
      <Store>
        <ProfileFullView paddler={paddlerInRoster} onTabChangeRequest={() => jest.fn()} />
      </Store>
    );
  
    verifyPaddlerInfoAndOptionsDisplayed(paddlerInRoster);
  
    expect(screen.getByRole("button", {name: "Move to Boat"})).toBeInTheDocument();
  });
  
  it("for paddler in boat: displays options along with move-to-roster button for selected paddler", () => {
    render(
      <Store>
        <ProfileFullView paddler={paddlerInBoat} onTabChangeRequest={() => jest.fn()} />
      </Store>
    );
  
    verifyPaddlerInfoAndOptionsDisplayed(paddlerInBoat);
  
    expect(screen.getByRole("button", {name: "Move to Roster"})).toBeInTheDocument();
  });
});

