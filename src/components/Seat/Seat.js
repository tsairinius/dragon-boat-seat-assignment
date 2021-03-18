import React, { useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import paddlerListContext from "../../paddlerListContext";
import { clickSeat } from "../../reducers/paddlerListReducer/paddlerListActions";
import { paddlerIconSizePixels } from "../../styles";
import HoverMessage from "../HoverMessage";

function Seat(props) {
  const { dispatch } = useContext(paddlerListContext);

  let hoverMessageContent = [`Seat ${props.id}`];
  if (props.children) {
    hoverMessageContent = [
      props.children.props.paddlerProfile.firstName,
      props.children.props.paddlerProfile.lastName,
      ...hoverMessageContent
    ]
  }

  return (
    <StyledSeat
      seatId={props.id}
      data-testid={"seat" + props.id}
      onClick={() => dispatch(clickSeat(props.id))}
    >
      <HoverMessage text={hoverMessageContent} className="seat-position" />
      {props.children}
    </StyledSeat>
  );
}

Seat.propTypes = {
  id: PropTypes.number.isRequired,
};

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
