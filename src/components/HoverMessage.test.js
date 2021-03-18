import React from "react";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/dom";
import HoverMessage from "./HoverMessage";

it("Displays text passed in", () => {
    render(<HoverMessage text={["Hello"]} />);

    expect(screen.getByText("Hello")).toBeInTheDocument();
});

it("Renders without crashing when no text is provided as a prop", () => {
    render(<HoverMessage text={[]} />);
});

it("Assigns class to component based on className prop", () => {
    render(<HoverMessage text={["Hello"]} className={"test-message"} />);

    expect(screen.getByText("Hello").parentElement.className).toContain("test-message");
});