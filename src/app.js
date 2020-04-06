import Paddler from './paddler.js'

const NUM_BOAT_SEATS = 20;

const boat = document.getElementById("boat");

var rosterTab = document.getElementById("rosterTab");
var createPaddlerTab = document.getElementById("createPaddlerTab");
var rosterButton = document.getElementById("rosterButton");
var createPaddlerButton = document.getElementById("createPaddlerButton");

var createPaddlerForm = document.getElementById("createPaddlerForm");
var newPaddlerSuccess = document.getElementById("newPaddlerSuccess");

// List of Paddler objects
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

	paddlerList.push(new Paddler(name, gender, weight, paddlerList.length));

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
 * Shows the roster tab
 */
function showRosterTab() {
	createPaddlerButton.style.backgroundColor = "";
	createPaddlerButton.style.color = "";
	rosterButton.style.backgroundColor = '#f44336';
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
	createPaddlerButton.style.backgroundColor = '#f44336';
	createPaddlerButton.style.color = "white";

	rosterTab.style.display = "none";
	createPaddlerTab.style.display = "block";
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
*  Handles logic for when the user clicks in the window
*  @param {event} event Click event
*/
function handleClick(event) {
	// Retrieve the element that was clicked on
	let target = event.target;
	if (target.className === "person") {
		// Highlight and save the person that was clicked on
		if (target.parentNode.id === "rosterTab") {
			let paddler = findPaddlerById(target.id);
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
			let seatPosition = getSeatPosition(target);
			moveActivePersonToBoat(seatPosition, activePerson);
		}
	}
}

/**
*  Moves the paddler with specified ID to the roster.
*  @param {Number} id The ID of the paddler to move 
*/
function movePersonToRoster(id) {
	var target = document.getElementById(id);
	const name = target.getAttribute('name');

	// remove html element of target id from boat div
	boat.removeChild(target);

	// create new paddler instance and update the paddlerList
	let new_target = new Paddler(name)
	new_target.setPaddlerID(id)
	paddlerList[id] = new_target;
}

/**
*  Moves the paddler currently labelled as the "active person" to the specified seat on the boat.
*  @param {object} seatPosition Seat position to move active person to
*  @param {div}    activePerson Div element corresponding to the active person to move
*/ 
function moveActivePersonToBoat(seatPosition, activePerson) {
	let paddler = findPaddlerById(activePerson.id);
	paddler.moveToBoat(seatPosition);
	paddler.resetActivePerson();
}

/**
*	Finds the currently active person (if there is one) and resets it to no longer be active
*/
function findAndResetActivePerson() { 
	let activePerson = getActivePerson();

	if (activePerson !== null) {
		let paddler = findPaddlerById(activePerson.id);
		paddler.resetActivePerson();
	}
}

/**
*  Gets the person element that is currently active (ie. the selected person from the roster to be placed in the boat)
*  Enforces that there is either only one active person or none at all. 
*  @return {div}	Returns a div element of class person if an active person was found. Returns null otherwise.  
*/
function getActivePerson() {
	let activePeople = document.getElementsByClassName("active");
	let numActive = activePeople.length;
	console.assert((numActive === 1) | (numActive === 0), "There should only be one active person at a time. Otherwise, there are no active people");

	let activePerson = null;
	if (numActive === 1) {
		activePerson = activePeople[0];
	}

	return activePerson;
}

/**
*  Searches the list of paddlers for a paddler with the given ID. 
*  @param  {Number}  id The ID of the paddler to retrieve   
*  @return {Paddler}    Returns the paddler with the specified ID. 
*/
function findPaddlerById(id) {
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
function getSeatPosition(seat) {
	let seatRect = seat.getBoundingClientRect();
	let boatRect = boat.getBoundingClientRect();

	// Get seat position relative to boat container
	let seatTop = seatRect.top - boatRect.top - 1;
	let seatLeft = seatRect.left - boatRect.left -1;

	return {
		top: seatTop,
		left: seatLeft
	};
}

/**
*  Creates the seat elements in the boat
*/
function createSeatsInBoat() {
	let firstCol = "100px";
	let secondCol = "150px";
	let seatElement = null;
	let topPos = 0;
	for (let seatIdx = 0; seatIdx < NUM_BOAT_SEATS; seatIdx++) {
		seatElement = document.createElement("div");
		seatElement.setAttribute("class", "seat");
		boat.appendChild(seatElement);
		if (seatIdx < NUM_BOAT_SEATS/2) {
			topPos = seatIdx*50 + 70;
			seatElement.style.top = topPos+"px";
			seatElement.style.left = firstCol;
		}
		else {
			topPos = (seatIdx - NUM_BOAT_SEATS/2)*50 + 70;
			seatElement.style.top = topPos+"px";
			seatElement.style.left = secondCol;			
		}
	}

	createDrummerElement();
	createSteeringElement();
}

/**
*  Create element for drummer's seat. 
*/
function createDrummerElement() {
	let drummerElement = document.createElement("div");
	drummerElement.setAttribute("class", "seat");
	boat.appendChild(drummerElement);
	drummerElement.style.top = "10px";
	drummerElement.style.left = "125px";
}

/**
*  Create element for steering position
*/
function createSteeringElement() {
	let steeringElement = document.createElement("div");
	steeringElement.setAttribute("class", "seat");
	boat.appendChild(steeringElement);
	steeringElement.style.top = "580px";
	steeringElement.style.left = "125px";
}

function main() {
	createSeatsInBoat();
	initializeTabContent();
	document.addEventListener("click", handleClick);
	createPaddlerForm.addEventListener("submit", createNewPaddler);
	createPaddlerForm.addEventListener("reset", formRemoveMessages)
}

main();





