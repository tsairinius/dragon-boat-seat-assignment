import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import ProfileInfo from "../ProfileInfo/ProfileInfo";

function ProfilePreview(props) {
  return (
    <StyledProfilePreview>
      {props.paddler !== undefined ? (
        <ProfileInfo paddler={props.paddler} />
      ) : undefined}
    </StyledProfilePreview>
  );
}

ProfilePreview.propTypes = {
  paddler: PropTypes.object,
};

const StyledProfilePreview = styled.div`
  border: solid 1px blue;
`;

export default ProfilePreview;
