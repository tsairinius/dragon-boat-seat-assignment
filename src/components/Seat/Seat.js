import React, { useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import paddlerListContext from "../../paddlerListContext";
import { clickSeat } from "../../reducers/paddlerListReducer/paddlerListActions";
import { paddlerIconSizePixels } from "../../styles";

function Seat(props) {
  const { dispatch } = useContext(paddlerListContext);

  return (
    <StyledSeat
      seatId={props.id}
      data-testid={"seat" + props.id}
      onClick={() => dispatch(clickSeat(props.id))}
    >
      {props.children}
    </StyledSeat>
  );
}

Seat.propTypes = {
  id: PropTypes.number.isRequired,
};

const seatBorderSizePixels = 2;
const seatSizePixels = paddlerIconSizePixels + 2*seatBorderSizePixels;

const StyledSeat = styled.div`
  width: ${seatSizePixels}px;
  height: ${seatSizePixels}px;
  border-radius: 50%;
  border: ${seatBorderSizePixels}px solid red;
  grid-column-start: ${(props) =>
    props.seatId === 21 || props.seatId === 0 ? "1" : "auto"};
  grid-column-end: ${(props) =>
    props.seatId === 21 || props.seatId === 0 ? "3" : "auto"};
  grid-row-start: ${(props) => (props.seatId === 21 ? "12" : "auto")};
  grid-row-end: ${(props) => (props.seatId === 21 ? "13" : "auto")};
`;

export default Seat;
