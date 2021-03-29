import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import StyledButton from "./StyledButton";
import savedAssignmentIcon from "../assets/img/saved-assignment-icon.svg";
import Modal from "./Modal";

function SavedAssignments({savedAssignments, setSavedAssignments, onApplyClick}) {
  const [ showAssignmentOptions, setShowAssignmentOptions ] = useState(false);
  const [ selectedAssignment, setSelectedAssignment ] = useState(null);

  const maxAssignmentNameLength = 10;

  const assignmentComponents = savedAssignments.map((assignment) => (
    <div key={uuidv4()} className="saved-assignment" onClick={() => selectAssignment(assignment)}>
        <img src={savedAssignmentIcon} className="saved-assignment-image" width="60px" height="60px"></img>
        <p className="saved-assignment-name">
          {assignment.name.length > maxAssignmentNameLength ? 
            `${assignment.name.slice(0, maxAssignmentNameLength)}...`
            :
            assignment.name
          }
          </p>
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
      <h1 className="tab-title">Assignments</h1>
      <StyledAssignmentsContainer data-testid={"saved-assignments"}>
        {assignmentComponents}
        {showAssignmentOptions ? 
          <Modal dataTestId="selected-assignment-options">
            <h1>{selectedAssignment.name}</h1>
            <StyledButton onClick={applyAssignment}>Apply to Boat</StyledButton>
            <StyledButton onClick={deleteAssignment}>Delete</StyledButton>
            <StyledButton onClick={cancelSelection}>Cancel</StyledButton>
          </Modal>
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
  padding-top: 45px;

  .saved-assignment {
    position: relative;
    display: inline-block;
    margin: 10px;
    float: left;
    text-align: center;

    &:hover {
      cursor: pointer;
      filter: brightness(130%);
    }
  }

  .saved-assignment-name {
    margin: 0;
  }
`;

export default SavedAssignments;