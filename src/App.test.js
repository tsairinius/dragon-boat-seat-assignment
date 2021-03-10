import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { screen, within } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import Store from "./Store";

const paddlerInfo = Object.freeze({
  name: "Eric",
  gender: "Male",
  weight: "200",
});

const createPaddlerAndViewRoster = async () => {
  const rosterTab = screen.getByTestId("tab-roster");
  const createPaddlerTab = screen.getByTestId("tab-create-paddler");
  userEvent.click(createPaddlerTab);

  const nameInput = screen.getByLabelText("Name");
  const maleButton = screen.getByLabelText(paddlerInfo.gender);
  const weightInput = screen.getByLabelText("Weight(lb)");
  const submitButton = screen.getByRole("button", { name: "Submit" });

  await userEvent.type(nameInput, paddlerInfo.name);
  userEvent.click(maleButton);
  await userEvent.type(weightInput, paddlerInfo.weight);
  userEvent.click(submitButton);
  userEvent.click(rosterTab);
};

const movePaddlerFromRosterToBoatSeat = (paddler, seat) => {
  userEvent.click(screen.getByText(paddler.name));
  userEvent.click(screen.getByText("Move to Boat"));
  userEvent.click(screen.getByTestId(`${seat}`));
};

describe("Seat behavior", () => {
  it("Hovering over a seat displays the seat ID", () => {
    render(
      <Store>
        <App />
      </Store>
    );

    userEvent.click(screen.getByTestId("tab-boat"));
    userEvent.hover(screen.getByTestId("seat1"));

    expect(screen.getByText("Seat 1")).toBeInTheDocument();
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
    userEvent.click(screen.getByText(paddlerInfo.name));
    userEvent.click(screen.getByText("Move to Boat"));
    userEvent.click(screen.getByTestId("btnCancelSeatAssignment"));
  }

  it("'Cancel button shown when moving paddler from roster to boat", () => {
    userEvent.click(screen.getByText(paddlerInfo.name));
    userEvent.click(screen.getByText("Move to Boat"));

    expect(screen.getByTestId("btnCancelSeatAssignment")).toBeInTheDocument();
  });

  it("Cancel button disappears once paddler is moved from roster to boat", () => {
    movePaddlerFromRosterToBoatSeat(paddlerInfo, "seat4");
    expect(screen.queryByTestId("btnCancelSeatAssignment")).not.toBeInTheDocument();
  });

  it("Cancel button is shown when moving paddler from one seat to another", () => {
    movePaddlerFromRosterToBoatSeat(paddlerInfo, "seat4");
    userEvent.click(screen.getByText(paddlerInfo.name));
    userEvent.click(screen.getByText("Switch Seats"));

    expect(screen.getByTestId("btnCancelSeatAssignment")).toBeInTheDocument();
  });

  it("Cancel button disappears when paddler is moved from one seat to another", () => {
    movePaddlerFromRosterToBoatSeat(paddlerInfo, "seat4");
    userEvent.click(screen.getByText(paddlerInfo.name));
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

    expect(screen.queryByText(paddlerInfo.name)).not.toBeInTheDocument();
  });

  it("After exiting choose-a-seat mode, should be able to select a paddler again", () => {
    enterAndExitSeatAssignmentMode();
    userEvent.click(screen.getByTestId("tab-roster"));
    userEvent.click(screen.getByText(paddlerInfo.name));

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
    expect(screen.getByText(paddlerInfo.name)).toBeInTheDocument();
    expect(screen.getByText(paddlerInfo.name).tagName).toBe("DIV");
  });

  it("appropriate profile image for paddler is used when unhovered and hovered over", () => {
    const paddler = screen.getByText(paddlerInfo.name);

    expect(paddler).toHaveStyle(
      "background-image: url(profile_default_img_new.svg)"
    );
    userEvent.hover(paddler);
    expect(paddler).toHaveStyle(
      "background-image: url(profile_default_img_new_hover.svg)"
    );
  });

  it("renders Paddler in specified seat in boat with 'unhovered' profile image", () => {
    const seatId = "seat5";
    movePaddlerFromRosterToBoatSeat(paddlerInfo, seatId);

    expect(screen.getByText(paddlerInfo.name)).toHaveStyle(
      "background-image: url(profile_default_img_new.svg)"
    );

    const seat = screen.getByTestId(seatId);
    expect(screen.getByText(paddlerInfo.name).parentElement).toBe(seat);
  });

  it("moves paddler back to roster from boat when move-to-roster button is clicked", () => {
    const seatId = "seat5";
    movePaddlerFromRosterToBoatSeat(paddlerInfo, seatId);

    userEvent.click(screen.getByText(paddlerInfo.name));
    userEvent.click(screen.getByRole("button", { name: "Move to Roster" }));

    expect(screen.queryByText(paddlerInfo.name)).not.toBeInTheDocument();
    expect(screen.getByTestId("boat")).toBeInTheDocument();
  });

  it("displays profile of selected paddler in full-view window", () => {
    userEvent.click(screen.getByText(paddlerInfo.name));
    expect(screen.getByTestId("profileFullView"));
  });

  it("roster returns to screen upon cancelling profile full-view", () => {
    userEvent.click(screen.getByText(paddlerInfo.name));
    userEvent.click(screen.getByRole("button", { name: "Cancel" }));

    expect(screen.getByTestId("roster")).toBeInTheDocument();
    expect(screen.queryByTestId("profileFullView")).not.toBeInTheDocument();
  });

  it("paddler gets deleted from roster", () => {
    userEvent.click(screen.getByText(paddlerInfo.name));
    userEvent.click(screen.getByRole("button", { name: "Delete" }));

    expect(screen.queryByTestId("profileFullView")).not.toBeInTheDocument();
    expect(screen.queryByText(paddlerInfo.name)).not.toBeInTheDocument();
  });

  it("paddler gets deleted from boat", () => {
    movePaddlerFromRosterToBoatSeat(paddlerInfo, "seat4");

    userEvent.click(screen.getByTestId("tab-boat"));
    userEvent.click(screen.getByText(paddlerInfo.name));
    userEvent.click(screen.getByRole("button", {name: "Delete"}));

    expect(screen.queryByTestId("profileFullView")).not.toBeInTheDocument();
    expect(screen.queryByText(paddlerInfo.name)).not.toBeInTheDocument();
  });

  it("paddler's info gets updated after edit", async () => {
    const newInfo = {
      name: "Karen",
      gender: "Female",
      weight: "400",
    };

    userEvent.click(screen.getByText(paddlerInfo.name));
    userEvent.click(screen.getByRole("button", { name: "Edit" }));

    const nameInput = screen.getByLabelText("Name");
    const weightInput = screen.getByLabelText("Weight(lb)");

    userEvent.clear(nameInput);
    await userEvent.type(nameInput, newInfo.name);
    userEvent.click(screen.getByLabelText(newInfo.gender));
    userEvent.clear(weightInput);
    await userEvent.type(weightInput, newInfo.weight);
    userEvent.click(screen.getByRole("button", { name: "Submit" }));

    expect(screen.queryByText(paddlerInfo.name)).not.toBeInTheDocument();
    expect(screen.getByText(newInfo.name)).toBeInTheDocument();

    userEvent.click(screen.getByText("Karen"));
    const profileInfo = screen.getByTestId("profileInfo");
    expect(within(profileInfo).getByText(newInfo.name)).toBeInTheDocument();
    expect(within(profileInfo).getByText(newInfo.gender)).toBeInTheDocument();
    expect(within(profileInfo).getByText(newInfo.weight)).toBeInTheDocument();
  });

  it("paddler gets moved from one seat to another in boat", () => {
    userEvent.click(screen.getByText(paddlerInfo.name));
    userEvent.click(screen.getByText("Move to Boat"));
    userEvent.click(screen.getByTestId("seat3"));
    userEvent.click(screen.getByText(paddlerInfo.name));
    userEvent.click(screen.getByText("Switch Seats"));
    userEvent.click(screen.getByTestId("seat18"));

    expect(screen.getByText(paddlerInfo.name).parentElement).toBe(screen.getByTestId("seat18"));
  });
});

describe("tests interactions with multiple paddlers", () => {
  const paddler1 = {
    name: "Bob",
    gender: "Other",
    weight: "150",
  };

  const paddler2 = {
    name: "Jenny",
    gender: "Female",
    weight: "120",
  };

  beforeEach(async () => {
    render(
      <Store>
        <App />
      </Store>
    );
    const createPaddlerTab = screen.getByTestId("tab-create-paddler");
    const rosterTab = screen.getByTestId("tab-roster");
    userEvent.click(createPaddlerTab);

    const nameInput = screen.getByLabelText("Name");
    const femaleButton = screen.getByLabelText(paddler2.gender);
    const otherButton = screen.getByLabelText(paddler1.gender);
    const weightInput = screen.getByLabelText("Weight(lb)");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    await userEvent.type(nameInput, paddler1.name);
    userEvent.click(otherButton);
    await userEvent.type(weightInput, paddler1.weight);
    userEvent.click(submitButton);

    await userEvent.type(nameInput, paddler2.name);
    userEvent.click(femaleButton);
    await userEvent.type(weightInput, paddler2.weight);
    userEvent.click(submitButton);

    userEvent.click(rosterTab);
  });

  it("renders multiple paddlers in user-specified seats on boat", () => {
    userEvent.click(screen.getByText(paddler1.name));
    userEvent.click(screen.getByText("Move to Boat"));
    userEvent.click(screen.getByTestId("seat0"));

    userEvent.click(screen.getByTestId("tab-roster"));
    userEvent.click(screen.getByText(paddler2.name));
    userEvent.click(screen.getByText("Move to Boat"));
    userEvent.click(screen.getByTestId("seat21"));

    expect(screen.getByText(paddler1.name).parentElement).toBe(screen.getByTestId("seat0"));
    expect(screen.getByText(paddler2.name).parentElement).toBe(screen.getByTestId("seat21"));
  });

  it("enforces that only one paddler on roster can have hover image applied at a time", () => {
    userEvent.hover(screen.getByText(paddler1.name));
    userEvent.hover(screen.getByText(paddler2.name));

    expect(screen.getByText(paddler1.name)).toHaveStyle(
      "background-image: url(profile_default_img_new.svg)"
    );

    const roster = screen.getByTestId("roster");
    expect(within(roster).getByText(paddler2.name)).toHaveStyle(
      "background-image: url(profile_default_img_new_hover.svg)"
    );
  });

  it("does not display profile preview of any paddler when a paddler is selected", () => {
    userEvent.click(screen.getByText(paddler1.name));
    userEvent.click(screen.getByText("Move to Boat"));
    userEvent.click(screen.getByTestId("seat4"));

    userEvent.click(screen.getByTestId("tab-roster"));
    userEvent.click(screen.getByText(paddler2.name));
    userEvent.click(screen.getByText("Move to Boat"));
    userEvent.hover(screen.getByText(paddler1.name));

    expect(screen.queryByText("Name: Bob")).not.toBeInTheDocument();
    expect(screen.queryByText("Gender: other")).not.toBeInTheDocument();
    expect(screen.queryByText("Weight (lb): 150")).not.toBeInTheDocument();
  });

  it("keeps original paddler in seat when user tries to assign another paddler to that seat", () => {
    userEvent.click(screen.getByText(paddler1.name));
    userEvent.click(screen.getByText("Move to Boat"));
    userEvent.click(screen.getByTestId("seat3"));

    userEvent.click(screen.getByTestId("tab-roster"));
    userEvent.click(screen.getByText(paddler2.name));
    userEvent.click(screen.getByText("Move to Boat"));
    userEvent.click(screen.getByText(paddler1.name));

    expect(screen.getByText(paddler1.name).parentElement).toBe(
      screen.getByTestId("seat3")
    );
  });
});
