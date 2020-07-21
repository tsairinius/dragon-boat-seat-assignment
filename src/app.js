import React, { useState } from 'react';
import Boat from './components/Boat/Boat';
import Roster from './components/Roster/Roster';
import CreatePaddlerForm from './components/CreatePaddlerForm/CreatePaddlerForm';
import Tabs from './components/Tabs/Tabs';
import ProfileViewer from './components/ProfileViewer/ProfileViewer';

function App() {

  const [paddlerList, updateList] = useState([]);

  //TODO: enforce that any active paddler is never in the boat
  const paddlersOnRoster = paddlerList.filter(paddler => paddler.inBoat === false);
  const paddlersInBoat = paddlerList.filter(paddler => paddler.inBoat === true);

  const addPaddlerToList = paddlerProfile => {
    updateList(() => [...paddlerList, paddlerProfile])
  };

  const handlePaddlerClick = paddlerId => {
    updateList(paddlerList.map(paddler => {
      if (paddler.inBoat === false) {
        if (paddler.isActive) {
          paddler.isActive = false;
        }
        if (paddler.id === paddlerId) {
          paddler.isActive = true;
        }
      }
      else {
        if (paddler.id === paddlerId) {
          paddler.inBoat = false;
          paddler.seatId = '';
        }
      }
      return paddler;
    }))
  }

  const assignActivePaddlerSeat = seatId => {
      // Find active paddler and assign it seatId
      updateList(paddlerList.map(paddler => {
          if (paddler.isActive === true) {
            paddler.seatId = seatId;
            paddler.inBoat = true;
            paddler.isActive = false;
          }
          return paddler;
        }
      ))
  };

  const style = {
    ':after': {
      content: '', 
      display: 'table', 
      clear: 'both'
    },
    width: '100%',
    height: '100%'
  };


  return (
    <div style={style}>
      <Boat paddlersInBoat={paddlersInBoat} handleSeatClick={assignActivePaddlerSeat} handlePaddlerClick={handlePaddlerClick}/>
      <div style={{float: 'right', width: '45%', height: '600px', marginLeft: ': 1%',position: 'relative', border: 'solid 1px orange'}}>
        <Tabs>
          <Roster label='Roster' paddlers={paddlersOnRoster} handlePaddlerClick={handlePaddlerClick}/> 
          <CreatePaddlerForm label='+' addPaddler={addPaddlerToList}/> 
        </Tabs>
        <ProfileViewer paddler={paddlersOnRoster.find(paddler => paddler.isActive === true)} />
      </div>
      
    </div>

  );
}

export default App;

