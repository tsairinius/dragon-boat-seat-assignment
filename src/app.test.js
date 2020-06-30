import { createSteeringSeatElement, createDrummerSeatElement, createSeatElementAtPosition, determinePaddlerSeatPosition,
          createPaddlerSeatElements, createOnePaddlerSeatElement, findPaddlerById, getActivePerson, deletePersonElementFromBoat } from './app.js'
import Paddler from './paddler.js'

test('check that specified person is deleted boat element', () => {
  document.body.innerHTML =
  '<div class="columnLeft" id="boat">' +
  '<h1 class="curlyFont">Boat</h1>' +
  '<div class="person" id="4" name="Eric" style="position: absolute; top: 69px; left: 99px;">' +
  'Eric' +
  '</div>' +
  '</div>';

  const boatElement = document.getElementById("boat");
  const personId = 4;
  deletePersonElementFromBoat(boatElement, personId);

  expect(boatElement.innerHTML).toBe('<h1 class="curlyFont">Boat</h1>');
})

test('check that returned person has active attribute', () => {
  document.body.innerHTML = 
    '<div class="tab" id="rosterTab">' +
    '<h1 class="curlyFont">Paddlers</h1>' +
    '</div>';

  let rosterTab = document.getElementById("rosterTab");

  const paddlerId = 12;
  const weight = 100;
  const name = "Eric";
  const gender = "male";

  let paddler = new Paddler(rosterTab, name, gender, weight, paddlerId);
  paddler.setActivePerson();

  let activePerson = getActivePerson();

  expect(activePerson.getAttribute("class")).toBe("active person");


});

test('check that null is returned since there is no active person', () => {
  document.body.innerHTML = 
    '<div class="tab" id="rosterTab">' +
    '<h1 class="curlyFont">Paddlers</h1>' +
    '</div>';

  let rosterTab = document.getElementById("rosterTab");

  const paddlerId = 12;
  const weight = 100;
  const name = "Eric";
  const gender = "male";

  let paddler = new Paddler(rosterTab, name, gender, weight, paddlerId);

  let activePerson = getActivePerson();

  expect(activePerson).toBe(null);

});

test('check that assert is called when there is an invalid number of active people', () => {
  document.body.innerHTML = 
    '<div class="tab" id="rosterTab">' +
    '<h1 class="curlyFont">Paddlers</h1>' +
    '</div>';

  let rosterTab = document.getElementById("rosterTab");

  let firstPaddler = new Paddler(rosterTab, "Eric", "male", 100, 12);
  let secondPaddler = new Paddler(rosterTab,"Julie", "female", 250, 5);

  firstPaddler.setActivePerson();
  secondPaddler.setActivePerson();

  spyOn(console, 'assert');
  getActivePerson();
  expect(console.assert).toHaveBeenCalledWith(false, "There should only be one active person at a time. Otherwise, there are no active people");

});

test('check that correct paddler is found from list of paddlers', () => {
  document.body.innerHTML = 
    '<div class="tab" id="rosterTab">' +
    '<h1 class="curlyFont">Paddlers</h1>' +
    '</div>';

  let rosterTab = document.getElementById("rosterTab");

  const paddlerId = 12;
  const weight = 100;
  const name = "Eric";
  const gender = "male";

  let paddler = new Paddler(rosterTab, name, gender, weight, paddlerId);
  let paddlerList = [ paddler ];

  let returnedPaddler = findPaddlerById(paddlerId, paddlerList);

  expect(returnedPaddler).toBe(paddler);

});

test('check that assert is called when specified paddler is not found from list of paddlers', () => {
  document.body.innerHTML = 
    '<div class="tab" id="rosterTab">' +
    '<h1 class="curlyFont">Paddlers</h1>' +
    '</div>';

  let rosterTab = document.getElementById("rosterTab");

  const paddlerId = 12;
  const weight = 100;
  const name = "Eric";
  const gender = "male";

  let paddlerInList= new Paddler(rosterTab, name, gender, weight, paddlerId);
  let paddlerList = [ paddlerInList ];

  const falsePaddlerId = 5;

  spyOn(console, 'assert');
  findPaddlerById(falsePaddlerId, paddlerList);
  expect(console.assert).toHaveBeenCalledWith(false, "Could not find paddler with id %d", falsePaddlerId);

});

  
// test('checks that the correct pixel coordinates of a seat element are returned', () => {
//   document.body.innerHTML = 
//     '<div class="columnLeft" id="boat">' +
//     'h1 class="curlyFont">Boat</h1>' +
//     '</div>';
  
//   const boatElement = document.getElementById("boat");
//   const top = "65px";
//   const left = "34px";
//   createSeatElementAtPosition(boatElement, top, left);

//   const seatElement = boatElement.getElementsByClassName("seat")[0];

//   let returnedSeatPosition = getSeatPosition(boatElement, seatElement);

//   expect(returnedSeatPosition).toStrictEqual("{ top: 65px, left: 34px }");

// });

test('checks for twenty seat elements in boat', () => {
  document.body.innerHTML =
    '<div class="columnLeft" id="boat">' +
    '<h1 class="curlyFont">Boat</h1>' +
    '</div>';

  const boatElement = document.getElementById("boat");
  createPaddlerSeatElements(boatElement);
  expect(document.querySelectorAll('#boat .seat').length).toBe(20);

});

test('checks for one paddler seat element in boat', () => {
  document.body.innerHTML =
    '<div class="columnLeft" id="boat">' +
    '<h1 class="curlyFont">Boat</h1>' +
    '</div>';

    let seatIdx = 1; 
    const boatElement = document.getElementById("boat");

  createOnePaddlerSeatElement(boatElement, seatIdx);
  expect(boatElement.innerHTML).
    toBe('<h1 class="curlyFont">Boat</h1>' + '<div class="seat" style="top: 120px; left: 100px;"></div>');

});

test('checks for steering element in boat', () => {
  document.body.innerHTML =
    '<div class="columnLeft" id="boat">' +
    '<h1 class="curlyFont">Boat</h1>' +
    '</div>';

  const boatElement = document.getElementById("boat");

  createSteeringSeatElement(boatElement);
  expect(boatElement.innerHTML).
    toBe('<h1 class="curlyFont">Boat</h1>' + '<div class="seat" style="top: 580px; left: 125px;"></div>');
  
});

test('checks for drummer element in boat', () => {
  document.body.innerHTML =
    '<div class="columnLeft" id="boat">' +
    '<h1 class="curlyFont">Boat</h1>' +
    '</div>';

  const boatElement = document.getElementById("boat");

  createDrummerSeatElement(boatElement);
  expect(boatElement.innerHTML).
    toBe('<h1 class="curlyFont">Boat</h1>' + '<div class="seat" style="top: 10px; left: 125px;"></div>');
  
});

test('checks for seat element in boat at specified pixel coordinate', () => {
  document.body.innerHTML =
    '<div class="columnLeft" id="boat">' +
    '<h1 class="curlyFont">Boat</h1>' +
    '</div>';

  const boatElement = document.getElementById("boat");

  let top = "1000px";
  let left = "450px";
  createSeatElementAtPosition(boatElement, top, left);
  expect(boatElement.innerHTML).
    toBe('<h1 class="curlyFont">Boat</h1>' + '<div class="seat" style="top: 1000px; left: 450px;"></div>');
  
});

test('checks for correct pixel position given for paddler seat in left column, second row', () => {
  let seatIdx = 1;
  let seatPosition = determinePaddlerSeatPosition(seatIdx);

  expect(seatPosition).toStrictEqual({top: "120px", left: "100px"});
});

test('checks for correct pixel position given for paddler seat in right column, first row', () => {
  let seatIdx = 10;
  let seatPosition = determinePaddlerSeatPosition(seatIdx);

  expect(seatPosition).toStrictEqual({top: "70px", left: "150px"});
});