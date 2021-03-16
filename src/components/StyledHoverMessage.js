import styled from "styled-components";

const StyledHoverMessage = styled.div`
    display: none;
    position: absolute;
    top: ${props => props.offset}px;
    background: white;
    color: black;
    padding: 0.3em;
    font-size: 0.8rem;
    border-radius: 3px;
    border: 1px solid black;
    white-space: nowrap;
`;

export default StyledHoverMessage;