import React, { useContext, useState } from "react";
import Boat from "./components/Boat/Boat";
import Roster from "./components/Roster/Roster";
import CreatePaddlerForm from "./components/CreatePaddlerForm/CreatePaddlerForm";
import Tabs from "./components/Tabs/Tabs";
import styled from "styled-components";
import useApp from "./useApp";
import ProfileFullView from "./components/ProfileFullView/ProfileFullView";
import paddlerListContext from "./paddlerListContext";
import { moveToBoat, loadSavedAssignment, clearBoat } from "./reducers/paddlerListReducer/paddlerListActions";
import backdropImg from "./assets/img/backdrop.svg";
import SavedAssignments from "./components/SavedAssignments";
import deepCopyArrayOfObjects from "./deepCopyArrayOfObjects";
import SaveAssignment from "./components/SaveAssignment";
import { v4 as uuidv4 } from "uuid";
import StyledButton from "./components/StyledButton";
import Modal from "./components/Modal";
import rosterIcon from "./assets/img/roster-icon.png";
import boatIcon from "./assets/img/boat-icon.png";
import saveAssignmentIcon from "./assets/img/save-assignment-icon.png";
import savedAssignmentsIcon from "./assets/img/saved-assignments-icon.png";
import clearBoatIcon from "./assets/img/clear-boat-icon.png";
import createPaddlerIcon from "./assets/img/create-paddler-icon.png";

function App() {
  const { paddlerList, dispatch } = useContext(paddlerListContext);

  const {
    paddlersInBoat,
    paddlersOnRoster,
    paddlerPreview,
    paddlerFullView,
    assignSeatMode
  } = useApp(paddlerList);

  const [ savedAssignments, setSavedAssignments ] = useState([]);

  const [ activeTab, setActiveTab ] = useState("boat");

  const [ showSaveAssignmentWindow, setShowSaveAssignmentWindow ] = useState(false);

  const [ showClearBoatWindow, setShowClearBoatWindow ] = useState(false);

  const [ currentAppliedAssignment, setCurrentAppliedAssignment ] = useState(null);

  const loadSeatAssignment = (assignment) => {
    dispatch(loadSavedAssignment(assignment));
    setCurrentAppliedAssignment(assignment);
  };

  const handleMoveToBoatRequest = () => {
    dispatch(moveToBoat());
    setActiveTab("boat");
  }

  const saveCurrentSeatAssignment = () => {
    setSavedAssignments(prevState => 
      prevState.map(assignment => {
        if (assignment.id === currentAppliedAssignment.id) {
          assignment = {
            ...assignment,
            paddlers: deepCopyArrayOfObjects(paddlersInBoat)
          }
        }
        return assignment;
      })  
    )

    setShowSaveAssignmentWindow(false);
  }

  const saveNewSeatAssignment = (assignmentName) => {
    setSavedAssignments(prevState => [
      ...prevState, 
      {
        name: assignmentName,
        id: uuidv4(),
        paddlers: deepCopyArrayOfObjects(paddlersInBoat)
      }
    ]);

    setShowSaveAssignmentWindow(false);
  };

  const exitSaveAssignment = () => {
    setShowSaveAssignmentWindow(false);
  }

  const clearBoatAndExitModal = () => {
    dispatch(clearBoat());
    setShowClearBoatWindow(false);
  }

  const deleteAssignmentAndCheckCurrentAppliedOne = (assignmentToDelete) => {
    if (currentAppliedAssignment && (assignmentToDelete.id === currentAppliedAssignment.id)) {
      setCurrentAppliedAssignment(null);
    }

    setSavedAssignments(prevAssignments => (
      prevAssignments.filter(assignment => assignment.id !== assignmentToDelete.id)
    ));
  }

  const saveAssignmentButton = {
    label: "save-assignment",
    onClick: setShowSaveAssignmentWindow,
    icon: saveAssignmentIcon
  }

  const clearBoatButton = {
    label: "clear-boat",
    onClick: () => setShowClearBoatWindow(true),
    icon: clearBoatIcon
  }

  return (
    <StyledApp>
          <Tabs assignSeatMode={assignSeatMode} activeTab={activeTab} onTabRequest={label => setActiveTab(label)}>
            <Boat label="boat" icon={boatIcon} paddlersInBoat={paddlersInBoat} tabButtons={[saveAssignmentButton, clearBoatButton]}/>
            <Roster label="roster" icon={rosterIcon} paddlers={paddlersOnRoster} />
            <SavedAssignments label="saved-assignments" icon={savedAssignmentsIcon} savedAssignments={savedAssignments} onApplyClick={loadSeatAssignment} onDelete={(assignment) => deleteAssignmentAndCheckCurrentAppliedOne(assignment)} />
            <CreatePaddlerForm label="create-paddler" icon={createPaddlerIcon} />
          </Tabs>
          {paddlerFullView ? 
            <ProfileFullView paddler={paddlerFullView} onMoveToBoat={handleMoveToBoatRequest}/>
          :
          null}
          {showSaveAssignmentWindow ? 
            <SaveAssignment currentAppliedAssignmentName={currentAppliedAssignment ? currentAppliedAssignment.name : ""} onCurrentAppliedAssignmentSave={saveCurrentSeatAssignment} onNewAssignmentSave={saveNewSeatAssignment} onCancel={exitSaveAssignment} />
            :
            null
          }
          {showClearBoatWindow ? 
            <Modal>
              <h2>Move all paddlers back to roster?</h2>
              <StyledButton onClick={clearBoatAndExitModal}>Clear Boat</StyledButton>
              <StyledButton onClick={() => setShowClearBoatWindow(false)}>Cancel</StyledButton>
            </Modal>
            :
            null
          }
    </StyledApp>
  );
}

const StyledApp = styled.div`
  width: 85%;
  max-width: 700px;
  margin: 0 auto;
  height: 100vh;
  background-color: black;
  background-image: url(${backdropImg});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom;
  border-radius: 10px;
  box-shadow: 1px 1px 2px rgb(200, 200, 200);, -1px 1px 2px rgb(200, 200, 200);

  .tab-title {
    font-family: Allura, Roboto, Arial, Helvetica, sans-serif;
  }
`;

export default App;
