import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import PropTypes from "prop-types";

function CreatePaddlerForm(props) {
  const [paddlerName, setPaddlerName] = useState("");
  const [paddlerGender, setPaddlerGender] = useState("");
  const [paddlerWeight, setPaddlerWeight] = useState("");

  const handleNameChange = (event) => setPaddlerName(event.target.value);
  const handleGenderChange = (event) => setPaddlerGender(event.target.value);
  const handleWeightChange = (event) => setPaddlerWeight(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    const paddlerProfile = {
      id: uuidv4(),
      name: paddlerName,
      gender: paddlerGender,
      weight: paddlerWeight,
      inBoat: false,
      seatId: "",
      isActive: false,
      isHovered: false,
    };

    props.addPaddler(paddlerProfile);

    handleReset();
  };

  const handleReset = () => {
    setPaddlerName("");
    setPaddlerGender("");
    setPaddlerWeight("");
  };

  return (
    <div style={{ border: "solid 1px green" }}>
      <h1 style={{ color: "black", fontFamily: "Allura", fontSize: "40px" }}>
        Create a Paddler
      </h1>
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
    </div>
  );
}

CreatePaddlerForm.propTypes = {
  label: PropTypes.string.isRequired,
  addPaddler: PropTypes.func.isRequired,
};

export default CreatePaddlerForm;
