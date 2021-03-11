import React from "react";
import { render } from "@testing-library/react";
import Paddler from "./Paddler";
import { v4 as uuidv4 } from "uuid";
import { screen } from "@testing-library/dom";
import Store from "../../Store";

const paddlerProfile = Object.freeze({
  id: uuidv4(),
  firstName: "John",
  lastName: "Smith",
  gender: "male",
  weight: "345",
  inBoat: false,
  seatId: "",
  isSelected: false,
});

beforeEach(() => {
  render(
    <Store>
      <Paddler paddlerProfile={paddlerProfile} />
    </Store>
  );
});

it("displays name of paddler along with default profile image when component is created", () => {
  expect(screen.getByText("John")).toHaveStyle(
    "background-image: url(profile_default_img_new.svg)"
  );
  expect(screen.getByText("John")).toBeInTheDocument();
});
