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

const StyledTabs = styled.div`
  text-align: center;
  display: grid;
  grid-template-rows: min-content auto;
`;

const StyledTab = styled.button`
  background: rgb(140, 228, 255); 
  border: black 1px solid;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  border-bottom: rgb(191, 191, 255);
  font-size: 1rem;
  padding: 0.5em 1em;

  &:hover {
    cursor: pointer;
  }
`;

const StyledTabContent = styled.div`
  background: rgb(140, 228, 255);
  border-radius: 3px;
  height: 100%;
`;

export default Tabs;
