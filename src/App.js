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

  const [activeTab, setActiveTab ] = useState("boat");

  const handleMoveToBoatRequest = () => {
    dispatch(moveToBoat());
    setActiveTab("boat");
  }

  return (
    <StyledApp>
        {paddlerFullView === undefined ? (
          <Tabs assignSeatMode={assignSeatMode} activeTab={activeTab} onTabRequest={label => setActiveTab(label)}>
            <Boat label="boat" paddlersInBoat={paddlersInBoat} />
            <Roster label="roster" paddlers={paddlersOnRoster} />
            <CreatePaddlerForm label="create-paddler" />
          </Tabs>
        ) : (
          <ProfileFullView paddler={paddlerFullView} onMoveToBoat={handleMoveToBoatRequest}/>
        )}
    </StyledApp>
  );
}

const StyledApp = styled.div`
  width: 85%;
  margin: 0 auto;
  height: 100vh;
  background: white;
  border-radius: 10px;
  box-shadow: 1px 1px 2px rgb(200, 200, 200);, -1px 1px 2px rgb(200, 200, 200);
`;

export default App;
