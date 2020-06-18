import { createSteeringSeatElement, createDrummerSeatElement, createSeatElementAtPosition, determinePaddlerSeatPosition,
          createPaddlerSeatElements, createOnePaddlerSeatElement } from './app.js'
  
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