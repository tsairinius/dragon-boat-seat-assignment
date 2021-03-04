import React, { useContext, useState } from "react";
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

function App() {
  const { paddlerList, dispatch } = useContext(paddlerListContext);

  const {
    paddlersInBoat,
    paddlersOnRoster,
    paddlerPreview,
    paddlerFullView,
    assignSeatMode
  } = useApp(paddlerList);

  const [activeTab, setActiveTab ] = useState("Boat");

  const handleMoveToBoatRequest = () => {
    dispatch(moveToBoat());
    setActiveTab("Boat");
  }

  return (
    <StyledApp>
        {paddlerFullView === undefined ? (
          <Tabs activeTab={activeTab} onTabRequest={label => setActiveTab(label)}>
            <StyledBoatContainer label="Boat">
              {assignSeatMode ? 
                <StyledChooseSeat>
                  <h2>Choose a seat</h2>
                  <button onClick={() => dispatch(unselectPaddlers())}>Cancel</button>
                </StyledChooseSeat>
                :
                null
              }
              <Boat paddlersInBoat={paddlersInBoat} />
            </StyledBoatContainer>
            <Roster label="Roster" paddlers={paddlersOnRoster} />
            <CreatePaddlerForm label="+" />
          </Tabs>
        ) : (
          <ProfileFullView paddler={paddlerFullView} onMoveToBoat={handleMoveToBoatRequest}/>
        )}
        <ProfilePreview paddler={paddlerPreview} />
    </StyledApp>
  );
}

const StyledApp = styled.div`
  display: grid;
  width: 85%;
  margin: 0 auto;
  height: 97vh;
  grid-template-rows: 6fr 1fr;
  background: white;
  border-radius: 10px;
  box-shadow: 1px 1px 2px rgb(200, 200, 200);, -1px 1px 2px rgb(200, 200, 200);
`;

const StyledChooseSeat = styled.div`
  position: absolute;
  border: 1px solid black;
  padding: 1em;
  margin: 1em;
`;

const StyledBoatContainer = styled.div`
  position: relative;
`;

export default App;
