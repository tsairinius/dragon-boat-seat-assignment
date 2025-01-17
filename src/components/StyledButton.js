import styled from "styled-components";

const StyledButton = styled.button`
    background: rgb(50, 100, 200);
    font-size: 0.8rem;
    font-family: Roboto, Arial, Helvetica, sans-serif;
    color: white;
    padding: 0.5em 1.5em;
    border: black solid 1px;
    border-radius: 1.2em; 
    margin: 0.3rem;

    &:hover {
        cursor: pointer;
        filter: brightness(130%);
    }
`;

export default StyledButton;