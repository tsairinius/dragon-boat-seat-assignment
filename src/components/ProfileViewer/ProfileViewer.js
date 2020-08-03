import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

function ProfileViewer(props) {
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
    <StyledProfileViewer>
      {props.paddler !== undefined ? showPaddlerInfo() : undefined}
    </StyledProfileViewer>
  );
}

ProfileViewer.propTypes = {
  paddler: PropTypes.object,
};

const StyledProfileViewer = styled.div`
  border: solid 1px blue;
  height: 20%;
`;

export default ProfileViewer;
