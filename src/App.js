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

function App() {
  const { paddlerList } = useContext(paddlerListContext);

  const {
    paddlersInBoat,
    paddlersOnRoster,
    paddlerPreview,
    paddlerFullView,
  } = useApp(paddlerList);

  const [activeTab, setActiveTab ] = useState("Boat");

  return (
    <div>
        {paddlerFullView === undefined ? (
          <Tabs activeTab={activeTab} onTabRequest={label => setActiveTab(label)}>
            <Boat label="Boat" paddlersInBoat={paddlersInBoat} />
            <Roster label="Roster" paddlers={paddlersOnRoster} />
            <CreatePaddlerForm label="+" />
          </Tabs>
        ) : (
          <ProfileFullView paddler={paddlerFullView} onTabChangeRequest={label => setActiveTab(label)}/>
        )}
        <ProfilePreview paddler={paddlerPreview} />
    </div>
  );
}

const StyledApp = styled.div`
  display: grid;
`;

export default App;
