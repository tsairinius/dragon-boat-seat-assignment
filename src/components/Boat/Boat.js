import React from "react";
import Seat from "../Seat/Seat";
import Paddler from "../Paddler/Paddler";
import PropTypes from "prop-types";
import styled from "styled-components";

function Boat(props) {
  const createSeatComponents = () => {
    const numSeats = 22;
    var seatComponents = [];
    let currentSeatId;
    for (var i = 0; i < numSeats; i++) {
      currentSeatId = i;
      const paddler = getPaddlerWithAssignedSeat(currentSeatId);
      const paddlerComponent = createPaddlerComponent(paddler);

      seatComponents = [
        ...seatComponents,
        createSeatAndSittingPaddler(currentSeatId, paddlerComponent),
      ];
    }
    return seatComponents;
  };

  const getPaddlerWithAssignedSeat = (seatId) => {
    const paddler = props.paddlersInBoat.filter(
      (paddler) => paddler.seatId === seatId
    );

    console.assert(
      paddler.length <= 1,
      "There should only be at most one paddler assigned to this seat."
    );

    return paddler;
  };

  const createPaddlerComponent = (paddler) => {
    return paddler.length ? (
      <Paddler
        paddlerProfile={paddler[0]}
        onPaddlerClick={props.onPaddlerClick}
        onPaddlerMouseEnter={props.onPaddlerMouseEnter}
        onPaddlerMouseLeave={props.onPaddlerMouseLeave}
      />
    ) : undefined;
  };

  const createSeatAndSittingPaddler = (seatId, paddlerComponent) => {
    return (
      <Seat key={seatId} id={seatId} onSeatClick={props.onSeatClick}>
        {paddlerComponent}
      </Seat>
    );
  };

  return <StyledBoat>{createSeatComponents()}</StyledBoat>;
}

Boat.propTypes = {
  paddlersInBoat: PropTypes.array.isRequired,
  onSeatClick: PropTypes.func.isRequired,
  onPaddlerClick: PropTypes.func.isRequired,
  onPaddlerMouseEnter: PropTypes.func.isRequired,
  onPaddlerMouseLeave: PropTypes.func.isRequired,
};

const StyledBoat = styled.div`
  display: grid;
  grid-template-columns: 50px 50px;
  width: 100px;
  height: 500px;
  margin: 0 auto;
`;

export default Boat;
