import React from "react";
import PropTypes from "prop-types";
import usePaddlerForm from "./usePaddlerForm";
import styled from "styled-components";
import { StyledButton } from "../StyledButton";

function PaddlerForm({onSubmit, paddler}) {
  const {
    paddlerFirstName,
    paddlerLastName,
    paddlerGender,
    paddlerWeight,
    handleFirstNameChange,
    handleLastNameChange,
    handleGenderChange,
    handleWeightChange,
    handleSubmit,
    handleReset,
  } = usePaddlerForm(onSubmit, paddler);

  return (
    <StyledForm
      data-testid="paddlerForm"
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      <StyledField>
        <StyledLabel htmlFor="paddlerFirstName">
          First
        </StyledLabel>
        <StyledInput
          type="text"
          name="paddlerFirstName"
          id="paddlerFirstName"
          placeholder="e.g. John"
          value={paddlerFirstName}
          onChange={handleFirstNameChange}
          required
        />
      </StyledField>
      <StyledField>
        <StyledLabel htmlFor="paddlerLastName">
          Last
        </StyledLabel>
        <StyledInput
          type="text"
          name="paddlerLastName"
          id="paddlerLastName"
          placeholder="e.g. Smith"
          value={paddlerLastName}
          onChange={handleLastNameChange}
          required
        />
      </StyledField>
      <StyledField>
          <StyledLabel>
            Gender
          </StyledLabel>
          <div>
            <label>
              Male
              <StyledGenderButton
                type="radio"
                name="paddlerGender"
                value="Male"
                checked={paddlerGender === "Male"}
                onChange={handleGenderChange}
                required
              />
            </label>
            <label>
              Female
              <StyledGenderButton
                type="radio"
                name="paddlerGender"
                value="Female"
                checked={paddlerGender === "Female"}
                onChange={handleGenderChange}
                required
              />
            </label>
            <label>
              Other
              <StyledGenderButton
                type="radio"
                name="paddlerGender"
                value="Other"
                checked={paddlerGender === "Other"}
                onChange={handleGenderChange}
                required
              />
            </label>
          </div>
      </StyledField>
      <StyledField>
        <StyledLabel htmlFor="paddlerWeight">
          Weight(lb)
        </StyledLabel>
        <StyledInput
          type="number"
          name="paddlerWeight"
          id="paddlerWeight"
          min="1"
          placeholder="e.g. 150"
          value={paddlerWeight}
          onChange={handleWeightChange}
          required
        />
      </StyledField>
      <StyledButton type="reset">Reset</StyledButton>
      <StyledButton type="submit">Submit</StyledButton>
    </StyledForm>
  );
}

PaddlerForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  paddler: PropTypes.object
};

const StyledForm = styled.form`
  width: 90%;
  margin: 0 auto;
  font-family: Roboto, Arial, Helvetica, sans-serif;
  font-size: 1rem;

  @media (min-width: 425px) {
    width: 65%;
  }
`;

const StyledLabel = styled.label`
  font-size: 0.85rem;
  margin-bottom: 3px;
`;

const StyledField = styled.div`
  margin: 20px 0;
  display: grid;
  grid-template-rows: min-content min-content;
  justify-items: start;
`;

const StyledGenderButton = styled.input`
  @media (min-width: 425px) {
    margin-right: 20px;
  }
`;

const StyledInput = styled.input`
  background: rgb(240, 240, 240);
  border: rgb(0, 126, 165) solid 1px;
  font-size: 1rem;
  height: 1.5em;
  border-radius: 2px;
  width: 100%;
`;

export default PaddlerForm;
