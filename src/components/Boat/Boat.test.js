import React from "react";
import { render } from "@testing-library/react";
import Boat from "./Boat";

it("renders Boat component without crashing", () => {
  const onPaddlerClick = jest.fn();
  const onSeatClick = jest.fn();
  const onPaddlerMouseEnter = jest.fn();
  const onPaddlerMouseLeave = jest.fn();

  render(
    <Boat
      paddlersInBoat={[]}
      onPaddlerClick={onPaddlerClick}
      onSeatClick={onSeatClick}
      onPaddlerMouseEnter={onPaddlerMouseEnter}
      onPaddlerMouseLeave={onPaddlerMouseLeave}
    />
  );
});
