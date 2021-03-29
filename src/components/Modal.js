import React from "react";
import styled from "styled-components";

const Modal = ({children, dataTestId}) => {
    return (
        <StyledModal data-testid={dataTestId}>
            <div className={"modal-content"}>
                {children}
            </div>
        </StyledModal>
    )
}

const StyledModal = styled.div`
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0, 0, 0, 50%);

    .modal-content {
        text-align: center;
        font-size: 1rem;

        padding: 0.5em;
        max-width: 90%;
        border-radius: 5px;
        background-color: white;
        color: black;
        box-shadow: 2px 2px 3px rgb(68,68,68);
    }
`;

export default Modal;