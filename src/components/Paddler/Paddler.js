import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import defaultBackground from "../../assets/img/profile_default_img_new.svg";
import activeBackground from "../../assets/img/profile_default_img_new_hover.svg";

function Paddler(props) {
  const handlePaddlerClick = () =>
    props.handlePaddlerClick(props.paddlerProfile.id);
  const handleMouseEnter = () =>
    props.handlePaddlerMouseEnter(props.paddlerProfile.id);
  const handleMouseLeave = () =>
    props.handlePaddlerMouseLeave(props.paddlerProfile.id);

  return (
    <StyledPaddler
      paddlerProfile={props.paddlerProfile}
      onClick={handlePaddlerClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {props.paddlerProfile.name}
    </StyledPaddler>
  );
}

Paddler.propTypes = {
  paddlerProfile: PropTypes.object.isRequired,
  handlePaddlerClick: PropTypes.func.isRequired,
  handlePaddlerMouseEnter: PropTypes.func.isRequired,
  handlePaddlerMouseLeave: PropTypes.func.isRequired,
};

const StyledPaddler = styled.div`
  width: 50px;
  height: 50px;
  margin: 1px;
  float: left;
  text-align: center;
  background-image: url(${(props) =>
    props.paddlerProfile.isActive ? activeBackground : defaultBackground});
  background-size: cover;
  background-position: 30% 100%;
`;

export default Paddler;
