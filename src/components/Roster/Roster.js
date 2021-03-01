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
      <PaddlersTitle>Paddlers</PaddlersTitle>
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

const PaddlersTitle = styled.h1`
  color: black;
  font-family: Allura;
  font-size: 40px;
`;

const StyledPaddlersContainer = styled.div`
  display: flex;
`;

export default Roster;
