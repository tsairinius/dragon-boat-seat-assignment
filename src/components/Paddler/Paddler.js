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

function Paddler(props) {
  const { paddlerProfile } = props;

  const { dispatch } = useContext(paddlerListContext);

  return (
    <StyledPaddler
      paddlerProfile={paddlerProfile}
      onClick={() => dispatch(clickPaddler(paddlerProfile.id))}
      onMouseEnter={() => dispatch(hoverPaddler(paddlerProfile.id))}
      onMouseLeave={() => dispatch(unhoverPaddler(paddlerProfile.id))}
    >
      {paddlerProfile.name}
    </StyledPaddler>
  );
}

Paddler.propTypes = {
  paddlerProfile: PropTypes.object.isRequired,
};

const StyledPaddler = styled.div`
  width: 38px;
  height: 38px;
  margin: 1rem;
  text-align: center;
  background-image: url(${(props) =>
    props.paddlerProfile.isHovered ? hoverBackground : defaultBackground});
  background-size: cover;
`;

export default Paddler;
