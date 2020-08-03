import React from "react";
import Paddler from "../Paddler/Paddler";
import PropTypes from "prop-types";
import styled from "styled-components";

function Roster(props) {
  const paddlerComponents = props.paddlers.map((paddler) => (
    <Paddler
      key={paddler.id}
      paddlerProfile={paddler}
      handlePaddlerMouseEnter={props.handlePaddlerMouseEnter}
      handlePaddlerMouseLeave={props.handlePaddlerMouseLeave}
      handlePaddlerClick={props.handlePaddlerClick}
    />
  ));

  return (
    <div data-testid={"roster"}>
      <PaddlersTitle>Paddlers</PaddlersTitle>
      {paddlerComponents}
    </div>
  );
}

Roster.propTypes = {
  label: PropTypes.string.isRequired,
  paddlers: PropTypes.array.isRequired,
  handlePaddlerClick: PropTypes.func.isRequired,
  handlePaddlerMouseEnter: PropTypes.func.isRequired,
  handlePaddlerMouseLeave: PropTypes.func.isRequired,
};

const PaddlersTitle = styled.h1`
  color: black;
  font-family: Allura;
  font-size: 40px;
`;

export default Roster;
