import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import useCreatePaddlerForm from "./useCreatePaddlerForm";

function CreatePaddlerForm(props) {
  const {
    paddlerName,
    paddlerGender,
    paddlerWeight,
    handleNameChange,
    handleGenderChange,
    handleWeightChange,
    handleSubmit,
    handleReset,
  } = useCreatePaddlerForm(props.addPaddler);

  return (
    <StyledCreatePaddlerForm>
      <StyledCreatePaddlerTitle>Create a Paddler</StyledCreatePaddlerTitle>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div>
          <label>
            Name
            <input
              type="text"
              name="paddlerName"
              placeholder="e.g. Ed Cheung"
              value={paddlerName}
              onChange={handleNameChange}
              required
            />
          </label>
        </div>
        <div>
          Gender
          <div>
            <label>
              Male
              <input
                type="radio"
                name="paddlerGender"
                value="male"
                checked={paddlerGender === "male"}
                onChange={handleGenderChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Female
              <input
                type="radio"
                name="paddlerGender"
                value="female"
                checked={paddlerGender === "female"}
                onChange={handleGenderChange}
                required
              />
            </label>
          </div>
          <div>
            <label>
              Other
              <input
                type="radio"
                name="paddlerGender"
                value="other"
                checked={paddlerGender === "other"}
                onChange={handleGenderChange}
                required
              />
            </label>
          </div>
        </div>
        <div>
          <label>
            Weight(lb)
            <input
              type="number"
              name="paddlerWeight"
              min="1"
              placeholder="e.g. 150"
              value={paddlerWeight}
              onChange={handleWeightChange}
              required
            />
          </label>
        </div>
        <button type="reset">Reset</button>
        <button type="submit">Submit</button>
      </form>
    </StyledCreatePaddlerForm>
  );
}

CreatePaddlerForm.propTypes = {
  label: PropTypes.string.isRequired,
  addPaddler: PropTypes.func.isRequired,
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
