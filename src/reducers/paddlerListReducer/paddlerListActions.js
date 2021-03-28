export const ADD_PADDLER = "ADD_PADDLER";
export const CLICK_PADDLER = "CLICK_PADDLER";
export const HOVER_PADDLER = "HOVER_PADDLER";
export const UNHOVER_PADDLER = "UNHOVER_PADDLER";
export const CLICK_SEAT = "CLICK_SEAT";
export const SUBMIT_EDIT = "SUBMIT_EDIT";
export const DELETE_PADDLER = "DELETE_PADDLER";
export const MOVE_TO_ROSTER = "MOVE_TO_ROSTER";
export const MOVE_TO_BOAT = "MOVE_TO_BOAT";
export const SWITCH_SEATS = "SWITCH_SEATS";
export const UNSELECT_PADDLERS = "UNSELECT_PADDLERS";
export const LOAD_SAVED_ASSIGNMENT = "LOAD_SAVED_ASSIGNMENT";
export const CLEAR_BOAT = "CLEAR_BOAT";

export const addPaddler = (paddlerProfile) => {
  return { type: ADD_PADDLER, payload: paddlerProfile };
};

export const clickPaddler = (paddlerId) => {
  return { type: CLICK_PADDLER, payload: paddlerId };
};

export const hoverPaddler = (paddlerId) => {
  return { type: HOVER_PADDLER, payload: paddlerId };
};

export const unhoverPaddler = (paddlerId) => {
  return { type: UNHOVER_PADDLER, payload: paddlerId };
};

export const clickSeat = (seatId) => {
  return { type: CLICK_SEAT, payload: seatId };
};

export const submitEdit = (paddlerProfile) => {
  return { type: SUBMIT_EDIT, payload: paddlerProfile };
};

export const deletePaddler = () => {
  return { type: DELETE_PADDLER };
};

export const moveToRoster = (paddler) => {
  return { type: MOVE_TO_ROSTER, payload: paddler };
};

export const moveToBoat = () => {
  return { type: MOVE_TO_BOAT };
};

export const switchSeats = () => {
  return { type: SWITCH_SEATS };
}

export const unselectPaddlers = () => {
  return { type: UNSELECT_PADDLERS };
};

export const loadSavedAssignment = (assignment) => {
  return { type: LOAD_SAVED_ASSIGNMENT, payload: assignment };
};

export const clearBoat = () => {
  return { type: CLEAR_BOAT }
};
