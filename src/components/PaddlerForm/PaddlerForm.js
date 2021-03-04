import React from "react";
import PropTypes from "prop-types";
import usePaddlerForm from "./usePaddlerForm";
import styled from "styled-components";
import { StyledButton } from "../StyledButton";

function PaddlerForm({onSubmit, paddler}) {
  const {
    paddlerName,
    paddlerGender,
    paddlerWeight,
    handleNameChange,
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
        <label htmlFor="paddlerName">
          Name
        </label>
        <StyledInput
          type="text"
          name="paddlerName"
          id="paddlerName"
          placeholder="e.g. Ed Cheung"
          value={paddlerName}
          onChange={handleNameChange}
          required
        />
      </StyledField>
      <StyledField>
        Gender
          <StyledGenderButtons>
            <label>
              Male
              <input
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
              <input
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
              <input
                type="radio"
                name="paddlerGender"
                value="Other"
                checked={paddlerGender === "Other"}
                onChange={handleGenderChange}
                required
              />
            </label>
          </StyledGenderButtons>
      </StyledField>
      <StyledField>
        <label htmlFor="paddlerWeight">
          Weight(lb)
        </label>
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
  width: 65%;
  margin: 0 auto;
  font-family: Roboto, Arial, Helvetica, sans-serif;
  font-size: 1.2rem;
`;

const StyledField = styled.div`
  display: grid;
  grid-template-columns: 1fr 3fr;
  align-items: center;
  grid-gap: 10px;
  margin: 20px;
`;

const StyledGenderButtons = styled.span`
  display: flex;
  justify-content: space-between;
`;

const StyledInput = styled.input`
  background: rgb(240, 240, 240);
  border: rgb(0, 126, 165) solid 1px;
  font-size: 1.2rem;
  height: 1.5em;
  border-radius: 2px;
`;

export default PaddlerForm;
