import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { screen, within } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import Store from "./Store";

const paddlerInfo = Object.freeze({
  firstName: "Eric",
  lastName: "Johnson",
  gender: "Male",
  weight: "200",
});

const paddlerInitials = `${paddlerInfo.firstName[0].toUpperCase()}${paddlerInfo.lastName[0].toUpperCase()}`;

const createPaddlerAndViewRoster = async () => {
  const rosterTab = screen.getByTestId("tab-roster");
  const createPaddlerTab = screen.getByTestId("tab-create-paddler");
  userEvent.click(createPaddlerTab);

  const firstNameInput = screen.getByLabelText("First");
  const lastNameInput = screen.getByLabelText("Last");
  const maleButton = screen.getByLabelText(paddlerInfo.gender);
  const weightInput = screen.getByLabelText("Weight(lb)");
  const submitButton = screen.getByRole("button", { name: "Submit" });

  await userEvent.type(firstNameInput, paddlerInfo.firstName);
  await userEvent.type(lastNameInput, paddlerInfo.lastName);
  userEvent.click(maleButton);
  await userEvent.type(weightInput, paddlerInfo.weight);
  userEvent.click(submitButton);
  userEvent.click(rosterTab);
};

const movePaddlerFromRosterToBoatSeat = (paddler, seat) => {
  const paddlerInitials = `${paddler.firstName[0].toUpperCase()}${paddler.lastName[0].toUpperCase()}`;
  userEvent.click(screen.getByText(paddlerInitials));
  userEvent.click(screen.getByText("Move to Boat"));
  userEvent.click(screen.getByTestId(`${seat}`));
};

describe("Saving seat assignments", () => {
  beforeEach(() => {
    render(
      <Store>
        <App />
      </Store>
    )
  });

  it("Save tab is shown only when viewing boat", () => {
    userEvent.click(screen.getByTestId("tab-boat"));
    expect(screen.getByTestId("tab-save-boat")).toBeInTheDocument();

    userEvent.click(screen.getByTestId("tab-roster"));
    expect(screen.queryByTestId("tab-save-boat")).not.toBeInTheDocument();

    userEvent.click(screen.getByTestId("tab-create-paddler"));
    expect(screen.queryByTestId("tab-save-boat")).not.toBeInTheDocument();
  });
});

describe("'Choose a seat' message behavior", () => {
  beforeEach(async () => {
    render(
      <Store>
        <App />
      </Store>
    );
    await createPaddlerAndViewRoster();
  });

  const enterAndExitSeatAssignmentMode = () => {
    userEvent.click(screen.getByText(paddlerInitials));
    userEvent.click(screen.getByText("Move to Boat"));
    userEvent.click(screen.getByTestId("btnCancelSeatAssignment"));
  }

  it("'Cancel button shown when moving paddler from roster to boat", () => {
    userEvent.click(screen.getByText(paddlerInitials));
    userEvent.click(screen.getByText("Move to Boat"));

    expect(screen.getByTestId("btnCancelSeatAssignment")).toBeInTheDocument();
  });

  it("Cancel button disappears once paddler is moved from roster to boat", () => {
    movePaddlerFromRosterToBoatSeat(paddlerInfo, "seat4");
    expect(screen.queryByTestId("btnCancelSeatAssignment")).not.toBeInTheDocument();
  });

  it("Cancel button is shown when moving paddler from one seat to another", () => {
    movePaddlerFromRosterToBoatSeat(paddlerInfo, "seat4");
    userEvent.click(screen.getByText(paddlerInitials));
    userEvent.click(screen.getByText("Switch Seats"));

    expect(screen.getByTestId("btnCancelSeatAssignment")).toBeInTheDocument();
  });

  it("Cancel button disappears when paddler is moved from one seat to another", () => {
    movePaddlerFromRosterToBoatSeat(paddlerInfo, "seat4");
    userEvent.click(screen.getByText(paddlerInitials));
    userEvent.click(screen.getByText("Switch Seats"));
    userEvent.click(screen.getByTestId("seat6"));

    expect(screen.queryByTestId("btnCancelSeatAssignment")).not.toBeInTheDocument();
  });

  it("Clicking cancel when choosing a seat exits choose-a-seat mode", () => {
    enterAndExitSeatAssignmentMode();

    expect(screen.queryByTestId("btnCancelSeatAssignment")).not.toBeInTheDocument();
  });

  it("After exiting choose-a-seat mode, clicking on an empty seat should not move previously selected paddler", () => {
    enterAndExitSeatAssignmentMode();

    userEvent.click(screen.getByTestId("seat6"));

    expect(screen.queryByText(paddlerInitials)).not.toBeInTheDocument();
  });

  it("After exiting choose-a-seat mode, should be able to select a paddler again", () => {
    enterAndExitSeatAssignmentMode();
    userEvent.click(screen.getByTestId("tab-roster"));
    userEvent.click(screen.getByText(paddlerInitials));

    expect(screen.getByRole("button", {name: "Move to Boat"})).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();
  });

});

describe("tests interactions with a single paddler", () => {
  beforeEach(async () => {
    render(
      <Store>
        <App />
      </Store>
    );
    await createPaddlerAndViewRoster();
  });

  it("renders paddler form when create-a-paddler tab is clicked", () => {
    const createPaddlerTab = screen.getByTestId("tab-create-paddler");
    userEvent.click(createPaddlerTab);

    expect(screen.getByTestId("createPaddlerForm")).toBeInTheDocument();
  });

  it("renders Paddler component in roster after new paddler is submitted", () => {
    expect(screen.getByText(paddlerInitials)).toBeInTheDocument();
    expect(screen.getByText(paddlerInitials).tagName).toBe("DIV");
  });

  it("renders Paddler in specified seat in boat", () => {
    const seatId = "seat5";
    movePaddlerFromRosterToBoatSeat(paddlerInfo, seatId);

    const seat = screen.getByTestId(seatId);
    expect(screen.getByText(paddlerInitials).parentElement.parentElement).toBe(seat);
  });

  it("moves paddler back to roster from boat when move-to-roster button is clicked", () => {
    const seatId = "seat5";
    movePaddlerFromRosterToBoatSeat(paddlerInfo, seatId);

    userEvent.click(screen.getByText(paddlerInitials));
    userEvent.click(screen.getByRole("button", { name: "Move to Roster" }));

    expect(screen.queryByText(paddlerInitials)).not.toBeInTheDocument();
    expect(screen.getByTestId("boat")).toBeInTheDocument();
  });

  it("displays profile of selected paddler in full-view window", () => {
    userEvent.click(screen.getByText(paddlerInitials));
    expect(screen.getByTestId("profileFullView")).toBeInTheDocument();
  });

  it("roster returns to screen upon cancelling profile full-view", () => {
    userEvent.click(screen.getByText(paddlerInitials));
    userEvent.click(screen.getByRole("button", { name: "Cancel" }));

    expect(screen.getByTestId("roster")).toBeInTheDocument();
    expect(screen.queryByTestId("profileFullView")).not.toBeInTheDocument();
  });

  it("paddler gets deleted from roster", () => {
    userEvent.click(screen.getByText(paddlerInitials));
    userEvent.click(screen.getByRole("button", { name: "Delete" }));

    expect(screen.queryByTestId("profileFullView")).not.toBeInTheDocument();
    expect(screen.queryByText(paddlerInitials)).not.toBeInTheDocument();
  });

  it("paddler gets deleted from boat", () => {
    movePaddlerFromRosterToBoatSeat(paddlerInfo, "seat4");

    userEvent.click(screen.getByTestId("tab-boat"));
    userEvent.click(screen.getByText(paddlerInitials));
    userEvent.click(screen.getByRole("button", {name: "Delete"}));

    expect(screen.queryByTestId("profileFullView")).not.toBeInTheDocument();
    expect(screen.queryByText(paddlerInitials)).not.toBeInTheDocument();
  });

  it("paddler's info gets updated after edit", async () => {
    const newInfo = {
      firstName: "Karen",
      lastName: "Wheeler",
      gender: "Female",
      weight: "400",
    };

    const newPaddlerInitials = `${newInfo.firstName[0].toUpperCase()}${newInfo.lastName[0].toUpperCase()}`;

    userEvent.click(screen.getByText(paddlerInitials));
    userEvent.click(screen.getByRole("button", { name: "Edit" }));

    const firstNameInput = screen.getByLabelText("First");
    const lastNameInput = screen.getByLabelText("Last");
    const weightInput = screen.getByLabelText("Weight(lb)");

    userEvent.clear(firstNameInput);
    await userEvent.type(firstNameInput, newInfo.firstName);
    userEvent.clear(lastNameInput);
    await userEvent.type(lastNameInput, newInfo.lastName);
    userEvent.click(screen.getByLabelText(newInfo.gender));
    userEvent.clear(weightInput);
    await userEvent.type(weightInput, newInfo.weight);
    userEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(screen.queryByText(paddlerInitials)).not.toBeInTheDocument();
    expect(screen.getByText(newPaddlerInitials)).toBeInTheDocument();

    userEvent.click(screen.getByText(newPaddlerInitials));
    const profileInfo = screen.getByTestId("profileInfo");
    expect(within(profileInfo).getByText(`${newInfo.firstName} ${newInfo.lastName}`)).toBeInTheDocument();
    expect(within(profileInfo).getByText(newInfo.gender)).toBeInTheDocument();
    expect(within(profileInfo).getByText(newInfo.weight)).toBeInTheDocument();
  });

  it("paddler gets moved from one seat to another in boat", () => {
    userEvent.click(screen.getByText(paddlerInitials));
    userEvent.click(screen.getByText("Move to Boat"));
    userEvent.click(screen.getByTestId("seat3"));
    userEvent.click(screen.getByText(paddlerInitials));
    userEvent.click(screen.getByText("Switch Seats"));
    userEvent.click(screen.getByTestId("seat18"));

    expect(screen.getByText(paddlerInitials).parentElement.parentElement).toBe(screen.getByTestId("seat18"));
  });
});

describe("tests interactions with multiple paddlers", () => {
  const paddler1 = {
    firstName: "Bob",
    lastName: "Smith",
    gender: "Other",
    weight: "150",
  };

  const paddler1Initials = `${paddler1.firstName[0].toUpperCase()}${paddler1.lastName[0].toUpperCase()}`;

  const paddler2 = {
    firstName: "Jenny",
    lastName: "Gordon",
    gender: "Female",
    weight: "120",
  };

  const paddler2Initials = `${paddler2.firstName[0].toUpperCase()}${paddler2.lastName[0].toUpperCase()}`;

  beforeEach(async () => {
    render(
      <Store>
        <App />
      </Store>
    );
    const createPaddlerTab = screen.getByTestId("tab-create-paddler");
    const rosterTab = screen.getByTestId("tab-roster");
    userEvent.click(createPaddlerTab);

    const firstNameInput = screen.getByLabelText("First");
    const lastNameInput = screen.getByLabelText("Last");
    const femaleButton = screen.getByLabelText(paddler2.gender);
    const otherButton = screen.getByLabelText(paddler1.gender);
    const weightInput = screen.getByLabelText("Weight(lb)");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    await userEvent.type(firstNameInput, paddler1.firstName);
    await userEvent.type(lastNameInput, paddler1.lastName);
    userEvent.click(otherButton);
    await userEvent.type(weightInput, paddler1.weight);
    userEvent.click(submitButton);

    await userEvent.type(firstNameInput, paddler2.firstName);
    await userEvent.type(lastNameInput, paddler2.lastName);
    userEvent.click(femaleButton);
    await userEvent.type(weightInput, paddler2.weight);
    userEvent.click(submitButton);

    userEvent.click(rosterTab);
  });

  it("renders multiple paddlers in user-specified seats on boat", () => {
    userEvent.click(screen.getByText(paddler1Initials));
    userEvent.click(screen.getByText("Move to Boat"));
    userEvent.click(screen.getByTestId("seat0"));

    userEvent.click(screen.getByTestId("tab-roster"));
    userEvent.click(screen.getByText(paddler2Initials));
    userEvent.click(screen.getByText("Move to Boat"));
    userEvent.click(screen.getByTestId("seat21"));

    expect(screen.getByText(paddler1Initials).parentElement.parentElement).toBe(screen.getByTestId("seat0"));
    expect(screen.getByText(paddler2Initials).parentElement.parentElement).toBe(screen.getByTestId("seat21"));
  });

  it("keeps original paddler in seat when user tries to assign another paddler to that seat", () => {
    userEvent.click(screen.getByText(paddler1Initials));
    userEvent.click(screen.getByText("Move to Boat"));
    userEvent.click(screen.getByTestId("seat3"));

    userEvent.click(screen.getByTestId("tab-roster"));
    userEvent.click(screen.getByText(paddler2Initials));
    userEvent.click(screen.getByText("Move to Boat"));
    userEvent.click(screen.getByText(paddler1Initials));

    expect(screen.getByText(paddler1Initials).parentElement.parentElement).toBe(
      screen.getByTestId("seat3")
    );
  });
});
