import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import StyledModalContainer from "./StyledModalContainer";
import StyledModal from "./StyledModal";
import { StyledButton } from "./StyledButton";

function SavedAssignments({savedAssignments, setSavedAssignments, onApplyClick}) {
  const [ showAssignmentOptions, setShowAssignmentOptions ] = useState(false);
  const [ selectedAssignment, setSelectedAssignment ] = useState(null)

  const assignmentComponents = savedAssignments.map((assignment) => (
    <div key={uuidv4()} className="saved-assignment" onClick={() => selectAssignment(assignment)}>
        {assignment.name}
    </div>
  ));

  const selectAssignment = (assignment) => {
    setSelectedAssignment(assignment);
    setShowAssignmentOptions(true);
  }

  const cancelSelection = () => {
    setSelectedAssignment(null);
    setShowAssignmentOptions(false);
  }

  const applyAssignment = () => {
    if (!selectedAssignment) {
      throw new Error("Selected assignment is null");
    }

    onApplyClick(selectedAssignment);
    setShowAssignmentOptions(false);
  }

  const deleteAssignment = () => {
    if (!selectedAssignment) {
      throw new Error("Selected assignment is null");
    }

    setSavedAssignments(prevAssignments => (
      prevAssignments.filter(assignment => assignment.id !== selectedAssignment.id)
    ));

    setShowAssignmentOptions(false);
  };

  return (
    <div>
      <StyledAssignmentsContainer data-testid={"saved-assignments"}>
        {assignmentComponents}
        {showAssignmentOptions ? 
          <StyledModalContainer data-testid="selected-assignment-options">
            <StyledModal>
              <h1>{selectedAssignment.name}</h1>
              <StyledButton onClick={applyAssignment}>Apply to Boat</StyledButton>
              <StyledButton onClick={deleteAssignment}>Delete</StyledButton>
              <StyledButton onClick={cancelSelection}>Cancel</StyledButton>
            </StyledModal>
          </StyledModalContainer>
          :
          null}
      </StyledAssignmentsContainer>
    </div>
  );
}

SavedAssignments.propTypes = {
  label: PropTypes.string.isRequired,
  savedAssignments: PropTypes.array.isRequired,
};

const StyledAssignmentsContainer = styled.div`
  padding-top: 35px;

  .saved-assignment {
    display: inline-block;
    margin: 10px;
    float: left;

    &:hover {
      cursor: pointer;
    }
  }
`;

export default SavedAssignments;
