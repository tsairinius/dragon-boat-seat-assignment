import { useState } from "react";

function usePaddlerForm(
  onSubmit,
  paddler = { name: "", gender: "", weight: "" }
) {
  const [paddlerName, setPaddlerName] = useState(paddler.name);
  const [paddlerGender, setPaddlerGender] = useState(paddler.gender);
  const [paddlerWeight, setPaddlerWeight] = useState(paddler.weight);

  const handleNameChange = (event) => setPaddlerName(event.target.value);
  const handleGenderChange = (event) => setPaddlerGender(event.target.value);
  const handleWeightChange = (event) => setPaddlerWeight(event.target.value);

  const handleSubmit = (event) => {
    event.preventDefault();
    const paddlerProfile = {
      name: paddlerName,
      gender: paddlerGender,
      weight: paddlerWeight,
    };

    onSubmit(paddlerProfile);
    handleReset();
  };

  const handleReset = () => {
    setPaddlerName("");
    setPaddlerGender("");
    setPaddlerWeight("");
  };

  return {
    paddlerName,
    paddlerGender,
    paddlerWeight,
    handleNameChange,
    handleGenderChange,
    handleWeightChange,
    handleSubmit,
    handleReset,
  };
}

export default usePaddlerForm;
