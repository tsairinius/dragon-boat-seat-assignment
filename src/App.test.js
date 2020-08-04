import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

describe("tests process of adding a new paddler and moving it between the roster and boat", () => {
  beforeEach(() => {
    render(<App />);
  });

  const createPaddlerAndViewRoster = async () => {
    const rosterTab = screen.getByRole("button", { name: "Roster" });
    const createPaddlerTab = screen.getByRole("button", { name: "+" });
    userEvent.click(createPaddlerTab);

    const nameInput = screen.getByLabelText("Name");
    const maleButton = screen.getByLabelText("Male");
    const weightInput = screen.getByLabelText("Weight(lb)");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    await userEvent.type(nameInput, "Eric");
    userEvent.click(maleButton);
    await userEvent.type(weightInput, "200");
    userEvent.click(submitButton);
    userEvent.click(rosterTab);
  };

  const movePaddlerFromRosterToBoatSeat = (seat) => {
    userEvent.click(screen.getByText("Eric"));
    userEvent.click(screen.getByTestId(`${seat}`));
  };

  it("renders paddler form when create-a-paddler tab is clicked", () => {
    const createPaddlerTab = screen.getByRole("button", { name: "+" });
    userEvent.click(createPaddlerTab);

    expect(screen.getByText("Create a Paddler")).toBeInTheDocument();
    expect(screen.getByLabelText("Name")).toBeInTheDocument();
    expect(screen.getByLabelText("Male")).toBeInTheDocument();
    expect(screen.getByLabelText("Female")).toBeInTheDocument();
    expect(screen.getByLabelText("Other")).toBeInTheDocument();
    expect(screen.getByLabelText("Weight(lb)")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit" })).toBeInTheDocument();
  });

  it("renders Paddler component in roster after new paddler is submitted", async () => {
    await createPaddlerAndViewRoster();

    expect(screen.getByText("Eric")).toBeInTheDocument();
    expect(screen.getByText("Eric").tagName).toBe("DIV");
  });

  it("renders Paddler in roster with appropriate profile image when not active and then active", async () => {
    await createPaddlerAndViewRoster();
    const paddler = screen.getByText("Eric");

    expect(paddler).toHaveStyle(
      "background-image: url(profile_default_img_new.svg)"
    );
    userEvent.click(paddler);
    expect(paddler).toHaveStyle(
      "background-image: url(profile_default_img_new_hover.svg)"
    );
  });

  it("renders Paddler in specified seat in boat with non-active profile image", async () => {
    const seatId = "seat5";
    await createPaddlerAndViewRoster();
    movePaddlerFromRosterToBoatSeat(seatId);

    expect(screen.getByText("Eric")).toHaveStyle(
      "background-image: url(profile_default_img_new.svg)"
    );

    const seat = screen.getByTestId(seatId);
    expect(seat.firstChild).toBe(screen.getByText("Eric"));
  });

  it("renders Paddler in boat back to roster when clicked on", async () => {
    const seatId = "seat5";
    await createPaddlerAndViewRoster();
    movePaddlerFromRosterToBoatSeat(seatId);

    userEvent.click(screen.getByText("Eric"));

    const seat = screen.getByText("Eric").parentElement;
    expect(screen.getByText("Eric")).toBeInTheDocument();
    expect(seat.firstChild).not.toBe(screen.getByText("Eric"));
  });
});

describe("tests interactions with multiple paddlers, as well as hovering over paddlers", () => {
  beforeEach(async () => {
    render(<App />);
    const createPaddlerTab = screen.getByRole("button", { name: "+" });
    const rosterTab = screen.getByRole("button", { name: "Roster" });
    userEvent.click(createPaddlerTab);

    const nameInput = screen.getByLabelText("Name");
    const femaleButton = screen.getByLabelText("Female");
    const otherButton = screen.getByLabelText("Other");
    const weightInput = screen.getByLabelText("Weight(lb)");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    await userEvent.type(nameInput, "Bob");
    userEvent.click(otherButton);
    await userEvent.type(weightInput, "150");
    userEvent.click(submitButton);

    await userEvent.type(nameInput, "Jenny");
    userEvent.click(femaleButton);
    await userEvent.type(weightInput, "120");
    userEvent.click(submitButton);

    userEvent.click(rosterTab);
  });

  it("renders multiple paddlers in user-specified seats on boat", () => {
    userEvent.click(screen.getByText("Bob"));
    userEvent.click(screen.getByTestId("seat0"));

    userEvent.click(screen.getByText("Jenny"));
    userEvent.click(screen.getByTestId("seat21"));

    expect(screen.getByTestId("seat0").firstChild).toBe(
      screen.getByText("Bob")
    );
    expect(screen.getByTestId("seat21").firstChild).toBe(
      screen.getByText("Jenny")
    );
  });

  it("enforces that only one paddler on roster can be active at once", () => {
    userEvent.click(screen.getByText("Bob"));
    userEvent.click(screen.getByText("Jenny"));

    expect(screen.getByText("Bob")).toHaveStyle(
      "background-image: url(profile_default_img_new.svg)"
    );
    expect(screen.getByText("Jenny")).toHaveStyle(
      "background-image: url(profile_default_img_new_hover.svg)"
    );
  });

  it("displays info on paddler only when hovered over", () => {
    userEvent.hover(screen.getByText("Jenny"));
    expect(screen.getByText("Name: Jenny")).toBeInTheDocument();
    expect(screen.getByText("Gender: female")).toBeInTheDocument();
    expect(screen.getByText("Weight (lb): 120")).toBeInTheDocument();

    userEvent.unhover(screen.getByText("Jenny"));
    expect(screen.queryByText("Name: Jenny")).not.toBeInTheDocument();
    expect(screen.queryByText("Gender: female")).not.toBeInTheDocument();
    expect(screen.queryByText("Weight (lb): 120")).not.toBeInTheDocument();
  });

  // THERE'S A BUG SUCH THAT THIS UNIT TEST WILL NOT YET PASS
  // it('keeps original paddler in seat when user tries to assign another paddler to that seat', () => {
  //   userEvent.click(screen.getByText('Bob'));
  //   userEvent.click(screen.getByTestId('seat3'));
  //   userEvent.click(screen.getByText('Jenny'));
  //   userEvent.click(screen.getByText('Bob'));

  //   expect(screen.getByText('Jenny').parentElement).toBe(screen.getByTestId('roster'));
  // });
});
