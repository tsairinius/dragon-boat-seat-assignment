import React from "react";
import { render } from "@testing-library/react";
import Boat, { getGradientValues } from "./Boat";
import { screen } from "@testing-library/dom";
import { v4 as uuidv4 } from "uuid";
import Store from "../../Store";

const paddler = Object.freeze({
  id: uuidv4(),
  firstName: "Bob",
  lastName: "Smith",
  gender: "male",
  weight: "125",
  inBoat: true,
  seatId: 3,
  isSelected: false,
});

it("renders Boat component without crashing", () => {
  render(
    <Store>
      <Boat paddlersInBoat={[]} />
    </Store>
  );
});

it("renders boat with paddler in specified seat", () => {
  const paddlerInitials = `${paddler.firstName[0].toUpperCase()}${paddler.lastName[0].toUpperCase()}`;

  render(
    <Store>
      <Boat paddlersInBoat={[paddler]} />
    </Store>
  );

  expect(screen.getByText(paddlerInitials).parentElement.parentElement).toBe(
    screen.getByTestId("seat3")
  );
});

describe("getGradientValues", () => {
  const roundNumber = (number, decimalPlaces) => {
    if (!number || !decimalPlaces) {
      throw new Error("Missing argument");
    }
    const factorOfTen = Math.pow(10, decimalPlaces);
    return Math.round(number*factorOfTen)/factorOfTen;
  };

  const secondPaddler = Object.freeze({
    id: uuidv4(),
    firstName: "Joe",
    lastName: "Johnson",
    gender: "male",
    weight: "200",
    inBoat: true,
    seatId: 5,
    isSelected: false,
  });

  it("Single paddler: Resultant vector should represent weight of single paddler in first quadrant (45deg)", () => {
    const paddlersInBoat = [{
      ...paddler,
      seatId: 4
    }];

    const { magnitudeNormalized, vectorDirection } = getGradientValues(paddlersInBoat);

    expect(roundNumber(magnitudeNormalized, 3)).toBe(1);
    expect(vectorDirection).toBe(Math.PI/4);
  });

  it("Single paddler: Resultant vector should represent weight of single paddler in second quadrant (135deg)", () => {
    const paddlersInBoat = [{
      ...paddler,
      seatId: 12
    }];

    const { magnitudeNormalized, vectorDirection } = getGradientValues(paddlersInBoat);

    expect(roundNumber(magnitudeNormalized, 3)).toBe(1);
    expect(vectorDirection).toBe(3*Math.PI/4);
  });

  it("Single paddler: Resultant vector should represent weight of single paddler in third quadrant (225deg)", () => {
    const paddlersInBoat = [{
      ...paddler,
      seatId: 11
    }];

    const { magnitudeNormalized, vectorDirection } = getGradientValues(paddlersInBoat);

    expect(roundNumber(magnitudeNormalized, 3)).toBe(1);
    expect(vectorDirection).toBe(5*Math.PI/4);
  });

  it("Single paddler: Resultant vector should represent weight of single paddler in fourth quadrant (315deg)", () => {
    const paddlersInBoat = [{
      ...paddler,
      seatId: 1
    }];

    const { magnitudeNormalized, vectorDirection } = getGradientValues(paddlersInBoat);

    expect(roundNumber(magnitudeNormalized, 3)).toBe(1);
    expect(vectorDirection).toBe(7*Math.PI/4);
  });

  it("Two paddlers: Computes correct resultant vector based on paddlers in first and second quadrants", () => {
    const paddlersInBoat = [
      {
        ...paddler,
        seatId: 4
      },
      {
        ...secondPaddler,
        seatId: 12
      }
    ];

    const { magnitudeNormalized, vectorDirection } = getGradientValues(paddlersInBoat);

    expect(magnitudeNormalized).toBe(1);
    expect(roundNumber(vectorDirection, 3)).toBe(1.798);
  });

  it("Two paddlers: Computes correct resultant vector based on paddlers in first and third quadrants", () => {
    const paddlersInBoat = [
      {
        ...paddler,
        seatId: 4
      },
      {
        ...secondPaddler,
        seatId: 13
      }
    ];

    const { magnitudeNormalized, vectorDirection } = getGradientValues(paddlersInBoat);

    expect(roundNumber(magnitudeNormalized,3)).toBe(0.375);
    expect(roundNumber(vectorDirection, 3)).toBe(3.927);
  });

  it("Two paddlers: Computes correct resultant vector based on paddlers in first and fourth quadrants", () => {
    const paddlersInBoat = [
      {
        ...paddler,
        seatId: 4
      },
      {
        ...secondPaddler,
        seatId: 1
      }
    ];

    const { magnitudeNormalized, vectorDirection } = getGradientValues(paddlersInBoat);

    expect(magnitudeNormalized).toBe(1);
    expect(roundNumber(vectorDirection, 3)).toBe(6.056);
  });

  it("Paddler in drummer seat results in their weight equally distributed between second and third quadrants", () => {
    const paddlersInBoat = [
      {
        ...paddler,
        seatId: 0
      }
    ];

    const { magnitudeNormalized, vectorDirection } = getGradientValues(paddlersInBoat);

    expect(magnitudeNormalized).toBe(1);
    expect(vectorDirection).toBe(2*Math.PI);
  });

  it("Paddler in steering seat results in their weight equally distributed between first and fourth quadrants", () => {
    const paddlersInBoat = [
      {
        ...paddler,
        seatId: 21
      }
    ];

    const { magnitudeNormalized, vectorDirection } = getGradientValues(paddlersInBoat);

    expect(magnitudeNormalized).toBe(1);
    expect(vectorDirection).toBe(Math.PI);
  });

  it("Handle corner case where resultant vector points at 90 degrees (no x component)", () => {
    const paddlersInBoat = [
      {
        ...paddler,
        weight: "125",
        seatId: 2
      },
      {
        ...secondPaddler,
        weight: "125",
        seatId: 16
      }
    ];

    const { magnitudeNormalized, vectorDirection } = getGradientValues(paddlersInBoat);

    expect(magnitudeNormalized).toBe(1);
    expect(vectorDirection).toBe(Math.PI/2);
  });

  it("Handle corner case where resultant vector points at 180 degrees (no y component)", () => {
    const paddlersInBoat = [
      {
        ...paddler,
        weight: "125",
        seatId: 16
      },
      {
        ...secondPaddler,
        weight: "125",
        seatId: 17
      }
    ];

    const { magnitudeNormalized, vectorDirection } = getGradientValues(paddlersInBoat);

    expect(magnitudeNormalized).toBe(1);
    expect(vectorDirection).toBe(Math.PI);
  });

  it("Handle corner case where resultant vector points at 270 degrees", () => {
    const paddlersInBoat = [
      {
        ...paddler,
        weight: "125",
        seatId: 1
      },
      {
        ...secondPaddler,
        weight: "125",
        seatId: 15
      }
    ];

    const { magnitudeNormalized, vectorDirection } = getGradientValues(paddlersInBoat);

    expect(magnitudeNormalized).toBe(1);
    expect(vectorDirection).toBe(3*Math.PI/2);
  });

  it("Handle corner case where resultant vector points at 360 degrees", () => {
    const paddlersInBoat = [
      {
        ...paddler,
        weight: "125",
        seatId: 2
      },
      {
        ...secondPaddler,
        weight: "125",
        seatId: 1
      }
    ];

    const { magnitudeNormalized, vectorDirection } = getGradientValues(paddlersInBoat);

    expect(magnitudeNormalized).toBe(1);
    expect(vectorDirection).toBe(2*Math.PI);
  });
});
