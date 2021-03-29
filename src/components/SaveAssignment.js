import React from "react";
import { useState } from "react"
import { StyledButton } from "./StyledButton"
import StyledModal from "./StyledModal"
import StyledModalContainer from "./StyledModalContainer"

const SaveAssignment = ({currentSeatAssignmentName, onCurrentAssignmentSave, onNewAssignmentSave, onCancel}) => {
    const [ assignmentName, setAssignmentName ] = useState("");
    const [ showNewAssignmentForm, setShowNewAssignmentForm ] = useState(false);

    const saveAssignment = (event) => {
        event.preventDefault();

        setAssignmentName("");
        onNewAssignmentSave(assignmentName);
    }

    const cancelSaveAssignment = () => {
        setAssignmentName("");
        onCancel();
    }

    return (
        <StyledModalContainer data-testid={"save-assignment-window"}>
        <StyledModal>
          <h2>Save Seat Assignment</h2>
            {showNewAssignmentForm || !currentSeatAssignmentName ? 
                <form onSubmit={saveAssignment}>
                    <label className={"label-boat-name"}>
                    Name
                    <input className={"input-boat-name"} type="text" value={assignmentName} onChange={event => setAssignmentName(event.target.value)} required/>
                    </label>
                    <div>
                    <StyledButton type="submit">Save</StyledButton>
                    <StyledButton onClick={cancelSaveAssignment}>Cancel</StyledButton>
                    </div>
                </form>
                :
                <React.Fragment>
                    <p>Save as the current assignment, {currentSeatAssignmentName}?</p>
                    <StyledButton onClick={onCurrentAssignmentSave}>Yes</StyledButton>
                    <StyledButton onClick={() => setShowNewAssignmentForm(true)}>No, save as a new assignment</StyledButton>
                    <StyledButton onClick={cancelSaveAssignment}>Cancel</StyledButton>
                </React.Fragment>
            }
        </StyledModal>
      </StyledModalContainer>
    )

}

export default SaveAssignment;