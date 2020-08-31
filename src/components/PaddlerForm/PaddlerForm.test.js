import React from "react";
import { render } from "@testing-library/react";
import PaddlerForm from "./PaddlerForm";
import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import Store from "../../Store";

const handleSubmit = jest.fn();
describe("no paddler object is passed in to the PaddlerForm", () => {
  beforeEach(() => {
    render(
      <Store>
        <PaddlerForm onSubmit={handleSubmit} />
      </Store>
    );
  });

  it("paddler name input gets updated as user types in name", async () => {
    const nameInput = screen.getByLabelText("Name");
    await userEvent.type(nameInput, "Eric");
    expect(nameInput.value).toBe("Eric");
  });

  it("male gender radio button is selected when user selects it", () => {
    const maleButton = screen.getByLabelText("Male");
    userEvent.click(maleButton);
    expect(maleButton.checked).toBeTruthy();
  });

  it("female gender radio button is selected when user selects it", () => {
    const femaleButton = screen.getByLabelText("Female");
    userEvent.click(femaleButton);
    expect(femaleButton.checked).toBeTruthy();
  });

  it("other gender radio button is selected when user selects it", () => {
    const otherButton = screen.getByLabelText("Other");
    userEvent.click(otherButton);
    expect(otherButton.checked).toBeTruthy();
  });

  it("paddler weight input gets updated as user types in weight", async () => {
    const weightInput = screen.getByLabelText("Weight(lb)");
    await userEvent.type(weightInput, "200");
    expect(weightInput.value).toBe("200");
  });

  it("all form fields are cleared when user submits new paddler", async () => {
    const nameInput = screen.getByLabelText("Name");
    const maleButton = screen.getByLabelText("Male");
    const femaleButton = screen.getByLabelText("Female");
    const otherButton = screen.getByLabelText("Other");
    const weightInput = screen.getByLabelText("Weight(lb)");
    const submitButton = screen.getByRole("button", { name: "Submit" });

    await userEvent.type(nameInput, "Eric");
    userEvent.click(maleButton);
    await userEvent.type(weightInput, "200");
    userEvent.click(submitButton);

    expect(nameInput.value).toBe("");
    expect(maleButton.checked).toBeFalsy();
    expect(femaleButton.checked).toBeFalsy();
    expect(otherButton.checked).toBeFalsy();
    expect(weightInput.value).toBe("");
  });
});

describe("paddler object is passed in to PaddlerForm", () => {
  const paddlerProfile = {
    name: "Eric",
    gender: "Male",
    weight: "200",
  };
  beforeEach(() => {
    render(
      <Store>
        <PaddlerForm onSubmit={handleSubmit} paddler={paddlerProfile} />
      </Store>
    );
  });

  it("when a paddler object is passed in, the inputs are pre-filled with that paddler's info", () => {
    expect(screen.getByLabelText("Name").value).toBe(paddlerProfile.name);
    expect(screen.getByLabelText(paddlerProfile.gender).checked).toBeTruthy();
    expect(screen.getByLabelText("Weight(lb)").value).toBe(
      paddlerProfile.weight
    );
  });
});

// it('paddler form is not submitted if any required fields are empty', () => {
//   const submitButton = screen.getByRole('button', {name: 'Submit'});
//   userEvent.click(submitButton);

//   expect(handleSubmit).not.toHaveBeenCalled();
// });
