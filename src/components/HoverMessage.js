import React from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

const HoverMessage = ({text, className}) => {
    const stringMaxLength = 8;

    return (
        <StyledHoverMessage className={className ? className : null}>
            {text.map(item => 
                <p key={uuidv4()}>
                    {item.length > stringMaxLength ? 
                        `${item.slice(0, stringMaxLength)}...`
                        :
                        item
                    }
                </p>
            )}
        </StyledHoverMessage>
    )
}

const StyledHoverMessage = styled.div`
    display: none;
    position: absolute;
    transform: translateY(-110%);
    background: white;
    color: black;
    padding: 0.3em;
    font-size: 0.8rem;
    border-radius: 3px;
    white-space: nowrap;
    z-index: 1;

    p {
        margin: 0;
        float: left;

        &:first-child, &:nth-child(2) {
            font-weight: bold;
        }
    }

    &::after {
        content: "";
        position: absolute;
        top: 100%;
        left: 10%;
        border-color: white transparent transparent transparent;
        border-style: solid;
        border-width: 5px;
    }
`;

export default HoverMessage;