import React from "react";
import styled from "styled-components";

const HoverMessage = ({text, className}) => {
    const stringMaxLength = 8;

    return (
        <StyledHoverMessage className={className ? className : null}>
            {text.map(item => 
                <p key={item}>
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
    border: 1px solid black;
    white-space: nowrap;
    z-index: 1;

    p {
        margin: 0;
        float: left;

        &:first-child, &:nth-child(2) {
            font-weight: bold;
        }
    }
`;

export default HoverMessage;