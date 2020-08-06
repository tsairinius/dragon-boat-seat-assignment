import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

function Seat(props) {
  return (
    <StyledSeat
      seatId={props.id}
      data-testid={"seat" + props.id}
      onClick={() => props.onSeatClick(props.id)}
    >
      {props.children}
    </StyledSeat>
  );
}

Seat.propTypes = {
  id: PropTypes.number.isRequired,
  onSeatClick: PropTypes.func.isRequired,
};

const StyledSeat = styled.div`
  width: 50px;
  height: 50px;
  border: 1px solid #000;
  margin: 0 auto;
  grid-column-start: ${(props) =>
    props.seatId === 21 || props.seatId === 0 ? "1" : "auto"};
  grid-column-end: ${(props) =>
    props.seatId === 21 || props.seatId === 0 ? "3" : "auto"};
  grid-row-start: ${(props) => (props.seatId === 21 ? "22" : "auto")};
  grid-row-end: ${(props) => (props.seatId === 21 ? "23" : "auto")};
`;

export default Seat;
