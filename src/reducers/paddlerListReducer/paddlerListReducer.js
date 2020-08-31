import { v4 as uuidv4 } from "uuid";
import * as actions from "./paddlerListActions";

function paddlerListReducer(state, action) {
  const addPaddlerToList = (paddlerProfile) => {
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

  const handlePaddlerClick = (paddlerId) => {
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

  const handlePaddlerMouseEnter = (paddlerId) => {
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

  const handlePaddlerMouseLeave = (paddlerId) => {
    const new_state = state.map((paddler) => {
      if (paddler.id === paddlerId) {
        paddler.isHovered = false;
      }
      return paddler;
    });

    return new_state;
  };

  const assignSelectedPaddlerSeat = (seatId) => {
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

  const handleFullViewEdit = (editedPaddler) => {
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

  const handleMoveToRoster = (paddlerToMove) => {
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

  const isSeatOccupied = (seatId) => {
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
      return addPaddlerToList(action.payload);
    case actions.CLICK_PADDLER:
      return handlePaddlerClick(action.payload);
    case actions.HOVER_PADDLER:
      return handlePaddlerMouseEnter(action.payload);
    case actions.UNHOVER_PADDLER:
      return handlePaddlerMouseLeave(action.payload);
    case actions.CLICK_SEAT:
      return assignSelectedPaddlerSeat(action.payload);
    case actions.SUBMIT_EDIT:
      return handleFullViewEdit(action.payload);
    case actions.DELETE_PADDLER:
      return handleFullViewDelete();
    case actions.MOVE_TO_ROSTER:
      return handleMoveToRoster(action.payload);
    case actions.UNSELECT_PADDLERS:
      return handleFullViewCancel();
    default:
      return state;
  }
}

export default paddlerListReducer;
