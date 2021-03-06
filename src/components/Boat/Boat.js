import React from "react";
import Seat from "../Seat/Seat";
import Paddler from "../Paddler/Paddler";
import PropTypes from "prop-types";
import styled from "styled-components";
import boatImg from "../../assets/img/new-boat.svg";

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
    return paddler.length ? <Paddler paddlerProfile={paddler[0]} /> : undefined;
  };

  const createSeatAndSittingPaddler = (seatId, paddlerComponent) => {
    return (
      <Seat key={seatId} id={seatId}>
        {paddlerComponent}
      </Seat>
    );
  };

  return (
    <StyledBoatImg>
      <StyledBoat data-testid="boat">{createSeatComponents()}</StyledBoat>
    </StyledBoatImg>
  );
}

Boat.propTypes = {
  paddlersInBoat: PropTypes.array.isRequired,
};

const StyledBoatImg = styled.div`
  background-image: url(${boatImg});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: min-content;
  height: 100%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 5rem;
`;

const StyledBoat = styled.div`
  display: grid;
  grid-template-columns: min-content min-content;
  grid-gap: 0.2rem;
  justify-content: center;
  justify-items: center;
`;

export default Boat;
