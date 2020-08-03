import React from "react";
import Seat from "../Seat/Seat";
import PropTypes from "prop-types";
import styled from "styled-components";

function Boat(props) {
  const createSeatComponents = () => {
    const numSeats = 22;
    var seatComponents = [];
    for (var i = 0; i < numSeats; i++) {
      seatComponents = [
        ...seatComponents,
        <Seat
          key={i}
          id={i}
          paddlersInBoat={props.paddlersInBoat}
          handleSeatClick={props.handleSeatClick}
          handlePaddlerMouseEnter={props.handlePaddlerMouseEnter}
          handlePaddlerMouseLeave={props.handlePaddlerMouseLeave}
          handlePaddlerClick={props.handlePaddlerClick}
        />,
      ];
    }
    return seatComponents;
  };

  return (
    <StyledLeftColumn>
      <StyledBoat>{createSeatComponents()}</StyledBoat>
    </StyledLeftColumn>
  );
}

Boat.propTypes = {
  paddlersInBoat: PropTypes.array.isRequired,
  handleSeatClick: PropTypes.func.isRequired,
  handlePaddlerClick: PropTypes.func.isRequired,
  handlePaddlerMouseEnter: PropTypes.func.isRequired,
  handlePaddlerMouseLeave: PropTypes.func.isRequired,
};

const StyledLeftColumn = styled.div`
  float: left;
  width: 45%;
  height: 100%;
  margin-right: : 1%;
  position: relative;
  border: solid 1px red;
`;

const StyledBoat = styled.div`
  display: grid;
  grid-template-columns: 50px 50px;
  width: 100px;
  height: 500px;
  margin: 0 auto;
`;

export default Boat;
