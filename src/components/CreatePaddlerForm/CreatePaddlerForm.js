import React, { useContext } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import PaddlerForm from "../PaddlerForm/PaddlerForm";
import paddlerListContext from "../../paddlerListContext";
import { addPaddler } from "../../reducers/paddlerListReducer/paddlerListActions";

function CreatePaddlerForm() {
  const { dispatch } = useContext(paddlerListContext);

  const handleSubmit = (paddlerProfile) => {
    dispatch(addPaddler(paddlerProfile));

    triggerPaddlerCreatedMessage();
  };

  const triggerPaddlerCreatedMessage = () => {
    const paddlerCreatedMessage = document.querySelector(".message-paddler-created");

    paddlerCreatedMessage.className = "message-paddler-created";

    setTimeout(() => {
      paddlerCreatedMessage.className = "message-paddler-created message-show";
    }, 50);
  };

  return (
    <StyledCreatePaddlerContainer data-testid="createPaddlerForm">
      <h1>Create a Paddler</h1>
      <PaddlerForm onSubmit={handleSubmit} />
      <p className="message-paddler-created">Paddler added to roster!</p>
    </StyledCreatePaddlerContainer>
  );
}

CreatePaddlerForm.propTypes = {
  label: PropTypes.string,
};

const StyledCreatePaddlerContainer = styled.div`

  .message-paddler-created {
    display: none;
  }

  .message-show {
    display: block;
    animation: 2s 1s fadeMessage;
    animation-fill-mode: forwards;
  }

  h1 {
    font-family: Allura;
    font-size: 2rem;
  }

  @keyframes fadeMessage {
    0% {
      opacity: 100%;
    }

    100% {
      opacity: 0%;
    }
  }
`;

export default CreatePaddlerForm;
