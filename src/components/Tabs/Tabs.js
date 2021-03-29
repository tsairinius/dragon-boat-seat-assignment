import React, { useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { primaryBackground } from "../../styles";
import rosterIcon from "../../assets/img/roster-icon.png";
import boatIcon from "../../assets/img/boat-icon.png";
import saveAssignmentIcon from "../../assets/img/save-assignment-icon.png";
import savedAssignmentsIcon from "../../assets/img/saved-assignments-icon.png";
import clearBoatIcon from "../../assets/img/clear-boat-icon.png";
import createPaddlerIcon from "../../assets/img/create-paddler-icon.png";
import { unselectPaddlers } from "../../reducers/paddlerListReducer/paddlerListActions";
import paddlerListContext from "../../paddlerListContext";
import StyledButton from "../StyledButton";

function Tabs({children, assignSeatMode, activeTab, onTabRequest}) {
  const { dispatch } = useContext(paddlerListContext);

  const tabsCollection = React.Children.toArray(children);

  const getIcon = (label) => {
    let icon = null;
    switch(label) {
      case "roster":
        icon = rosterIcon;
        break;
      case "boat":
        icon = boatIcon;
        break;
      case "create-paddler":
        icon = createPaddlerIcon;
        break;
      case "saved-assignments":
        icon = savedAssignmentsIcon;
        break;
      case "save-assignment":
        icon = saveAssignmentIcon;
        break;
      case "clear-boat":
        icon = clearBoatIcon;
        break;
      default:
        break;
    }

    return icon;
  };

  const tabSpecificButtons =
    tabsCollection.map((tab) => (
      tab.props.tabButtons && tab.props.label === activeTab ?
        tab.props.tabButtons.map(button => 
          <StyledTab 
            key={button.label}
            data-testid={`tab-${button.label}`}
            onClick={button.onClick}
          >
            <StyledIcon src={getIcon(button.label)} /> 
          </StyledTab>)
        :
        null
    ));

  return (
    <StyledTabs>
      <StyledTabContent>
        {tabsCollection.map((tab) =>
          tab.props.label === activeTab ? tab : undefined
        )}
      </StyledTabContent>
      <StyledTabContainer>
        {assignSeatMode ?
         <StyledButton className="btn-cancel-assignment" data-testid="btnCancelSeatAssignment" onClick={() => dispatch(unselectPaddlers())}>X</StyledButton>
        :
        <React.Fragment>
          {tabsCollection.map((tab) => (
          <StyledTab
            key={tab.props.label}
            data-testid={`tab-${tab.props.label}`}
            type="button"
            onClick={() => onTabRequest(tab.props.label)}
          >
            <StyledIcon src={getIcon(tab.props.label)}/>
            </StyledTab>
          ))}
          {tabSpecificButtons}
        </React.Fragment>}
      </StyledTabContainer>
    </StyledTabs>
  );
}

Tabs.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  activeTab: PropTypes.string.isRequired,
  onTabRequest: PropTypes.func.isRequired
};


const StyledTabs = styled.div`
  text-align: center;
  display: grid;
  grid-template-columns: auto 60px;
  height: 100%;

  .btn-cancel-assignment {
    background-color: red;
    padding: 0.5em 1em;
  }
`;

const StyledTabContainer = styled.div`
  background-color: ${primaryBackground};
  box-shadow: -1px 0px 1px rgb(165, 165, 165);
`;

const StyledTab = styled.button`
  border: none;
  background: inherit;
  font-family: Roboto, Arial, Helvetica, sans-serif;
  padding: 0.8rem 0;

  &:hover {
    cursor: pointer;
    filter: brightness(80%);
  }
`;

const StyledIcon = styled.img`
  width: 70%;
`;

const StyledTabContent = styled.div`
  overflow: scroll;
`;

export default Tabs;
