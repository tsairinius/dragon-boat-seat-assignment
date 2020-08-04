import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function useCreatePaddlerForm(addPaddler) {
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

    addPaddler(paddlerProfile);

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

export default useCreatePaddlerForm;
