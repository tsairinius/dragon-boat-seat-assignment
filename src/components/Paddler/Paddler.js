import React, { useContext } from "react";
import paddlerListContext from "../../paddlerListContext";
import PropTypes from "prop-types";
import styled from "styled-components";
import defaultBackground from "../../assets/img/profile_default_img_new.svg";
import hoverBackground from "../../assets/img/profile_default_img_new_hover.svg";
import {
  clickPaddler,
  hoverPaddler,
  unhoverPaddler,
} from "../../reducers/paddlerListReducer/paddlerListActions";
import { paddlerIconSizePixels } from "../../styles";
import StyledHoverMessage from "../StyledHoverMessage";

function Paddler(props) {
  const { paddlerProfile } = props;

  const { dispatch } = useContext(paddlerListContext);

  return (
    <StyledPaddler
      className="paddler"
      paddlerProfile={paddlerProfile}
      onClick={() => dispatch(clickPaddler(paddlerProfile.id))}
      onMouseEnter={() => dispatch(hoverPaddler(paddlerProfile.id))}
      onMouseLeave={() => dispatch(unhoverPaddler(paddlerProfile.id))}
    >
      <StyledHoverMessage offset={-30} className="paddler-name">
        <p>{paddlerProfile.firstName}</p>
        <p>{paddlerProfile.lastName}</p>
      </StyledHoverMessage>
      <div className="paddler-initials">
        {`${paddlerProfile.firstName[0].toUpperCase()}${paddlerProfile.lastName[0].toUpperCase()}`}
      </div>
    </StyledPaddler>
  );
}

Paddler.propTypes = {
  paddlerProfile: PropTypes.object.isRequired,
};

const StyledPaddler = styled.div`
  position: relative;
  width: ${paddlerIconSizePixels}px;
  height: ${paddlerIconSizePixels}px;
  border-radius: 50%;
  background-color: red;

  &:hover {
    cursor: pointer;
    filter: brightness(170%);
  }

  .paddler-initials {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export default Paddler;
