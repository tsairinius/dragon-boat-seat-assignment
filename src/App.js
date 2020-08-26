import React, { useContext } from "react";
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

  return (
    <StyledApp>
      <StyledColumn side="left">
        <Boat paddlersInBoat={paddlersInBoat} />
      </StyledColumn>
      <StyledColumn side="right">
        {paddlerFullView === undefined ? (
          <Tabs>
            <Roster label="Roster" paddlers={paddlersOnRoster} />
            <CreatePaddlerForm label="+" />
          </Tabs>
        ) : (
          <ProfileFullView paddler={paddlerFullView} />
        )}
        <ProfilePreview paddler={paddlerPreview} />
      </StyledColumn>
    </StyledApp>
  );
}

const StyledApp = styled.div`
  :after: {
    content: "";
    display: table;
    clear: both;
  }
  height: 600px;
`;

const StyledColumn = styled.div`
  float: ${(props) => props.side};
  width: 45%;
  height: 100%;
  margin-left: ${(props) => (props.side === "right" ? ": 1%" : "0")};
  margin-right: ${(props) => (props.side === "left" ? ": 1%" : "0")};
  position: relative;
  border: solid 1px orange;
`;

export default App;
