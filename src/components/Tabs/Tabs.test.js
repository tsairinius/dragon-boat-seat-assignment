import React from "react";
import { render } from "@testing-library/react";
import Tabs from "./Tabs";
import userEvent from "@testing-library/user-event";
import { screen } from "@testing-library/dom";
import Store from "../../Store";

it("shows tab based on active tab prop", () => {
  render(
    <Store>
      <Tabs activeTab={"Dog"} onTabRequest={() => jest.fn()}>
        <div label="Cat">Meow!</div>
        <div label="Dog">Woof!</div>
        <div label="Pig">Oink!</div>
      </Tabs>
    </Store>
  );

  expect(screen.getByText("Woof!")).toBeInTheDocument();
  expect(screen.queryByText("Meow!")).not.toBeInTheDocument();
  expect(screen.queryByText("Oink!")).not.toBeInTheDocument();
});
