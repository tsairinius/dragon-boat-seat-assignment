import React, { useContext, useEffect, useState } from "react";
import Boat from "./components/Boat/Boat";
import Roster from "./components/Roster/Roster";
import CreatePaddlerForm from "./components/CreatePaddlerForm/CreatePaddlerForm";
import Tabs from "./components/Tabs/Tabs";
import ProfilePreview from "./components/ProfilePreview/ProfilePreview";
import styled from "styled-components";
import useApp from "./useApp";
import ProfileFullView from "./components/ProfileFullView/ProfileFullView";
import paddlerListContext from "./paddlerListContext";
import { moveToBoat, unselectPaddlers } from "./reducers/paddlerListReducer/paddlerListActions";
import { primaryBackground } from "./styles";
import backdropImg from "./assets/img/backdrop.svg";
import SavedBoats from "./components/SavedBoats";
import { StyledButton } from "./components/StyledButton";
import StyledModalContainer from "./components/StyledModalContainer";
import StyledModal from "./components/StyledModal";
import deepCopyArrayOfObjects from "./deepCopyArrayOfObjects";
import SaveAssignment from "./components/SaveAssignment";

function App() {
  const { paddlerList, dispatch } = useContext(paddlerListContext);

  const {
    paddlersInBoat,
    paddlersOnRoster,
    paddlerPreview,
    paddlerFullView,
    assignSeatMode
  } = useApp(paddlerList);

  const [ savedBoats, setSavedBoats ] = useState([]);

  const [ activeTab, setActiveTab ] = useState("boat");

  const [ showSaveBoatWindow, setShowSaveBoatWindow ] = useState(false);

  const handleMoveToBoatRequest = () => {
    dispatch(moveToBoat());
    setActiveTab("boat");
  }

  const saveNewSeatAssignment = (assignmentName) => {
    setSavedBoats(prevState => [
      ...prevState, 
      {
        name: assignmentName,
        paddlers: deepCopyArrayOfObjects(paddlersInBoat)
      }
    ]);

    setShowSaveBoatWindow(false);
  };

  const exitSaveAssignment = () => {
    setShowSaveBoatWindow(false);
  }

  const saveAssignmentButton = {
    label: "save-boat",
    onClick: setShowSaveBoatWindow
  }

  return (
    <StyledApp>
          <Tabs assignSeatMode={assignSeatMode} activeTab={activeTab} onTabRequest={label => setActiveTab(label)}>
            <Boat label="boat" paddlersInBoat={paddlersInBoat} tabButtons={[saveAssignmentButton]}/>
            <Roster label="roster" paddlers={paddlersOnRoster} />
            <SavedBoats label="saved-boats" savedBoats={savedBoats}/>
            <CreatePaddlerForm label="create-paddler" />
          </Tabs>
          {paddlerFullView ? 
            <ProfileFullView paddler={paddlerFullView} onMoveToBoat={handleMoveToBoatRequest}/>
          :
          null}
          {showSaveBoatWindow ? 
            <SaveAssignment onNewAssignmentSave={saveNewSeatAssignment} onCancel={exitSaveAssignment} />
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

  .input-boat-name {
    margin-left: 1em;
  }
`;

export default App;
