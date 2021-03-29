import React from "react";
import PropTypes from "prop-types";
import usePaddlerForm from "./usePaddlerForm";
import styled from "styled-components";
import StyledButton from "../StyledButton";
import StyledField from "../StyledField";

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
        <label htmlFor="paddlerFirstName">
          First
        </label>
        <input
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
        <label htmlFor="paddlerLastName">
          Last
        </label>
        <input
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
          <label>
            Gender
          </label>
          <div>
            <label className="gender-label">
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
            <label className="gender-label">
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
            <label className="gender-label">
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
        <label htmlFor="paddlerWeight">
          Weight(lb)
        </label>
        <input
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

  .gender-label {
    font-size: 1rem;
  }
`;

const StyledGenderButton = styled.input`
  @media (min-width: 425px) {
    margin-right: 20px;
  }
`;

export default PaddlerForm;
