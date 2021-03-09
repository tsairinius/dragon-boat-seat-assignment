import React, { useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import PaddlerForm from "../PaddlerForm/PaddlerForm";
import paddlerListContext from "../../paddlerListContext";
import { addPaddler } from "../../reducers/paddlerListReducer/paddlerListActions";

function CreatePaddlerForm() {
  const { dispatch } = useContext(paddlerListContext);

  const handleSubmit = (paddlerProfile) => {
    dispatch(addPaddler(paddlerProfile));
  };

  return (
    <div data-testid="createPaddlerForm">
      <StyledCreatePaddlerTitle>Create a Paddler</StyledCreatePaddlerTitle>
      <PaddlerForm onSubmit={handleSubmit} />
    </div>
  );
}

CreatePaddlerForm.propTypes = {
  label: PropTypes.string,
};

const StyledCreatePaddlerTitle = styled.h1`
  font-family: Allura;
  font-size: 40px;
`;

export default CreatePaddlerForm;
