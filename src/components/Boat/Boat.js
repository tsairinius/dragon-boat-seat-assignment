import React from "react";
import Seat from "../Seat/Seat";
import Paddler from "../Paddler/Paddler";
import PropTypes from "prop-types";
import styled from "styled-components";
import boatImg from "../../assets/img/boat-v2.svg";

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

  const getGradientValues = () => {
    // First quadrant corresponds to top right corner of boat
    const weightsByQuadrant = {
      first: 0,
      second: 0,
      third: 0,
      fourth: 0
    };

    props.paddlersInBoat.forEach(paddler => {
      if ([1,3,5,7,9].includes(paddler.seatId)) {
        weightsByQuadrant.fourth += paddler.weight;
      }
      else if ([11,13,15,17,19].includes(paddler.seatId)) {
        weightsByQuadrant.third += paddler.weight;
      }
      else if ([12,14,16,18,20].includes(paddler.seatId)) {
        weightsByQuadrant.second += paddler.weight;
      }
      else if ([2,4,6,8,10].includes(paddler.seatId)) {
        weightsByQuadrant.first += paddler.weight;
      }
      else if (paddler.seatId === 0) {
        weightsByQuadrant.first += paddler.weight/2;
        weightsByQuadrant.fourth += paddler.weight/2;
      }
      else if (paddler.seatId === 21) {
        weightsByQuadrant.second += paddler.weight/2;
        weightsByQuadrant.third += paddler.weight/2;
      }
    });

    const y = weightsByQuadrant.first*Math.sin(Math.PI/4) + weightsByQuadrant.second*Math.sin(3*Math.PI/4)
      + weightsByQuadrant.third*Math.sin(5*Math.PI/4) + weightsByQuadrant.fourth*Math.sin(7*Math.PI/4);

    const x = weightsByQuadrant.first*Math.cos(Math.PI/4) + weightsByQuadrant.second*Math.cos(3*Math.PI/4)
    + weightsByQuadrant.third*Math.cos(5*Math.PI/4) + weightsByQuadrant.fourth*Math.cos(7*Math.PI/4);

    const magnitude = Math.hypot(x,y);
    const theta = Math.atan(Math.abs(y)/Math.abs(x));

    let vectorDirection = null;
    if (x > 0 && y > 0) {
      vectorDirection = theta;
    }
    else if (x < 0 && y > 0) {
      vectorDirection = Math.PI - theta;
    }
    else if (x < 0 && y < 0) { 
      vectorDirection = Math.PI + theta;
    }
    else if (x > 0 && y < 0) {
      vectorDirection = 2*Math.PI - theta;
    }
    // Handle cases where either x or y are zero
    else if (x === 0 && y > 0) {
      vectorDirection = Math.PI/2;
    }
    else if (y === 0 && x < 0) {
      vectorDirection = Math.PI;
    }
    else if (x === 0 && y < 0) {
      vectorDirection = 3*Math.PI/2;
    }
    else if (y === 0 && x > 0) {
      vectorDirection = 0;
    }

    return { magnitude, vectorDirection };
  }


  return (
    <StyledBoatContainer gradientValues={getGradientValues()}>
      <StyledBoatImage>
        <StyledBoat data-testid="boat">{createSeatComponents()}</StyledBoat>
      </StyledBoatImage>
    </StyledBoatContainer>
  );
}

Boat.propTypes = {
  paddlersInBoat: PropTypes.array.isRequired,
};

const StyledBoatContainer = styled.div`
  background-image: ${props => `linear-gradient(${props.gradientValues.vectorDirection}rad, rgba(0,0,0,0.4), rgba(255,0,0,0.6))`};
`;

const StyledBoatImage = styled.div`
  background-image: url(${boatImg});
  background-position: center;
  background-size: cover;
  width: min-content;
  margin: 0 auto;
  overflow: auto;
  padding: 1rem 0;
`;

const StyledBoat = styled.div`
  display: grid;
  grid-template-columns: min-content min-content;
  grid-gap: 0.2rem;
  justify-items: center;
  margin: 20rem 2rem;
`;

export default Boat;
