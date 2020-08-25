import React from "react";
import PropTypes from "prop-types";

function ProfileInfo(props) {
  const { paddler } = props;
  console.assert(
    paddler !== undefined,
    "Paddler whose info is to be displayed is undefined"
  );

  return (
    <div data-testid="profileInfo">
      <ul>
        <li>Name: {paddler.name} </li>
        <li>Gender: {paddler.gender}</li>
        <li>Weight (lb): {paddler.weight}</li>
      </ul>
    </div>
  );
}

ProfileInfo.propTypes = {
  paddler: PropTypes.object.isRequired,
};

export default ProfileInfo;
