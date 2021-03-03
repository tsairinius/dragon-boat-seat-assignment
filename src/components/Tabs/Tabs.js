import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

function Tabs({children, activeTab, onTabRequest}) {
  const tabsCollection = React.Children.toArray(children);

  return (
    <StyledTabs>
      <div>
        {tabsCollection.map((tab) => (
          <StyledTab
            key={tab.props.label}
            isActive={tab.props.label === activeTab}
            type="button"
            onClick={() => onTabRequest(tab.props.label)}
          >
            {tab.props.label}
          </StyledTab>
        ))}
      </div>
      <StyledTabContent>
        {tabsCollection.map((tab) =>
          tab.props.label === activeTab ? tab : undefined
        )}
      </StyledTabContent>
    </StyledTabs>
  );
}

Tabs.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
  activeTab: PropTypes.string.isRequired,
  onTabRequest: PropTypes.func.isRequired
};

const tabContentBackground = 'rgb(140, 228, 255)';

const StyledTabs = styled.div`
  text-align: center;
  display: grid;
  grid-template-rows: min-content auto;
`;

const StyledTab = styled.button`
  background: ${props => props.isActive ? tabContentBackground : 'rgb(0, 173, 226)'}; 
  border: black 1px solid;
  border-bottom: ${tabContentBackground};
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  font-size: 1rem;
  font-family: Roboto, Arial, Helvetica, sans-serif;
  padding: 0.5em 1em;

  &:focus {
    outline: none;
    filter: brightness(110%);
  }

  &:hover {
    cursor: pointer;
  }
`;

const StyledTabContent = styled.div`
  background: ${tabContentBackground};
  border-radius: 3px;
  height: 100%;
`;

export default Tabs;
