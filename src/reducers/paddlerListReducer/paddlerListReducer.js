import { v4 as uuidv4 } from "uuid";
import * as actions from "./paddlerListActions";

function paddlerListReducer(state, action) {
  const addPaddlerToList = () => {
    let paddlerProfile = action.payload;
    paddlerProfile = {
      ...paddlerProfile,
      id: uuidv4(),
      inBoat: false,
      seatId: "",
      isSelected: false,
      isHovered: false,
    };

    return [...state, paddlerProfile];
  };

  const handlePaddlerClick = () => {
    const paddlerId = action.payload;
    let new_state = state;
    if (isPaddlerSelected() === false) {
      new_state = state.map((paddler) => {
        if (paddler.isHovered === true) {
          paddler.isHovered = false;
        }
        if (paddler.id === paddlerId) {
          paddler.isSelected = true;
        }
        return paddler;
      });
    }

    return new_state;
  };

  const handlePaddlerMouseEnter = () => {
    const paddlerId = action.payload;
    const isSelected = isPaddlerSelected();
    const new_state = state.map((paddler) => {
      if (paddler.id !== paddlerId) {
        if (paddler.isHovered === true) {
          paddler.isHovered = false;
        }
      } else if (isSelected === false) {
        paddler.isHovered = true;
      }
      return paddler;
    });

    return new_state;
  };

  const handlePaddlerMouseLeave = () => {
    const paddlerId = action.payload;
    const new_state = state.map((paddler) => {
      if (paddler.id === paddlerId) {
        paddler.isHovered = false;
      }
      return paddler;
    });

    return new_state;
  };

  const assignSelectedPaddlerSeat = () => {
    const seatId = action.payload;
    let new_state = state;
    if (isSeatOccupied(seatId) === false) {
      new_state = state.map((paddler) => {
        if (paddler.isSelected === true) {
          paddler.seatId = seatId;
          paddler.inBoat = true;
          paddler.isSelected = false;
        }
        return paddler;
      });
    }

    return new_state;
  };

  const handleFullViewEdit = () => {
    const editedPaddler = action.payload;
    const new_state = state.map((paddler) => {
      if (paddler.id === editedPaddler.id) {
        paddler = editedPaddler;
        console.assert(
          paddler.isSelected === true,
          "Selected paddler should also be the paddler being edited"
        );
        paddler.isSelected = false;
      }
      return paddler;
    });

    return new_state;
  };

  const handleFullViewDelete = () => {
    return state.filter((paddler) => paddler.isSelected === false);
  };

  const handleMoveToRoster = () => {
    const paddlerToMove = action.payload;
    const new_state = state.map((paddler) => {
      if (paddler.id === paddlerToMove.id) {
        paddler = {
          ...paddler,
          inBoat: false,
          isHovered: false,
          seatId: "",
          isSelected: false,
        };
      }
      return paddler;
    });

    return new_state;
  };

  const handleFullViewCancel = () => {
    const new_state = state.map((paddler) => {
      if (paddler.isSelected === true) {
        paddler.isSelected = false;
      }
      return paddler;
    });
    return new_state;
  };

  const isPaddlerSelected = () => {
    let isSelected = false;
    state.forEach((paddler) => {
      if (paddler.isSelected === true) {
        isSelected = true;
      }
    });
    return isSelected;
  };

  const isSeatOccupied = () => {
    const seatId = action.payload;
    let isOccupied = false;
    state.forEach((paddler) => {
      if (paddler.seatId === seatId) {
        isOccupied = true;
      }
    });
    return isOccupied;
  };

  switch (action.type) {
    case actions.ADD_PADDLER:
      return addPaddlerToList();
    case actions.CLICK_PADDLER:
      return handlePaddlerClick();
    case actions.HOVER_PADDLER:
      return handlePaddlerMouseEnter();
    case actions.UNHOVER_PADDLER:
      return handlePaddlerMouseLeave();
    case actions.CLICK_SEAT:
      return assignSelectedPaddlerSeat();
    case actions.SUBMIT_EDIT:
      return handleFullViewEdit();
    case actions.DELETE_PADDLER:
      return handleFullViewDelete();
    case actions.MOVE_TO_ROSTER:
      return handleMoveToRoster();
    case actions.UNSELECT_PADDLERS:
      return handleFullViewCancel();
    default:
      return state;
  }
}

export default paddlerListReducer;
