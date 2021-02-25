import React, { useState, useContext } from "react";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import PropTypes from "prop-types";
import styled from "styled-components";
import PaddlerForm from "../PaddlerForm/PaddlerForm";
import paddlerListContext from "../../paddlerListContext";
import {
  submitEdit,
  deletePaddler,
  moveToRoster,
  unselectPaddlers,
} from "../../reducers/paddlerListReducer/paddlerListActions";

function ProfileFullView({paddler, onTabChangeRequest}) {
  console.assert(
    paddler !== undefined,
    "Paddler to display in full-view is undefined"
  );

  const [isEditRequested, setIsEditRequested] = useState(false);
  const { dispatch } = useContext(paddlerListContext);

  const toggleIsEditRequested = () => {
    setIsEditRequested(!isEditRequested);
  };

  const handleEditSubmit = (editedPaddler) => {
    const paddlerProfile = {
      ...paddler,
      name: editedPaddler.name,
      gender: editedPaddler.gender,
      weight: editedPaddler.weight,
    };

    dispatch(submitEdit(paddlerProfile));
  };

  const showProfileWithOptions = () => {
    return (
      <div>
        <h1>Profile</h1>
        <ProfileInfo paddler={paddler} />
        <button onClick={toggleIsEditRequested}>Edit</button>
        <button onClick={() => dispatch(deletePaddler())}>Delete</button>
        {paddler.inBoat ?
          <button onClick={() => dispatch(moveToRoster(paddler))}>
            Move to Roster
          </button>
        :
          <button onClick={() => onTabChangeRequest("Boat")}>
            Move to Boat
          </button>}
        <button onClick={() => dispatch(unselectPaddlers())}>Cancel</button>
      </div>
    );
  };

  const showForm = () => {
    return (
      <div>
        <h1>Edit Paddler Profile</h1>
        <PaddlerForm onSubmit={handleEditSubmit} paddler={paddler} />
        <button onClick={toggleIsEditRequested}>Back</button>
      </div>
    );
  };

  return (
    <StyledProfileFullView data-testid="profileFullView">
      {isEditRequested ? showForm() : showProfileWithOptions()}
    </StyledProfileFullView>
  );
}

ProfileFullView.propTypes = {
  paddler: PropTypes.object.isRequired,
  onTabChangeRequest: PropTypes.func.isRequired
};

const StyledProfileFullView = styled.div`
  text-align: center;
  font-family: Allura;
  height: 80%;
  border: solid 1px purple;
`;

export default ProfileFullView;
