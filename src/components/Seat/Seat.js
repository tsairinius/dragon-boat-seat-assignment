import React, { useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import paddlerListContext from "../../paddlerListContext";
import { clickSeat } from "../../reducers/paddlerListReducer/paddlerListActions";
import { paddlerIconSizePixels } from "../../styles";
import StyledHoverMessage from "../StyledHoverMessage";

function Seat(props) {
  const { dispatch } = useContext(paddlerListContext);

  let paddlerName = null;
  if (props.children) {
    paddlerName = `${props.children.props.paddlerProfile.firstName} ${props.children.props.paddlerProfile.lastName}`;
  }

  return (
    <StyledSeat
      seatId={props.id}
      data-testid={"seat" + props.id}
      onClick={() => dispatch(clickSeat(props.id))}
    >
      <StyledHoverMessage offset={paddlerName ? -60 : -30} className="seat-position">
        {paddlerName ? <p>{paddlerName}</p> : null}
        <p>{`Seat ${props.id}`}</p>
      </StyledHoverMessage>
      {props.children}
    </StyledSeat>
  );
}

Seat.propTypes = {
  id: PropTypes.number.isRequired,
};

// background: radial-gradient(black 0%, black 44%, rgb(70, 181, 245) 60%, black 80%);
const StyledSeat = styled.div`
  position: relative;
  width: ${paddlerIconSizePixels + 8}px;
  height: ${paddlerIconSizePixels + 8}px;
  border: solid 4px rgb(196, 42, 42);
  background: rgb(133, 87, 57);
  border-radius: 50%;
  grid-column-start: ${(props) =>
    props.seatId === 21 || props.seatId === 0 ? "1" : "auto"};
  grid-column-end: ${(props) =>
    props.seatId === 21 || props.seatId === 0 ? "3" : "auto"};
  grid-row-start: ${(props) => (props.seatId === 21 ? "12" : "auto")};
  grid-row-end: ${(props) => (props.seatId === 21 ? "13" : "auto")};

  &:hover {
    > .seat-position {
      display: block;
    }

    filter: brightness(150%);
  }
`;

export default Seat;
