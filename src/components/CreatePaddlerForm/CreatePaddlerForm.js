import React, { useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import PropTypes from 'prop-types';

function CreatePaddlerForm(props) {

    const [paddlerName, setPaddlerName] = useState("");
    const [paddlerGender, setPaddlerGender] = useState("");
    const [paddlerWeight, setPaddlerWeight] = useState("");

    const handleNameChange = event => setPaddlerName(event.target.value);
    const handleGenderChange = event => setPaddlerGender(event.target.value);
    const handleWeightChange = event => setPaddlerWeight(event.target.value);

   const handleSubmit = event => {
       event.preventDefault();
       const paddlerProfile = {
           id: uuidv4(),
           name: paddlerName, 
           gender: paddlerGender, 
           weight: paddlerWeight, 
           inBoat: false,
           seatId: "",
           isActive: false
        };

       props.addPaddler(paddlerProfile);
   }

   const handleReset = () => {
       setPaddlerName("");
       setPaddlerGender("");
       setPaddlerWeight("");
   };

    return ( 
        <div style={{border: 'solid 1px orange'}}>
            <h1 style={{color: 'black', fontFamily: 'Allura', fontSize: '40px'}}>Create a Paddler</h1>
            <form onSubmit={handleSubmit} onReset={handleReset}>
                <div>
                    <label>Name</label>
                    <input type="text" name="paddlerName" placeholder="e.g. Ed Cheung" value={paddlerName} onChange={handleNameChange} required />
                </div>
                <div>
                    Gender
                    <div>
                        <label>Male</label>
                        <input type="radio" name="paddlerGender" value="male" checked={paddlerGender==="male"} onChange={handleGenderChange} required /> 
                    </div>
                    <div>
                        <label>Female</label>
                        <input type="radio" name="paddlerGender" value="female" checked={paddlerGender==="female"} onChange={handleGenderChange} required />
                    </div>
                    <div>
                        <label>Other</label>
                        <input type="radio" name="paddlerGender" value="other" checked={paddlerGender==="other"} onChange={handleGenderChange}required />
                    </div>
                </div>
                <div>
                    <label>Weight(lb)</label>
                    <input type="number" name="paddlerWeight" min="1" placeholder="e.g. 150" value={paddlerWeight} onChange={handleWeightChange} required />
                </div>
                <button type="reset">Reset</button>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
};

CreatePaddlerForm.propTypes = {
    label: PropTypes.string.isRequired,
    addPaddler: PropTypes.func.isRequired
};

export default CreatePaddlerForm;