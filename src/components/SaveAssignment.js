import React from "react";
import { useState } from "react"
import Modal from "./Modal";
import StyledButton from "./StyledButton"
import StyledField from "./StyledField";

const SaveAssignment = ({currentAppliedAssignmentName, onCurrentAppliedAssignmentSave, onNewAssignmentSave, onCancel}) => {
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
        <Modal dataTestId={"save-assignment-window"}>
            <h2>Save Seat Assignment</h2>
            {showNewAssignmentForm || !currentAppliedAssignmentName ? 
                <form onSubmit={saveAssignment}>
                    <StyledField>
                        <label htmlFor="assignment-name">
                            Name
                        </label>
                        <input id="assignment-name" type="text" value={assignmentName} onChange={event => setAssignmentName(event.target.value)} required/>
                    </StyledField>
                    <div>
                        <StyledButton type="submit">Save</StyledButton>
                        <StyledButton type="button" onClick={cancelSaveAssignment}>Cancel</StyledButton>
                    </div>
                </form>
                :
                <React.Fragment>
                    <p>Save as the current assignment, {currentAppliedAssignmentName}?</p>
                    <StyledButton onClick={onCurrentAppliedAssignmentSave}>Yes</StyledButton>
                    <StyledButton onClick={() => setShowNewAssignmentForm(true)}>No, save as a new assignment</StyledButton>
                    <StyledButton onClick={cancelSaveAssignment}>Cancel</StyledButton>
                </React.Fragment>
            }
      </Modal>
    )
}

export default SaveAssignment;