import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

function SavedAssignments({savedAssignments, onAssignmentClick}) {
  const assignmentComponents = savedAssignments.map((assignment) => (
    <div key={uuidv4()} className="saved-assignment" onClick={() => onAssignmentClick(assignment)}>
        {assignment.name}
    </div>
  ));

  return (
    <div>
      <StyledAssignmentsContainer data-testid={"saved-assignments"}>
        {assignmentComponents}
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
  }
`;

export default SavedAssignments;
