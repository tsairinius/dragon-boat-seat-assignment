import React from "react";
import Boat from "./components/Boat/Boat";
import Roster from "./components/Roster/Roster";
import CreatePaddlerForm from "./components/CreatePaddlerForm/CreatePaddlerForm";
import Tabs from "./components/Tabs/Tabs";
import ProfilePreview from "./components/ProfilePreview/ProfilePreview";
import styled from "styled-components";
import useApp from "./useApp";
import ProfileFullView from "./components/ProfileFullView/ProfileFullView";

function App() {
  const {
    paddlersInBoat,
    paddlersOnRoster,
    paddlerPreview,
    paddlerFullView,
    handlePaddlerClick,
    handlePaddlerMouseEnter,
    handlePaddlerMouseLeave,
    assignSelectedPaddlerSeat,
    addPaddlerToList,
    handleFullViewEdit,
    handleFullViewDelete,
    handleMoveToRoster,
    handleFullViewCancel,
  } = useApp();

  return (
    <StyledApp>
      <StyledColumn side="left">
        <Boat
          paddlersInBoat={paddlersInBoat}
          onSeatClick={assignSelectedPaddlerSeat}
          onPaddlerMouseEnter={handlePaddlerMouseEnter}
          onPaddlerMouseLeave={handlePaddlerMouseLeave}
          onPaddlerClick={handlePaddlerClick}
        />
      </StyledColumn>
      <StyledColumn side="right">
        {paddlerFullView === undefined ? (
          <Tabs>
            <Roster
              label="Roster"
              paddlers={paddlersOnRoster}
              onPaddlerMouseEnter={handlePaddlerMouseEnter}
              onPaddlerMouseLeave={handlePaddlerMouseLeave}
              onPaddlerClick={handlePaddlerClick}
            />
            <CreatePaddlerForm label="+" onSubmit={addPaddlerToList} />
          </Tabs>
        ) : (
          <ProfileFullView
            paddler={paddlerFullView}
            onFormSubmit={handleFullViewEdit}
            onFullViewDelete={handleFullViewDelete}
            onMoveToRoster={handleMoveToRoster}
            onFullViewCancel={handleFullViewCancel}
          />
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
