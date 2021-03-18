import { useState } from "react";

function usePaddlerForm(
  onSubmit,
  paddler = { firstName: "", lastName: "", gender: "", weight: "" }
) {
  const [paddlerFirstName, setPaddlerFirstName] = useState(paddler.firstName);
  const [paddlerLastName, setPaddlerLastName] = useState(paddler.lastName);
  const [paddlerGender, setPaddlerGender] = useState(paddler.gender);
  const [paddlerWeight, setPaddlerWeight] = useState(paddler.weight);

  const handleFirstNameChange = (event) => setPaddlerFirstName(event.target.value);
  const handleLastNameChange = (event) => setPaddlerLastName(event.target.value);
  const handleGenderChange = (event) => setPaddlerGender(event.target.value);
  const handleWeightChange = (event) => setPaddlerWeight(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    const paddlerProfile = {
      firstName: paddlerFirstName,
      lastName: paddlerLastName,
      gender: paddlerGender,
      weight: paddlerWeight,
    };

    onSubmit(paddlerProfile);
    handleReset();
  };

  const handleReset = () => {
    setPaddlerFirstName("");
    setPaddlerLastName("");
    setPaddlerGender("");
    setPaddlerWeight("");
  };

  return {
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
  };
}

export default usePaddlerForm;
