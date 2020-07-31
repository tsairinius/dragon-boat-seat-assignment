import React from "react";
import PropTypes from "prop-types";

function ProfileViewer(props) {
  const style = {
    border: "solid 1px blue",
    height: "20%",
  };

  const showPaddlerInfo = () => {
    return (
      <ul>
        <li>Name: {props.paddler.name} </li>
        <li>Gender: {props.paddler.gender}</li>
        <li>Weight (lb): {props.paddler.weight}</li>
      </ul>
    );
  };

  return (
    <div style={style}>
      {props.paddler !== undefined ? showPaddlerInfo() : undefined}
    </div>
  );
}

ProfileViewer.propTypes = {
  paddler: PropTypes.object,
};

export default ProfileViewer;
