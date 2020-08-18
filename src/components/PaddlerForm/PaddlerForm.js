import React from "react";
import PropTypes from "prop-types";
import usePaddlerForm from "./usePaddlerForm";

function PaddlerForm(props) {
  const {
    paddlerName,
    paddlerGender,
    paddlerWeight,
    handleNameChange,
    handleGenderChange,
    handleWeightChange,
    handleSubmit,
    handleReset,
  } = usePaddlerForm(props.onSubmit, props.paddler);

  return (
    <form
      data-testid="paddlerForm"
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
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
              value="Male"
              checked={paddlerGender === "Male"}
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
              value="Female"
              checked={paddlerGender === "Female"}
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
              value="Other"
              checked={paddlerGender === "Other"}
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
  );
}

PaddlerForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  paddler: PropTypes.object,
};

export default PaddlerForm;
