export const ADD_PADDLER = "ADD_PADDLER";
export const CLICK_PADDLER = "CLICK_PADDLER";
export const HOVER_PADDLER = "HOVER_PADDLER";
export const UNHOVER_PADDLER = "UNHOVER_PADDLER";
export const CLICK_SEAT = "CLICK_SEAT";
export const SUBMIT_EDIT = "SUBMIT_EDIT";
export const DELETE_PADDLER = "DELETE_PADDLER";
export const MOVE_TO_ROSTER = "MOVE_TO_ROSTER";
export const UNSELECT_PADDLERS = "UNSELECT_PADDLERS";

const makeDispatch = (actionType) => {
  return (actionPayload) => {
    return { type: actionType, payload: actionPayload };
  }
}

export const addPaddler = makeDispatch(ADD_PADDLER);
export const clickPaddler = makeDispatch(CLICK_PADDLER);
export const hoverPaddler = makeDispatch(HOVER_PADDLER);
export const unhoverPaddler = makeDispatch(UNHOVER_PADDLER);
export const clickSeat = makeDispatch(CLICK_SEAT);
export const submitEdit = makeDispatch(SUBMIT_EDIT);
export const deletePaddler = makeDispatch(DELETE_PADDLER);
export const moveToRoster = makeDispatch(MOVE_TO_ROSTER);
export const unselectPaddlers = makeDispatch(UNSELECT_PADDLERS);
