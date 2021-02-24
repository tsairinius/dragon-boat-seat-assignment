import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

function Tabs(props) {
  const tabsCollection = React.Children.toArray(props.children);
  const [activeTab, setActiveTab] = useState(tabsCollection[0].props.label);
  const handleClick = (tab) => setActiveTab(tab);

  return (
    <StyledTabs>
      {tabsCollection.map((tab) => (
        <button
          key={tab.props.label}
          type="button"
          onClick={() => handleClick(tab.props.label)}
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
};

const StyledTabs = styled.div`
  text-align: center;
  border: solid 1px purple;
`;

export default Tabs;
