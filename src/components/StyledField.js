import styled from "styled-components";

const StyledField = styled.div`
  margin: 20px 0;
  display: grid;
  grid-template-rows: min-content min-content;
  justify-items: start;

  input[type="text"] {
    border: black solid 1px;
    font-size: 1rem;
    height: 1.5em;
    border-radius: 2px;
    width: 100%;
  }

  label {
    font-size: 0.85rem;
    margin-bottom: 3px;   
  }
`;

export default StyledField;