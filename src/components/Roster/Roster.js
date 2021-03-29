import React from "react";
import Paddler from "../Paddler/Paddler";
import PropTypes from "prop-types";
import styled from "styled-components";

function Roster(props) {
  const paddlerComponents = props.paddlers.map((paddler) => (
    <Paddler key={paddler.id} paddlerProfile={paddler} />
  ));

  return (
    <div>
      <h1 className="tab-title">Roster</h1>
      <StyledPaddlersContainer data-testid={"roster"}>
        {paddlerComponents}
      </StyledPaddlersContainer>
    </div>
  );
}

Roster.propTypes = {
  label: PropTypes.string.isRequired,
  paddlers: PropTypes.array.isRequired,
};

const StyledPaddlersContainer = styled.div`
  padding-top: 45px;

  .paddler {
    display: inline-block;
    margin: 10px;
    float: left;

    &:hover {
      > .paddler-name {
        display: block;
      }
    }
  }
`;

export default Roster;
