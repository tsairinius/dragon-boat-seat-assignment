import React from "react";
import ReactDOM from "react-dom";
import { cleanup } from "@testing-library/react";
import renderer from "react-test-renderer";
import Seat from "./Seat";

afterEach(cleanup);

it('renders Seat component without crashing', () => {
    const container = document.createElement('div');
    ReactDOM.render(<Seat />, container);
});

it('rendered Seat matches snapshot', () => {
    const tree = renderer.create(<Seat />).toJSON();
    expect(tree).toMatchSnapshot();
});