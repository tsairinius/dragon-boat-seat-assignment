import styled from "styled-components";

const StyledHoverMessage = styled.div`
    display: none;
    position: absolute;
    transform: translateY(-110%);
    background: white;
    color: black;
    padding: 0.3em;
    font-size: 0.8rem;
    border-radius: 3px;
    border: 1px solid black;
    white-space: nowrap;
    z-index: 1;

    p {
        margin: 0;
        float: left;
    }
`;

export default StyledHoverMessage;