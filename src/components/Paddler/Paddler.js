import React from "react";
import PropTypes from "prop-types";
import defaultBackground from "../../assets/img/profile_default_img_new.svg";
import activeBackground from "../../assets/img/profile_default_img_new_hover.svg";

function Paddler(props) {
  const profileImg = props.paddlerProfile.isActive
    ? activeBackground
    : defaultBackground;

  const style = {
    width: "50px",
    height: "50px",
    margin: "1px",
    float: "left",
    textAlign: "center",
    backgroundImage: "url(" + profileImg + ")",
    backgroundSize: "cover",
    backgroundPosition: "30% 100%",
  };

  const handlePaddlerClick = () =>
    props.handlePaddlerClick(props.paddlerProfile.id);
  const handleMouseEnter = () =>
    props.handlePaddlerMouseEnter(props.paddlerProfile.id);
  const handleMouseLeave = () =>
    props.handlePaddlerMouseLeave(props.paddlerProfile.id);

  return (
    <div
      style={style}
      onClick={handlePaddlerClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {props.paddlerProfile.name}
    </div>
  );
}

Paddler.propTypes = {
  paddlerProfile: PropTypes.object.isRequired,
  handlePaddlerClick: PropTypes.func.isRequired,
  handlePaddlerMouseEnter: PropTypes.func.isRequired,
  handlePaddlerMouseLeave: PropTypes.func.isRequired,
};

export default Paddler;
