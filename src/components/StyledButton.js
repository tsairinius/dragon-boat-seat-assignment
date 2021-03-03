import styled from "styled-components";


export const StyledButton = styled.button`
    background: rgb(255, 133, 133);
    font-size: 1rem;
    font-family: Roboto, Arial, Helvetica, sans-serif;
    padding: 0.5em;
    border: black solid 1px;
    border-radius: 3px; 
    margin: 0.3rem;

    &:hover {
        cursor: pointer;
        filter: brightness(130%);
    }
`;