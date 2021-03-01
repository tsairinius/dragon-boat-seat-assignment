function useApp(paddlerList) {
  const paddlersOnRoster = paddlerList.filter(
    (paddler) => paddler.inBoat === false
  );
  const paddlersInBoat = paddlerList.filter(
    (paddler) => paddler.inBoat === true
  );

  const paddlerPreview = paddlerList.find(
    (paddler) => paddler.isHovered === true
  );

  const paddlerFullView = paddlerList.find(
    (paddler) => paddler.fullView === true
  );

  const assignSeatMode = (!paddlerFullView && paddlerList.some(paddler => paddler.isSelected));

  return {
    paddlersInBoat,
    paddlersOnRoster,
    paddlerPreview,
    paddlerFullView,
    assignSeatMode
  };
}

export default useApp;
