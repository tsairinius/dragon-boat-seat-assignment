import React, { useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";
import paddlerListContext from "../paddlerListContext";
import { loadSavedBoat } from "../reducers/paddlerListReducer/paddlerListActions";

function SavedBoats({savedBoats}) {
  const { dispatch } = useContext(paddlerListContext);
  const boatComponents = savedBoats.map((boat) => (
    <div key={uuidv4()} className="saved-boat" onClick={() => dispatch(loadSavedBoat(boat))}>
        {boat.name}
    </div>
  ));

  return (
    <div>
      <StyledBoatsContainer data-testid={"saved-boats"}>
        {boatComponents}
      </StyledBoatsContainer>
    </div>
  );
}

SavedBoats.propTypes = {
  label: PropTypes.string.isRequired,
  savedBoats: PropTypes.array.isRequired,
};

const StyledBoatsContainer = styled.div`
  padding-top: 35px;

  .saved-boat {
    display: inline-block;
    margin: 10px;
    float: left;
  }
`;

export default SavedBoats;
