import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

function ProfileInfo(props) {
  const { paddler } = props;
  console.assert(
    paddler !== undefined,
    "Paddler whose info is to be displayed is undefined"
  );

  return (
    <StyledProfileInfo data-testid="profileInfo">
        <StyledProfileInfoChild>Name:</StyledProfileInfoChild> 
        <StyledProfileInfoChild>{paddler.name}</StyledProfileInfoChild>
        <StyledProfileInfoChild>Gender:</StyledProfileInfoChild> 
        <StyledProfileInfoChild>{paddler.gender}</StyledProfileInfoChild>
        <StyledProfileInfoChild>Weight (lb):</StyledProfileInfoChild> 
        <StyledProfileInfoChild>{paddler.weight}</StyledProfileInfoChild>
    </StyledProfileInfo>
  );
}

ProfileInfo.propTypes = {
  paddler: PropTypes.object.isRequired,
};

const StyledProfileInfo = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  justify-items: start;
  width: 50%;
  min-width: 230px;
  margin: 1em auto;
`;

const StyledProfileInfoChild = styled.p`
  margin: 0.1em 0;
`;

export default ProfileInfo;
