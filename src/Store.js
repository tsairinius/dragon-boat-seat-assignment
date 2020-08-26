import React, { useReducer } from "react";
import paddlerListReducer from "./reducers/paddlerListReducer/paddlerListReducer";
import paddlerListContext from "./paddlerListContext";

function Store(props) {
  const initialState = [];
  const [paddlerList, dispatch] = useReducer(paddlerListReducer, initialState);

  return (
    <paddlerListContext.Provider value={{ paddlerList, dispatch }}>
      {props.children}
    </paddlerListContext.Provider>
  );
}

export default Store;
