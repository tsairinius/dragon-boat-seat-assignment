import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import Store from "./Store";

describe("tests interactions with a single paddler", () => {
  const paddlerInfo = {
    name: "Eric",
    gender: "Male",
    weight: "200",
  };

  beforeEach(async () => {
    render(
      <Store>
        <App />
      </Store>
    );
    await createPaddlerAndViewRoster();
  });

  const createPaddlerAndViewRoster = async () => {
    const rosterTab = screen.getByRole("button", { name: "Roster" });
    const createPaddlerTab = screen.getByRole("button", { name: "+" });
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

  const movePaddlerFromRosterToBoatSeat = (seat) => {
    userEvent.click(screen.getByText(paddlerInfo.name));
    userEvent.click(screen.getByTestId(`${seat}`));
  };

  it("renders paddler form when create-a-paddler tab is clicked", () => {
    const createPaddlerTab = screen.getByRole("button", { name: "+" });
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
    movePaddlerFromRosterToBoatSeat(seatId);

    expect(screen.getByText(paddlerInfo.name)).toHaveStyle(
      "background-image: url(profile_default_img_new.svg)"
    );

    const seat = screen.getByTestId(seatId);
    expect(seat.firstChild).toBe(screen.getByText(paddlerInfo.name));
  });

  it("moves paddler back to roster from boat when move-to-roster button is clicked", () => {
    const seatId = "seat5";
    movePaddlerFromRosterToBoatSeat(seatId);

    userEvent.click(screen.getByText(paddlerInfo.name));
    userEvent.click(screen.getByRole("button", { name: "Move to Roster" }));

    const seat = screen.getByText(paddlerInfo.name).parentElement;
    expect(screen.getByText(paddlerInfo.name)).toBeInTheDocument();
    expect(seat.firstChild).not.toBe(screen.getByText(paddlerInfo.name));
  });

  it("displays paddler's info in profile preview window only when hovered over", () => {
    userEvent.hover(screen.getByText(paddlerInfo.name));
    expect(screen.getByTestId("profileInfo")).toBeInTheDocument();

    userEvent.unhover(screen.getByText(paddlerInfo.name));
    expect(screen.queryByTestId("profileInfo")).not.toBeInTheDocument();
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

  it("paddler gets deleted as requested", () => {
    userEvent.click(screen.getByText(paddlerInfo.name));
    userEvent.click(screen.getByRole("button", { name: "Delete" }));

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

    userEvent.hover(screen.getByText("Karen"));
    expect(screen.getByText(`Name: ${newInfo.name}`));
    expect(screen.getByText(`Gender: ${newInfo.gender}`));
    expect(screen.getByText(`Weight (lb): ${newInfo.weight}`));
  });

  it("paddler gets moved from one seat to another in boat", () => {
    const firstSeat = screen.getByTestId("seat3");
    const secondSeat = screen.getByTestId("seat18");
    userEvent.click(screen.getByText(paddlerInfo.name));
    userEvent.click(firstSeat);
    userEvent.click(screen.getByText(paddlerInfo.name));
    userEvent.click(secondSeat);

    expect(screen.getByText(paddlerInfo.name).parentElement).toBe(secondSeat);
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
    const createPaddlerTab = screen.getByRole("button", { name: "+" });
    const rosterTab = screen.getByRole("button", { name: "Roster" });
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
    userEvent.click(screen.getByTestId("seat0"));

    userEvent.click(screen.getByText(paddler2.name));
    userEvent.click(screen.getByTestId("seat21"));

    expect(screen.getByTestId("seat0").firstChild).toBe(
      screen.getByText(paddler1.name)
    );
    expect(screen.getByTestId("seat21").firstChild).toBe(
      screen.getByText(paddler2.name)
    );
  });

  it("enforces that only one paddler on roster can have hover image applied at a time", () => {
    userEvent.hover(screen.getByText(paddler1.name));
    userEvent.hover(screen.getByText(paddler2.name));

    expect(screen.getByText(paddler1.name)).toHaveStyle(
      "background-image: url(profile_default_img_new.svg)"
    );
    expect(screen.getByText(paddler2.name)).toHaveStyle(
      "background-image: url(profile_default_img_new_hover.svg)"
    );
  });

  it("does not display profile preview of any paddler when a paddler is selected", () => {
    userEvent.click(screen.getByText(paddler1.name));
    userEvent.click(screen.getByTestId("seat4"));

    userEvent.click(screen.getByText(paddler2.name));
    userEvent.hover(screen.getByText(paddler1.name));

    expect(screen.queryByText("Name: Bob")).not.toBeInTheDocument();
    expect(screen.queryByText("Gender: other")).not.toBeInTheDocument();
    expect(screen.queryByText("Weight (lb): 150")).not.toBeInTheDocument();
  });

  it("displays selected paddler's profile in full-view even when another paddler is clicked on", () => {
    userEvent.click(screen.getByText(paddler1.name));
    userEvent.click(screen.getByTestId("seat4"));

    userEvent.click(screen.getByText(paddler2.name));
    userEvent.click(screen.getByText(paddler1.name));

    expect(screen.getByTestId("profileFullView")).toBeInTheDocument();
  });

  it("keeps original paddler in seat when user tries to assign another paddler to that seat", () => {
    userEvent.click(screen.getByText(paddler1.name));
    userEvent.click(screen.getByTestId("seat3"));
    userEvent.click(screen.getByText(paddler2.name));
    userEvent.click(screen.getByText(paddler1.name));

    expect(screen.getByTestId("profileFullView")).toBeInTheDocument();
    expect(screen.getByText(paddler1.name).parentElement).toBe(
      screen.getByTestId("seat3")
    );
  });
});
