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

  return {
    paddlersInBoat,
    paddlersOnRoster,
    paddlerPreview,
    paddlerFullView,
  };
}

export default useApp;
