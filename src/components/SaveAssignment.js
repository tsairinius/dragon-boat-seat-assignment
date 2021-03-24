import React from "react";
import { useState } from "react"
import { StyledButton } from "./StyledButton"
import StyledModal from "./StyledModal"
import StyledModalContainer from "./StyledModalContainer"

const SaveAssignment = ({onNewAssignmentSave, onCancel}) => {

    const [ assignmentName, setAssignmentName ] = useState("");

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
        <StyledModalContainer data-testid={"save-boat-window"}>
        <StyledModal>
          <h2>Save Seat Assignment</h2>
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
        </StyledModal>
      </StyledModalContainer>
    )

}

export default SaveAssignment;