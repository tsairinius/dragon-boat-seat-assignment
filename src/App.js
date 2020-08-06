import React from "react";
import Boat from "./components/Boat/Boat";
import Roster from "./components/Roster/Roster";
import CreatePaddlerForm from "./components/CreatePaddlerForm/CreatePaddlerForm";
import Tabs from "./components/Tabs/Tabs";
import ProfileViewer from "./components/ProfileViewer/ProfileViewer";
import styled from "styled-components";
import useApp from "./useApp";

function App() {
  const {
    paddlersInBoat,
    paddlersOnRoster,
    paddlerToView,
    handlePaddlerClick,
    handlePaddlerMouseEnter,
    handlePaddlerMouseLeave,
    assignActivePaddlerSeat,
    addPaddlerToList,
  } = useApp();

  return (
    <StyledApp>
      <StyledColumn side="left">
        <Boat
          paddlersInBoat={paddlersInBoat}
          onSeatClick={assignActivePaddlerSeat}
          onPaddlerMouseEnter={handlePaddlerMouseEnter}
          onPaddlerMouseLeave={handlePaddlerMouseLeave}
          onPaddlerClick={handlePaddlerClick}
        />
      </StyledColumn>
      <StyledColumn side="right">
        <Tabs>
          <Roster
            label="Roster"
            paddlers={paddlersOnRoster}
            onPaddlerMouseEnter={handlePaddlerMouseEnter}
            onPaddlerMouseLeave={handlePaddlerMouseLeave}
            onPaddlerClick={handlePaddlerClick}
          />
          <CreatePaddlerForm label="+" addPaddler={addPaddlerToList} />
        </Tabs>
        <ProfileViewer paddler={paddlerToView} />
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
