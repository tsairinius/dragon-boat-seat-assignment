import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import PaddlerForm from "../PaddlerForm/PaddlerForm";

function CreatePaddlerForm(props) {
  return (
    <StyledCreatePaddlerForm data-testid="createPaddlerForm">
      <StyledCreatePaddlerTitle>Create a Paddler</StyledCreatePaddlerTitle>
      <PaddlerForm onSubmit={props.onSubmit} />
    </StyledCreatePaddlerForm>
  );
}

CreatePaddlerForm.propTypes = {
  label: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};

const StyledCreatePaddlerForm = styled.div`
  border: solid 1px green;
`;

const StyledCreatePaddlerTitle = styled.h1`
  color: black;
  font-family: Allura;
  font-size: 40px;
`;

export default CreatePaddlerForm;
