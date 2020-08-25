import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import defaultBackground from "../../assets/img/profile_default_img_new.svg";
import hoverBackground from "../../assets/img/profile_default_img_new_hover.svg";

function Paddler(props) {
  const {
    paddlerProfile,
    onPaddlerClick,
    onPaddlerMouseEnter,
    onPaddlerMouseLeave,
  } = props;

  return (
    <StyledPaddler
      paddlerProfile={paddlerProfile}
      onClick={() => onPaddlerClick(paddlerProfile.id)}
      onMouseEnter={() => onPaddlerMouseEnter(paddlerProfile.id)}
      onMouseLeave={() => onPaddlerMouseLeave(paddlerProfile.id)}
    >
      {paddlerProfile.name}
    </StyledPaddler>
  );
}

Paddler.propTypes = {
  paddlerProfile: PropTypes.object.isRequired,
  onPaddlerClick: PropTypes.func.isRequired,
  onPaddlerMouseEnter: PropTypes.func.isRequired,
  onPaddlerMouseLeave: PropTypes.func.isRequired,
};

const StyledPaddler = styled.div`
  width: 50px;
  height: 50px;
  margin: 1px;
  float: left;
  text-align: center;
  background-image: url(${(props) =>
    props.paddlerProfile.isHovered ? hoverBackground : defaultBackground});
  background-size: cover;
  background-position: 30% 100%;
`;

export default Paddler;
