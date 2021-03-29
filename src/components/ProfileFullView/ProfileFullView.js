import React, { useState, useContext } from "react";
import ProfileInfo from "../ProfileInfo/ProfileInfo";
import PropTypes from "prop-types";
import PaddlerForm from "../PaddlerForm/PaddlerForm";
import paddlerListContext from "../../paddlerListContext";
import {
  submitEdit,
  deletePaddler,
  moveToRoster,
  unselectPaddlers,
  switchSeats
} from "../../reducers/paddlerListReducer/paddlerListActions";
import { StyledButton } from "../StyledButton";
import StyledModalContainer from "../StyledModalContainer";
import StyledModal from "../StyledModal";

function ProfileFullView({paddler, onMoveToBoat}) {
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
      firstName: editedPaddler.firstName,
      lastName: editedPaddler.lastName,
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
        <StyledButton onClick={toggleIsEditRequested}>Edit</StyledButton>
        <StyledButton onClick={() => dispatch(deletePaddler())}>Delete</StyledButton>
        {paddler.inBoat ? (
            <React.Fragment>
              <StyledButton onClick={() => dispatch(moveToRoster(paddler))}>
                Move to Roster
              </StyledButton>
              <StyledButton onClick={() => dispatch(switchSeats())}>
                Switch Seats
              </StyledButton>
            </React.Fragment>
          )
        :
          <StyledButton onClick={onMoveToBoat}>
            Move to Boat
          </StyledButton>}
        <StyledButton onClick={() => dispatch(unselectPaddlers())}>Cancel</StyledButton>
      </div>
    );
  };

  const showForm = () => {
    return (
      <div>
        <h1>Edit Paddler Profile</h1>
        <PaddlerForm onSubmit={handleEditSubmit} paddler={paddler} />
        <StyledButton onClick={toggleIsEditRequested}>Back</StyledButton>
      </div>
    );
  };

  return (
    <StyledModalContainer data-testid="profile-full-view">
      <StyledModal>
        {isEditRequested ? showForm() : showProfileWithOptions()}
      </StyledModal>
    </StyledModalContainer>
  );
}

ProfileFullView.propTypes = {
  paddler: PropTypes.object.isRequired,
  onMoveToBoat: PropTypes.func.isRequired
};

export default ProfileFullView;
