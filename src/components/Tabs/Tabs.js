import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

function Tabs({children, activeTab, onTabRequest}) {
  const tabsCollection = React.Children.toArray(children);

  return (
    <StyledTabs>
      {tabsCollection.map((tab) => (
        <button
          key={tab.props.label}
          type="button"
          onClick={() => onTabRequest(tab.props.label)}
        >
          {tab.props.label}
        </button>
      ))}
      {tabsCollection.map((tab) =>
        tab.props.label === activeTab ? tab : undefined
      )}
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
  border: solid 1px purple;
`;

export default Tabs;
