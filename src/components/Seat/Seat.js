import React from "react";
import Paddler from "../Paddler/Paddler";
import PropTypes from "prop-types";
import styled from "styled-components";

function Seat(props) {
  const paddler = props.paddlersInBoat.filter(
    (paddler) => paddler.seatId === props.id
  );
  console.assert(
    paddler.length <= 1,
    "There should only be at most one paddler assigned to this seat."
  );
  const paddlerComponent = paddler.length ? (
    <Paddler
      paddlerProfile={paddler[0]}
      handlePaddlerMouseEnter={props.handlePaddlerMouseEnter}
      handlePaddlerMouseLeave={props.handlePaddlerMouseLeave}
      handlePaddlerClick={props.handlePaddlerClick}
    />
  ) : undefined;

  return (
    <SeatDiv
      seatId={props.id}
      data-testid={"seat" + props.id}
      onClick={() => props.handleSeatClick(props.id)}
    >
      {paddlerComponent}
    </SeatDiv>
  );
}

Seat.propTypes = {
  id: PropTypes.number.isRequired,
  paddlersInBoat: PropTypes.array.isRequired,
  handleSeatClick: PropTypes.func.isRequired,
  handlePaddlerClick: PropTypes.func.isRequired,
  handlePaddlerMouseEnter: PropTypes.func.isRequired,
  handlePaddlerMouseLeave: PropTypes.func.isRequired,
};

const SeatDiv = styled.div`
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
