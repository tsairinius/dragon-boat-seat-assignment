import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { screen, within } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import Store from "./Store";

const firstPaddler = Object.freeze({
  firstName: "Eric",
  lastName: "Johnson",
  gender: "Male",
  weight: "200",
});

const secondPaddler = Object.freeze({
  firstName: "Karen",
  lastName: "Wheeler",
  gender: "Female",
  weight: "400",
});

const firstPaddlerInitials = `${firstPaddler.firstName[0].toUpperCase()}${firstPaddler.lastName[0].toUpperCase()}`;
const secondPaddlerInitials = `${secondPaddler.firstName[0].toUpperCase()}${secondPaddler.lastName[0].toUpperCase()}`;

const createPaddlerAndViewRoster = async (paddler) => {
  const rosterTab = screen.getByTestId("tab-roster");
  const createPaddlerTab = screen.getByTestId("tab-create-paddler");
  userEvent.click(createPaddlerTab);

  const firstNameInput = screen.getByLabelText("First");
  const lastNameInput = screen.getByLabelText("Last");
  const maleButton = screen.getByLabelText(paddler.gender);
  const weightInput = screen.getByLabelText("Weight(lb)");
  const submitButton = screen.getByRole("button", { name: "Submit" });

  await userEvent.type(firstNameInput, paddler.firstName);
  await userEvent.type(lastNameInput, paddler.lastName);
  userEvent.click(maleButton);
  await userEvent.type(weightInput, paddler.weight);
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
    expect(screen.getByTestId("tab-save-assignment")).toBeInTheDocument();

    userEvent.click(screen.getByTestId("tab-roster"));
    expect(screen.queryByTestId("tab-save-assignment")).not.toBeInTheDocument();

    userEvent.click(screen.getByTestId("tab-create-paddler"));
    expect(screen.queryByTestId("tab-save-assignment")).not.toBeInTheDocument();
  });
});

describe("'Choose a seat' message behavior", () => {
  beforeEach(async () => {
    render(
      <Store>
        <App />
      </Store>
    );
    await createPaddlerAndViewRoster(firstPaddler);
  });

  const enterAndExitSeatAssignmentMode = () => {
    userEvent.click(screen.getByText(firstPaddlerInitials));
    userEvent.click(screen.getByText("Move to Boat"));
    userEvent.click(screen.getByTestId("btnCancelSeatAssignment"));
  }

  it("'Cancel button shown when moving paddler from roster to boat", () => {
    userEvent.click(screen.getByText(firstPaddlerInitials));
    userEvent.click(screen.getByText("Move to Boat"));

    expect(screen.getByTestId("btnCancelSeatAssignment")).toBeInTheDocument();
  });

  it("Cancel button disappears once paddler is moved from roster to boat", () => {
    movePaddlerFromRosterToBoatSeat(firstPaddler, "seat4");
    expect(screen.queryByTestId("btnCancelSeatAssignment")).not.toBeInTheDocument();
  });

  it("Cancel button is shown when moving paddler from one seat to another", () => {
    movePaddlerFromRosterToBoatSeat(firstPaddler, "seat4");
    userEvent.click(screen.getByText(firstPaddlerInitials));
    userEvent.click(screen.getByText("Switch Seats"));

    expect(screen.getByTestId("btnCancelSeatAssignment")).toBeInTheDocument();
  });

  it("Cancel button disappears when paddler is moved from one seat to another", () => {
    movePaddlerFromRosterToBoatSeat(firstPaddler, "seat4");
    userEvent.click(screen.getByText(firstPaddlerInitials));
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

    expect(screen.queryByText(firstPaddlerInitials)).not.toBeInTheDocument();
  });

  it("After exiting choose-a-seat mode, should be able to select a paddler again", () => {
    enterAndExitSeatAssignmentMode();
    userEvent.click(screen.getByTestId("tab-roster"));
    userEvent.click(screen.getByText(firstPaddlerInitials));

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
    await createPaddlerAndViewRoster(firstPaddler);
  });

  it("renders paddler form when create-a-paddler tab is clicked", () => {
    const createPaddlerTab = screen.getByTestId("tab-create-paddler");
    userEvent.click(createPaddlerTab);

    expect(screen.getByTestId("createPaddlerForm")).toBeInTheDocument();
  });

  it("renders Paddler component in roster after new paddler is submitted", () => {
    expect(screen.getByText(firstPaddlerInitials)).toBeInTheDocument();
    expect(screen.getByText(firstPaddlerInitials).tagName).toBe("DIV");
  });

  it("renders Paddler in specified seat in boat", () => {
    const seatId = "seat5";
    movePaddlerFromRosterToBoatSeat(firstPaddler, seatId);

    const seat = screen.getByTestId(seatId);
    expect(screen.getByText(firstPaddlerInitials).parentElement.parentElement).toBe(seat);
  });

  it("moves paddler back to roster from boat when move-to-roster button is clicked", () => {
    const seatId = "seat5";
    movePaddlerFromRosterToBoatSeat(firstPaddler, seatId);

    userEvent.click(screen.getByText(firstPaddlerInitials));
    userEvent.click(screen.getByRole("button", { name: "Move to Roster" }));

    expect(screen.queryByText(firstPaddlerInitials)).not.toBeInTheDocument();
    expect(screen.getByTestId("boat")).toBeInTheDocument();
  });

  it("displays profile of selected paddler in full-view window", () => {
    userEvent.click(screen.getByText(firstPaddlerInitials));
    expect(screen.getByTestId("profile-full-view")).toBeInTheDocument();
  });

  it("roster returns to screen upon cancelling profile full-view", () => {
    userEvent.click(screen.getByText(firstPaddlerInitials));
    userEvent.click(screen.getByRole("button", { name: "Cancel" }));

    expect(screen.getByTestId("roster")).toBeInTheDocument();
    expect(screen.queryByTestId("profile-full-view")).not.toBeInTheDocument();
  });

  it("paddler gets deleted from roster", () => {
    userEvent.click(screen.getByText(firstPaddlerInitials));
    userEvent.click(screen.getByRole("button", { name: "Delete" }));

    expect(screen.queryByTestId("profile-full-view")).not.toBeInTheDocument();
    expect(screen.queryByText(firstPaddlerInitials)).not.toBeInTheDocument();
  });

  it("paddler gets deleted from boat", () => {
    movePaddlerFromRosterToBoatSeat(firstPaddler, "seat4");

    userEvent.click(screen.getByTestId("tab-boat"));
    userEvent.click(screen.getByText(firstPaddlerInitials));
    userEvent.click(screen.getByRole("button", {name: "Delete"}));

    expect(screen.queryByTestId("profile-full-view")).not.toBeInTheDocument();
    expect(screen.queryByText(firstPaddlerInitials)).not.toBeInTheDocument();
  });

  it("paddler's info gets updated after edit", async () => {
    userEvent.click(screen.getByText(firstPaddlerInitials));
    userEvent.click(screen.getByRole("button", { name: "Edit" }));

    const firstNameInput = screen.getByLabelText("First");
    const lastNameInput = screen.getByLabelText("Last");
    const weightInput = screen.getByLabelText("Weight(lb)");

    userEvent.clear(firstNameInput);
    await userEvent.type(firstNameInput, secondPaddler.firstName);
    userEvent.clear(lastNameInput);
    await userEvent.type(lastNameInput, secondPaddler.lastName);
    userEvent.click(screen.getByLabelText(secondPaddler.gender));
    userEvent.clear(weightInput);
    await userEvent.type(weightInput, secondPaddler.weight);
    userEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(screen.queryByText(firstPaddlerInitials)).not.toBeInTheDocument();
    expect(screen.getByText(secondPaddlerInitials)).toBeInTheDocument();

    userEvent.click(screen.getByText(secondPaddlerInitials));
    const profileInfo = screen.getByTestId("profileInfo");
    expect(within(profileInfo).getByText(`${secondPaddler.firstName} ${secondPaddler.lastName}`)).toBeInTheDocument();
    expect(within(profileInfo).getByText(secondPaddler.gender)).toBeInTheDocument();
    expect(within(profileInfo).getByText(secondPaddler.weight)).toBeInTheDocument();
  });

  it("paddler gets moved from one seat to another in boat", () => {
    userEvent.click(screen.getByText(firstPaddlerInitials));
    userEvent.click(screen.getByText("Move to Boat"));
    userEvent.click(screen.getByTestId("seat3"));
    userEvent.click(screen.getByText(firstPaddlerInitials));
    userEvent.click(screen.getByText("Switch Seats"));
    userEvent.click(screen.getByTestId("seat18"));

    expect(screen.getByText(firstPaddlerInitials).parentElement.parentElement).toBe(screen.getByTestId("seat18"));
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

describe("Assignment saving feature", () => {
  beforeEach(async () => {
    render(
      <Store>
        <App />
      </Store>
    );

    await createPaddlerAndViewRoster(firstPaddler);
    movePaddlerFromRosterToBoatSeat(firstPaddler, "seat1");
  });

  const saveFirstAssignment = async (assignmentName) => {
    userEvent.click(screen.getByTestId("tab-save-assignment"));
    await userEvent.type(screen.getByLabelText("Name"), assignmentName);
    userEvent.click(screen.getByRole("button", {name: "Save"}));
  };

  const saveAndApplyFirstAssignment = async (assignmentName) => {
    await saveFirstAssignment(assignmentName);
    userEvent.click(screen.getByTestId("tab-saved-assignments"));
    userEvent.click(screen.getByText("Boat 1"));
    userEvent.click(screen.getByRole("button", {name: "Apply to Boat"}));
    userEvent.click(screen.getByTestId("tab-boat"));
  };

  it("An assignment with an extra long name has its name display in truncated form", async () => {
    await saveFirstAssignment("Antetokounmpo");

    userEvent.click(screen.getByTestId("tab-saved-assignments"));
    expect(screen.getByText("Antetokoun...")).toBeInTheDocument();
    expect(screen.queryByText("Antetokounmpo")).not.toBeInTheDocument();
  });

  it("Save-assignment option does not appear on any tab other than the boat tab", () => {
    userEvent.click(screen.getByTestId("tab-roster"));
    expect(screen.queryByTestId("tab-save-assignment")).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId("tab-create-paddler"));
    expect(screen.queryByTestId("tab-save-assignment")).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId("tab-saved-assignments"));
    expect(screen.queryByTestId("tab-save-assignment")).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId("tab-boat"));
    expect(screen.getByTestId("tab-save-assignment")).toBeInTheDocument();
  });

  it("Clicking save on boat tab brings up window to name and save current seating assignment", () => {
    userEvent.click(screen.getByTestId("tab-save-assignment"));
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByRole("button", {name: "Save"})).toBeInTheDocument();
    expect(screen.getByRole("button", {name: "Cancel"})).toBeInTheDocument();
  });

  it("Entering a boat name and clicking save result in saved seat assignment in saved assignments tab", async () => {
    await saveFirstAssignment("Boat 1");
    userEvent.click(screen.getByTestId("tab-saved-assignments"));
    expect(screen.getByText("Boat 1")).toBeInTheDocument();
  });

  it("Clicking cancel in save-assignment window exits the window and returns to boat", () => {
    userEvent.click(screen.getByTestId("tab-save-assignment"));
    userEvent.click(screen.getByRole("button", {name: "Cancel"}));

    expect(screen.queryByTestId("save-assignment-window")).not.toBeInTheDocument();
  });

  it("Clicking on a saved seating assignment loads it into boat", async () => {
    await saveFirstAssignment("Boat 1");

    userEvent.click(screen.getByText(firstPaddlerInitials));
    userEvent.click(screen.getByRole("button", {name: "Move to Roster"}));
    
    expect(screen.queryByText(firstPaddlerInitials)).not.toBeInTheDocument();

    userEvent.click(screen.getByTestId("tab-saved-assignments"));
    userEvent.click(screen.getByText("Boat 1"));
    userEvent.click(screen.getByRole("button", {name: "Apply to Boat"}));

    userEvent.click(screen.getByTestId("tab-boat"));
    expect(screen.getByText(firstPaddlerInitials).parentElement.parentElement).toBe(screen.getByTestId("seat1"));
  });

  it("Clicking on an assignment and hitting cancel exits options window", async () => {
    await saveFirstAssignment("Boat 1");

    userEvent.click(screen.getByTestId("tab-saved-assignments"));
    userEvent.click(screen.getByText("Boat 1"));

    expect(screen.getByTestId("selected-assignment-options")).toBeInTheDocument();

    userEvent.click(screen.getByRole("button", {name: "Cancel"}));

    expect(screen.queryByTestId("selected-assignment-options")).not.toBeInTheDocument();
  });

  it("Clicking delete button deletes selected assignment and exits options window", async () => {
    await saveFirstAssignment("Boat 1");

    userEvent.click(screen.getByTestId("tab-saved-assignments"));
    userEvent.click(screen.getByText("Boat 1"));
    userEvent.click(screen.getByRole("button", {name: "Delete"}));

    expect(screen.queryByTestId("selected-assignment-options")).not.toBeInTheDocument();
    expect(screen.queryByText("Boat 1")).not.toBeInTheDocument();
  });

  it("Applying seat assignment with paddlers no longer on current roster will re-add them to roster", async () => {
    await saveFirstAssignment("Boat 1");

    userEvent.click(screen.getByText(firstPaddlerInitials));
    userEvent.click(screen.getByRole("button", {name: "Delete"}));

    userEvent.click(screen.getByTestId("tab-saved-assignments"));
    userEvent.click(screen.getByText("Boat 1"));
    userEvent.click(screen.getByRole("button", {name: "Apply to Boat"}));
    userEvent.click(screen.getByTestId("tab-boat"));
    expect(screen.getByText(firstPaddlerInitials)).toBeInTheDocument();
  });

  it("Successfully apply saved seat assignment to boat multiple times", async () => {
    const movePaddlerToRosterAndApplySavedAssignment = () => {
      userEvent.click(screen.getByText(firstPaddlerInitials));
      userEvent.click(screen.getByRole("button", {name: "Move to Roster"}));
      userEvent.click(screen.getByTestId("tab-saved-assignments"));
      userEvent.click(screen.getByText("Boat 1"));
      userEvent.click(screen.getByRole("button", {name: "Apply to Boat"}));
      userEvent.click(screen.getByTestId("tab-boat"));
    }

    await createPaddlerAndViewRoster(secondPaddler);
    userEvent.click(screen.getByTestId("tab-boat"));
    await saveFirstAssignment("Boat 1");

    movePaddlerToRosterAndApplySavedAssignment();
    movePaddlerToRosterAndApplySavedAssignment();

    expect(screen.getByText(firstPaddlerInitials)).toBeInTheDocument();
  });

  describe("Saving assignment after applying one to boat", () => {
    it("Applying assignment to boat and clicking save brings up options to save as the current or existing assignment, or to cancel", async () => {
      await saveAndApplyFirstAssignment("Boat 1");
      userEvent.click(screen.getByTestId("tab-save-assignment"));
  
      expect(screen.getByText("Save as the current assignment, Boat 1?")).toBeInTheDocument();
      expect(screen.getByRole("button", {name: "Yes"})).toBeInTheDocument();
      expect(screen.getByRole("button", {name: "No, save as a new assignment"})).toBeInTheDocument();
      expect(screen.getByRole("button", {name: "Cancel"})).toBeInTheDocument();
    });

    it("Option to save as current assignment unavailable if no assignment has been applied previously", async () => {
      await saveFirstAssignment("Boat 1");

      userEvent.click(screen.getByTestId("tab-save-assignment"));
      expect(screen.queryByText("Save as the current assignment, Boat 1?")).not.toBeInTheDocument();
      expect(screen.queryByRole("button", {name: "Yes"})).not.toBeInTheDocument();
      expect(screen.queryByRole("button", {name: "No, save as a new assignment"})).not.toBeInTheDocument();
      expect(screen.getByRole("button", {name: "Save"})).toBeInTheDocument();
    });

    it("Opting to save as current seating assignment will update current assignment", async () => {
      await saveAndApplyFirstAssignment("Boat 1");

      userEvent.click(screen.getByText(firstPaddlerInitials));
      userEvent.click(screen.getByRole("button", {name: "Switch Seats"}));
      userEvent.click(screen.getByTestId("seat14"));

      userEvent.click(screen.getByTestId("tab-save-assignment"));
      userEvent.click(screen.getByRole("button", {name: "Yes"}));
      userEvent.click(screen.getByText(firstPaddlerInitials));
      userEvent.click(screen.getByRole("button", {name: "Move to Roster"}));
      userEvent.click(screen.getByTestId("tab-saved-assignments"));

      userEvent.click(screen.getByText("Boat 1"));
      userEvent.click(screen.getByRole("button", {name: "Apply to Boat"}));
      userEvent.click(screen.getByTestId("tab-boat"));

      expect(screen.getByText(firstPaddlerInitials).parentElement.parentElement)
        .toBe(screen.getByTestId("seat14"));
    });

    it("Opting to save as a new seating assignment shows input for new assignment name", async () => {
      await saveAndApplyFirstAssignment("Boat 1");

      userEvent.click(screen.getByTestId("tab-save-assignment"));
      userEvent.click(screen.getByRole("button", {name: "No, save as a new assignment"}));

      expect(screen.getByLabelText("Name")).toBeInTheDocument();
    });

    it("Clicking cancel exits save-assignment window", async () => {
      await saveAndApplyFirstAssignment("Boat 1");

      userEvent.click(screen.getByTestId("tab-save-assignment"));
      userEvent.click(screen.getByRole("button", {name: "Cancel"}));
      expect(screen.queryByTestId("save-assignment-window")).not.toBeInTheDocument();
    });

    it("When applying followed by deleting assignment: When saving assignment, only option displayed is to save as a new assignment", async () => {
      await saveAndApplyFirstAssignment("Boat 1");

      userEvent.click(screen.getByTestId("tab-saved-assignments"));
      userEvent.click(screen.getByText("Boat 1"));
      userEvent.click(screen.getByRole("button", {name: "Delete"}));
      userEvent.click(screen.getByTestId("tab-boat"));
      userEvent.click(screen.getByTestId("tab-save-assignment"));

      expect(screen.queryByRole("button", {name: "No, save as a new assignment"})).not.toBeInTheDocument();
    });
  });
});

describe("Clear boat of paddlers", () => {
  const clearBoatQuestion = "Move all paddlers back to roster?";

  beforeEach(() => {
    render(
      <Store>
        <App /> 
      </Store>
    );
  });

  it("Clear-boat option does not appear on any tab other than the boat tab", () => {
    userEvent.click(screen.getByTestId("tab-roster"));
    expect(screen.queryByTestId("tab-clear-boat")).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId("tab-create-paddler"));
    expect(screen.queryByTestId("tab-clear-boat")).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId("tab-saved-assignments"));
    expect(screen.queryByTestId("tab-clear-boat")).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId("tab-boat"));
    expect(screen.getByTestId("tab-clear-boat")).toBeInTheDocument();
  });

  it("Pressing clear-boat option closes window and moves paddlers back to roster", async () => {
    await createPaddlerAndViewRoster(firstPaddler);
    movePaddlerFromRosterToBoatSeat(firstPaddler, "seat1");

    userEvent.click(screen.getByTestId("tab-clear-boat"));
    userEvent.click(screen.getByRole("button", {name: "Clear Boat"}));

    expect(screen.queryByText(clearBoatQuestion)).not.toBeInTheDocument();
    expect(screen.queryByText(firstPaddlerInitials)).not.toBeInTheDocument();

    userEvent.click(screen.getByTestId("tab-roster"));
    expect(screen.getByText(firstPaddlerInitials)).toBeInTheDocument();
  });

  it("Pressing cancel exits clear-boat window and does not move paddlers back to roster", async () => {
    await createPaddlerAndViewRoster(firstPaddler);
    movePaddlerFromRosterToBoatSeat(firstPaddler, "seat1");

    userEvent.click(screen.getByTestId("tab-clear-boat"));
    userEvent.click(screen.getByRole("button", {name: "Cancel"}));

    expect(screen.queryByText(clearBoatQuestion)).not.toBeInTheDocument();
    expect(screen.getByText(firstPaddlerInitials)).toBeInTheDocument();

    userEvent.click(screen.getByTestId("tab-roster"));
    expect(screen.queryByText(firstPaddlerInitials)).not.toBeInTheDocument();
  });
});