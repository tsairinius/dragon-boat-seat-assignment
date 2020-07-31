import Paddler from "./paddler.js";

const NUM_BOAT_SEATS = 20;

const boat = document.getElementById("boat");

var rosterTab = document.getElementById("rosterTab");
var createPaddlerTab = document.getElementById("createPaddlerTab");
var rosterButton = document.getElementById("rosterButton");
var createPaddlerButton = document.getElementById("createPaddlerButton");

var createPaddlerForm = document.getElementById("createPaddlerForm");
var newPaddlerSuccess = document.getElementById("newPaddlerSuccess");

// List of Paddler objects
// TODO: enforce that paddlerList never contains duplicate ID's
let paddlerList = [];

/**
 * Creates a new paddler based on the info submitted in the "create a new paddler" form
 * @param {event} event Submit event
 */
function createNewPaddler(event) {
  // Prevent page from refreshing after hitting submit
  event.preventDefault();

  var formPaddlerName = document.getElementById("formPaddlerName");
  var formPaddlerWeight = document.getElementById("paddlerWeight");
  var formPaddlerGender = document.getElementsByName("paddlerGender");

  var name = formPaddlerName.value;
  var weight = formPaddlerWeight.value;

  // Retrieve the gender that was selected
  var gender;
  for (let i = 0; i < formPaddlerGender.length; i++) {
    if (formPaddlerGender[i].checked) {
      gender = formPaddlerGender[i].value;
      break;
    }
  }

  paddlerList.push(
    new Paddler(rosterTab, name, gender, weight, paddlerList.length)
  );

  createPaddlerForm.reset();
  newPaddlerSuccess.innerText = "Successfully created a new paddler!";
}

/**
 * Removes any existing messages in the "create a new paddler" form
 * @param {event} event Reset event
 */
function formRemoveMessages(event) {
  newPaddlerSuccess.innerText = "";
}

/**
 * Adds event listeners for switching between tabs. Webpage defaults to showing
 * the roster tab.
 */
function initializeTabContent() {
  rosterButton.addEventListener("click", showRosterTab);
  createPaddlerButton.addEventListener("click", showCreatePaddlerTab);
  showRosterTab();
}

/**
 * Shows the roster tab
 */
function showRosterTab() {
  createPaddlerButton.style.backgroundColor = "";
  createPaddlerButton.style.color = "";
  rosterButton.style.backgroundColor = "#f44336";
  rosterButton.style.color = "white";

  createPaddlerTab.style.display = "none";
  rosterTab.style.display = "block";
}

/**
 * Shows the tab for creating a new paddler
 */
function showCreatePaddlerTab() {
  rosterButton.style.backgroundColor = "";
  rosterButton.style.color = "";
  createPaddlerButton.style.backgroundColor = "#f44336";
  createPaddlerButton.style.color = "white";

  rosterTab.style.display = "none";
  createPaddlerTab.style.display = "block";
}

/**
 *  Handles logic for when the user clicks in the window
 *  @param {event} event Click event
 */
function handleClick(event) {
  // Retrieve the element that was clicked on
  let target = event.target;
  if (target.className === "person") {
    // Highlight and save the person that was clicked on
    if (target.parentNode.id === "rosterTab") {
      let paddler = findPaddlerById(target.id, paddlerList);
      findAndResetActivePerson();
      paddler.setActivePerson();
    }
    // Move person from boat back to roster
    else if (target.parentNode.id === "boat") {
      movePersonToRoster(target.id);
    }
  }
  // Move selected person to a seat on boat
  else if (target.className === "seat") {
    let activePerson = getActivePerson();
    if (activePerson !== null) {
      boat.appendChild(activePerson);
      let seatPosition = getSeatPosition(boat, target);
      moveActivePersonToBoat(seatPosition, activePerson);
    }
  }
}

/**
 *  Moves the paddler with specified ID to the roster.
 *  @param {Number} id The ID of the paddler to move
 */
function movePersonToRoster(id) {
  let paddler = findPaddlerById(id, paddlerList);
  const gender = paddler.gender;
  const weight = paddler.weight;
  const name = paddler.name;

  deletePersonElementFromBoat(boat, id);

  // Create new paddler instance and update the paddlerList
  let new_target = new Paddler(rosterTab, name, gender, weight, id);

  // TODO: Is this step really necessary?
  paddlerList[id] = new_target;
}

// TODO: Do we really need to distinguish between person and paddler? Is there a difference?
// It might be best to stick to one nomenclature: either person or paddler
export function deletePersonElementFromBoat(boatElement, id) {
  var personElement = document.getElementById(id);
  boatElement.removeChild(personElement);
}

/**
 *  Moves the paddler currently labelled as the "active person" to the specified seat on the boat.
 *  @param {object} seatPosition Seat position to move active person to
 *  @param {div}    activePerson Div element corresponding to the active person to move
 */

//TODO: Consider moving paddler into specified seat element, rather than just the boat element
function moveActivePersonToBoat(seatPosition, activePerson) {
  let paddler = findPaddlerById(activePerson.id, paddlerList);
  paddler.moveToBoat(seatPosition);
  paddler.resetActivePerson();
}

/**
 *	Finds the currently active person (if there is one) and resets it to no longer be active
 */
function findAndResetActivePerson() {
  let activePerson = getActivePerson();

  if (activePerson !== null) {
    let paddler = findPaddlerById(activePerson.id, paddlerList);
    paddler.resetActivePerson();
  }
}

/**
 *  Gets the person element that is currently active (ie. the selected person from the roster to be placed in the boat)
 *  Enforces that there is either only one active person or none at all.
 *  @return {div}	Returns a div element of class person if an active person was found. Returns null otherwise.
 */
export function getActivePerson() {
  // TODO: How can we avoid returning null if there is no active person?
  // Can we keep track of the active person using a variable instead of creating an attribute for it?
  let activePeople = document.getElementsByClassName("active");
  let numActive = activePeople.length;
  console.assert(
    numActive === 1 || numActive === 0,
    "There should only be one active person at a time. Otherwise, there are no active people"
  );

  let activePerson = null;
  if (numActive === 1) {
    activePerson = activePeople[0];
  }

  return activePerson;
}

/**
 *  Searches the list of paddlers for a paddler with the given ID.
 *  @param  {Number}  id 			The ID of the paddler to retrieve
 *  @param  {Array}	 paddlerList	List of all paddlers
 *  @return {Paddler}   				Returns the paddler with the specified ID.
 */
export function findPaddlerById(id, paddlerList) {
  let paddler = null;
  for (let i = 0; i < paddlerList.length; i++) {
    if (paddlerList[i].id == id) {
      paddler = paddlerList[i];
    }
  }

  console.assert(paddler !== null, "Could not find paddler with id %d", id);

  return paddler;
}

/**
 *  Provides the top and left positions of the specified seat element
 *  @param {div}     seat The seat element of interest
 *  @return {object}      Top and left positions of seat
 */
function getSeatPosition(boatElement, seat) {
  let seatRect = seat.getBoundingClientRect();
  let boatRect = boatElement.getBoundingClientRect();

  // Get seat position relative to boat container
  let seatTop = seatRect.top - boatRect.top - 1;
  let seatLeft = seatRect.left - boatRect.left - 1;

  return {
    top: seatTop,
    left: seatLeft,
  };
}

/**
 *  Creates the seat elements in the boat
 */
function createSeatsInBoat(boatElement) {
  createPaddlerSeatElements(boatElement);
  createDrummerSeatElement(boatElement);
  createSteeringSeatElement(boatElement);
}

// TODO: Should I give paddler seat elements their own specific id?
export function createPaddlerSeatElements(boatElement) {
  for (let seatIdx = 0; seatIdx < NUM_BOAT_SEATS; seatIdx++) {
    createOnePaddlerSeatElement(boatElement, seatIdx);
  }
}

export function createOnePaddlerSeatElement(boatElement, seatIdx) {
  let seatPosition = determinePaddlerSeatPosition(seatIdx);
  createSeatElementAtPosition(boatElement, seatPosition.top, seatPosition.left);
}

export function determinePaddlerSeatPosition(seatIdx) {
  let seatPosition = {};
  let leftCol = "100px";
  let rightCol = "150px";
  let topPos = 0;
  let leftPos = "";
  let spacing = 50;
  let seatingOffset = 70;
  let numSeatsPerColumn = NUM_BOAT_SEATS / 2;

  if (seatIdx < numSeatsPerColumn) {
    topPos = seatIdx * spacing + seatingOffset;
    leftPos = leftCol;
  } else {
    topPos = (seatIdx - numSeatsPerColumn) * spacing + seatingOffset;
    leftPos = rightCol;
  }

  seatPosition = {
    top: topPos + "px",
    left: leftPos,
  };

  return seatPosition;
}

/**
 *  Create element for drummer's seat.
 */
export function createDrummerSeatElement(boatElement) {
  let top = "10px";
  let left = "125px";
  createSeatElementAtPosition(boatElement, top, left);
}

/**
 *  Create element for steering position
 */
export function createSteeringSeatElement(boatElement) {
  let top = "580px";
  let left = "125px";
  createSeatElementAtPosition(boatElement, top, left);
}

export function createSeatElementAtPosition(boatElement, top, left) {
  let seatElement = document.createElement("div");

  seatElement.setAttribute("class", "seat");
  boatElement.appendChild(seatElement);

  seatElement.style.top = top;
  seatElement.style.left = left;
}

function main() {
  createSeatsInBoat(boat);
  initializeTabContent();
  document.addEventListener("click", handleClick);
  createPaddlerForm.addEventListener("submit", createNewPaddler);
  createPaddlerForm.addEventListener("reset", formRemoveMessages);
}

main();
