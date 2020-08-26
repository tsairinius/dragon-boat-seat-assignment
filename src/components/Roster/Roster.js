import React from "react";
import Paddler from "../Paddler/Paddler";
import PropTypes from "prop-types";
import styled from "styled-components";

function Roster(props) {
  const paddlerComponents = props.paddlers.map((paddler) => (
    <Paddler key={paddler.id} paddlerProfile={paddler} />
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
};

const PaddlersTitle = styled.h1`
  color: black;
  font-family: Allura;
  font-size: 40px;
`;

export default Roster;
