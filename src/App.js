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
import { moveToBoat } from "./reducers/paddlerListReducer/paddlerListActions";

function App() {
  const { paddlerList, dispatch } = useContext(paddlerListContext);

  const {
    paddlersInBoat,
    paddlersOnRoster,
    paddlerPreview,
    paddlerFullView,
  } = useApp(paddlerList);

  const [activeTab, setActiveTab ] = useState("Boat");

  const handleMoveToBoatRequest = () => {
    dispatch(moveToBoat());
    setActiveTab("Boat");
  }

  return (
    <div>
        {paddlerFullView === undefined ? (
          <Tabs activeTab={activeTab} onTabRequest={label => setActiveTab(label)}>
            <Boat label="Boat" paddlersInBoat={paddlersInBoat} />
            <Roster label="Roster" paddlers={paddlersOnRoster} />
            <CreatePaddlerForm label="+" />
          </Tabs>
        ) : (
          <ProfileFullView paddler={paddlerFullView} onMoveToBoat={handleMoveToBoatRequest}/>
        )}
        <ProfilePreview paddler={paddlerPreview} />
    </div>
  );
}

const StyledApp = styled.div`
  display: grid;
`;

export default App;
