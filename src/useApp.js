import { useState } from "react";

function useApp() {
  const [paddlerList, updateList] = useState([]);

  const paddlersOnRoster = paddlerList.filter(
    (paddler) => paddler.inBoat === false
  );
  const paddlersInBoat = paddlerList.filter(
    (paddler) => paddler.inBoat === true
  );

  const addPaddlerToList = (paddlerProfile) => {
    updateList(() => [...paddlerList, paddlerProfile]);
  };

  const handlePaddlerClick = (paddlerId) => {
    updateList(
      paddlerList.map((paddler) => {
        if (paddler.inBoat === false) {
          if (paddler.isActive) {
            paddler.isActive = false;
          }
          if (paddler.id === paddlerId) {
            paddler.isActive = true;
          }
        } else {
          if (paddler.id === paddlerId) {
            movePaddlerFromBoatToRoster(paddler);
          }
        }
        return paddler;
      })
    );
  };

  const movePaddlerFromBoatToRoster = (paddler) => {
    paddler.inBoat = false;
    paddler.isHovered = false;
    paddler.seatId = "";
  };

  const handlePaddlerMouseEnter = (paddlerId) => {
    updateList(
      paddlerList.map((paddler) => {
        if (paddler.id !== paddlerId) {
          if (paddler.isHovered === true) {
            paddler.isHovered = false;
          }
        } else {
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

  const assignActivePaddlerSeat = (seatId) => {
    updateList(
      paddlerList.map((paddler) => {
        if (paddler.isActive === true) {
          paddler.seatId = seatId;
          paddler.inBoat = true;
          paddler.isActive = false;
        }
        return paddler;
      })
    );
  };

  const paddlerToView = paddlerList.find(
    (paddler) => paddler.isHovered === true
  );

  return {
    paddlersInBoat,
    paddlersOnRoster,
    paddlerToView,
    handlePaddlerClick,
    handlePaddlerMouseEnter,
    handlePaddlerMouseLeave,
    assignActivePaddlerSeat,
    addPaddlerToList,
  };
}

export default useApp;
