import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

function useApp() {
  const [paddlerList, updateList] = useState([]);

  const paddlersOnRoster = paddlerList.filter(
    (paddler) => paddler.inBoat === false
  );
  const paddlersInBoat = paddlerList.filter(
    (paddler) => paddler.inBoat === true
  );

  const addPaddlerToList = (paddlerProfile) => {
    paddlerProfile = {
      ...paddlerProfile,
      id: uuidv4(),
      inBoat: false,
      seatId: "",
      isSelected: false,
      isHovered: false,
    };
    updateList(() => [...paddlerList, paddlerProfile]);
  };

  const handlePaddlerClick = (paddlerId) => {
    if (isPaddlerSelected() === false) {
      updateList(
        paddlerList.map((paddler) => {
          if (paddler.isHovered === true) {
            paddler.isHovered = false;
          }
          if (paddler.id === paddlerId) {
            paddler.isSelected = true;
          }
          return paddler;
        })
      );
    }
  };

  const handlePaddlerMouseEnter = (paddlerId) => {
    const isSelected = isPaddlerSelected();
    updateList(
      paddlerList.map((paddler) => {
        if (paddler.id !== paddlerId) {
          if (paddler.isHovered === true) {
            paddler.isHovered = false;
          }
        } else if (isSelected === false) {
          paddler.isHovered = true;
        }
        return paddler;
      })
    );
  };

  const handlePaddlerMouseLeave = (paddlerId) => {
    updateList(
      paddlerList.map((paddler) => {
        if (paddler.id === paddlerId) {
          paddler.isHovered = false;
        }
        return paddler;
      })
    );
  };

  const assignSelectedPaddlerSeat = (seatId) => {
    if (isSeatOccupied(seatId) === false) {
      updateList(
        paddlerList.map((paddler) => {
          if (paddler.isSelected === true) {
            paddler.seatId = seatId;
            paddler.inBoat = true;
            paddler.isSelected = false;
          }
          return paddler;
        })
      );
    }
  };

  const isPaddlerSelected = () => {
    let isSelected = false;
    paddlerList.forEach((paddler) => {
      if (paddler.isSelected === true) {
        isSelected = true;
      }
    });
    return isSelected;
  };

  const isSeatOccupied = (seatId) => {
    let isOccupied = false;
    paddlerList.forEach((paddler) => {
      if (paddler.seatId === seatId) {
        isOccupied = true;
      }
    });
    return isOccupied;
  };

  const handleFullViewEdit = (editedPaddler) => {
    updateList(
      paddlerList.map((paddler) => {
        if (paddler.id === editedPaddler.id) {
          paddler = editedPaddler;
          console.assert(
            paddler.isSelected === true,
            "Selected paddler should also be the paddler being edited"
          );
          paddler.isSelected = false;
        }
        return paddler;
      })
    );
  };

  const handleFullViewDelete = () => {
    updateList(paddlerList.filter((paddler) => paddler.isSelected === false));
  };

  const handleMoveToRoster = (paddlerToMove) => {
    updateList(
      paddlerList.map((paddler) => {
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
      })
    );
  };

  const handleFullViewCancel = () => {
    updateList(
      paddlerList.map((paddler) => {
        if (paddler.isSelected === true) {
          paddler.isSelected = false;
        }
        return paddler;
      })
    );
  };

  const paddlerPreview = paddlerList.find(
    (paddler) => paddler.isHovered === true
  );

  const paddlerFullView = paddlerList.find(
    (paddler) => paddler.isSelected === true
  );

  return {
    paddlersInBoat,
    paddlersOnRoster,
    paddlerPreview,
    paddlerFullView,
    handlePaddlerClick,
    handlePaddlerMouseEnter,
    handlePaddlerMouseLeave,
    assignSelectedPaddlerSeat,
    addPaddlerToList,
    handleFullViewEdit,
    handleFullViewDelete,
    handleMoveToRoster,
    handleFullViewCancel,
  };
}

export default useApp;
