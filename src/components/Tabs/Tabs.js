import React, { useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { primaryBackground } from "../../styles";
import rosterIcon from "../../assets/img/roster-icon.png";
import boatIcon from "../../assets/img/boat-icon.png";
import createPaddlerIcon from "../../assets/img/create-paddler-icon.png";
import { unselectPaddlers } from "../../reducers/paddlerListReducer/paddlerListActions";
import paddlerListContext from "../../paddlerListContext";

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
    }

    return icon;
  };

  return (
    <StyledTabs>
      <StyledTabContent>
        {tabsCollection.map((tab) =>
          tab.props.label === activeTab ? tab : undefined
        )}
      </StyledTabContent>
      <StyledTabContainer>
        {assignSeatMode ?
         <button onClick={() => dispatch(unselectPaddlers())}>Cancel</button>
        :
        tabsCollection.map((tab) => (
          <StyledTab
            key={tab.props.label}
            isActive={tab.props.label === activeTab}
            data-testid={`tab-${tab.props.label}`}
            type="button"
            onClick={() => onTabRequest(tab.props.label)}
          >
            <StyledIcon src={getIcon(tab.props.label)}/>
          </StyledTab>
        ))}
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
  grid-template-columns: 6fr 1fr;
  height: 100%;
`;

const StyledTabContainer = styled.div`
  background-color: ${primaryBackground};
  box-shadow: -1px 0px 1px rgb(165, 165, 165);
`;

const StyledTab = styled.button`
  border: none;
  background: inherit;
  font-family: Roboto, Arial, Helvetica, sans-serif;
  min-width: 4rem;
  padding: 0.8rem 0;

  &:hover, &:focus {
    cursor: pointer;
    filter: brightness(80%);
  }
`;

const StyledIcon = styled.img`
  width: 70%;

`;

const StyledTabContent = styled.div`
  border-radius: 3px;
  padding: 1rem 0;
`;

export default Tabs;
