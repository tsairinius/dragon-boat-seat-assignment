//@todo: When someone is moved from the roster to boat, we should shift any subsequent paddlers over
//@todo: Create a reset_all_active_persons function when we want to make sure that nobody is active 

const NUM_BOAT_SEATS = 20;

const roster = document.getElementById("roster");
const boat = document.getElementById("boat");

// List of Paddler objects
let paddlerList = [];

/**
*  Paddler class: The paddler class is used to better manage different paddlers' positions either in the roster 
*  or boat. Each paddler object has a corresponding div element, which we can easily manipulate. 
*/
class Paddler {
	constructor(name) {
		// Create a div element to visually represent the paddler 
		this.paddlerElement = document.createElement("div");
		this.paddlerElement.setAttribute("class", "person");
		this.name = name
		/**
		######## ED TODO: Name placement ###################
		// this.paddlerName = document.createElement('p');
		// this.paddlerName.setAttribute("class","profile_name")
		// this.paddlerName.innerHTML = name;
		// this.paddlerElement.appendChild(this.paddlerName);
		**/
		this.paddlerElement.innerHTML = name;
		roster.appendChild(this.paddlerElement);

		// Assign ID's to the paddler as well as its corresponding div element
		this.id = paddlerList.length;
		this.paddlerElement.setAttribute("id", this.id);
		this.paddlerElement.setAttribute("name", name);


		/* Ed: I think I will disable this function since css itself can arrange all
		person automatically*/
		// this.setPaddlerPositionInRoster()
	}	

	/**
	* Set paddler ID manually
	**/
	setPaddlerID(id){
		this.id = id;
		this.paddlerElement.setAttribute("id", id);

	}

	/**
	*  Finds the next available spot in the roster and moves the paddler to that spot
	*/
	setPaddlerPositionInRoster() {
		let numPeopleInRoster = roster.getElementsByClassName("person").length;
		let top = Math.ceil(numPeopleInRoster/4)*50;
		let left = numPeopleInRoster*50;
		this.paddlerElement.style.top = top+"px";
		this.paddlerElement.style.left = left+"px";
	}

	/**
	*   Sets the paddler as the active person. The active person is the one selected by the user to move to the boat.
	*/
	setActivePerson() {
		this.paddlerElement.className = "active person";
	}

	/**
	*  Sets the paddler as just a person and not the active person 
	*/
	resetActivePerson() {
		this.paddlerElement.className = "person";
	}

	/**
	*  Moves the paddler to the specified seat position on the boat.
	*  @param {seatPosition} The seat position to move the paddler to
	*/
	moveToBoat(seatPosition) {
		this.paddlerElement.style.position =  "absolute"; /* fix person position*/
		this.paddlerElement.style.top = seatPosition.top+"px";
		this.paddlerElement.style.left = seatPosition.left+"px";
	}
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
		if (target.parentNode.id === "roster") {
			let paddler = findPaddlerById(target.id);
			const name = target.getAttribute('name');
			paddler.setActivePerson();	
		}
		// Move person from boat back to roster 
		else if (target.parentNode.id === "boat") {
			// roster.appendChild(target);   // Ed: Moved this function into movePersonToRoster!
			movePersonToRoster(target.id);	
		}
	}
	// Move selected person to a seat on boat
	else if (target.className === "seat") {
		let activePerson = getActivePerson();
		if (activePerson !== null) {
			boat.appendChild(activePerson);
			seatPosition = getSeatPosition(target);
			moveActivePersonToBoat(seatPosition, activePerson);
		}
	}
}

/**
*  Moves the paddler with specified ID to the roster.
*  @param {Number} id The ID of the paddler to move 
*/
function movePersonToRoster(id) {
	/**
	Ed:
	Instead of changing the position of the person instance,
	I think it is better to delete the old one in boat and 
	create a new instance in roster
	**/
	// #############################################
	var target = document.getElementById(id);
	const name = target.getAttribute('name');

	// remove html element of target id from boat div
	boat.removeChild(target);

	// create new paddler instance and update the
	// paddlerList
	let new_target = new Paddler(name)
	new_target.setPaddlerID(id)
	paddlerList[id] = new_target;
	// ##############################################

	// let paddler = findPaddlerById(activePerson.id);
	// paddler.moveToBoat(seatPosition);
	// paddler.resetActivePerson();
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
	seatRect = seat.getBoundingClientRect();
	boatRect = boat.getBoundingClientRect();

	// Get seat position relative to boat container
	seatTop = seatRect.top - boatRect.top - 1;
	seatLeft = seatRect.left - boatRect.left -1;

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
	drummerElement = document.createElement("div");
	drummerElement.setAttribute("class", "seat");
	boat.appendChild(drummerElement);
	drummerElement.style.top = "10px";
	drummerElement.style.left = "125px";
}

/**
*  Create element for steering position
*/
function createSteeringElement() {
	steeringElement = document.createElement("div");
	steeringElement.setAttribute("class", "seat");
	boat.appendChild(steeringElement);
	steeringElement.style.top = "580px";
	steeringElement.style.left = "125px";
}

function main() {
	createSeatsInBoat();
	document.addEventListener("click", handleClick);

	paddlerList.push(new Paddler("eric"));
	paddlerList.push(new Paddler("edgar"));
	paddlerList.push(new Paddler("emily"));
	paddlerList.push(new Paddler("eric"));
	paddlerList.push(new Paddler("edgar"));
	paddlerList.push(new Paddler("emily"));
	paddlerList.push(new Paddler("eric"));
	paddlerList.push(new Paddler("edgar"));
	paddlerList.push(new Paddler("emily"));
	paddlerList.push(new Paddler("eric"));
	paddlerList.push(new Paddler("edgar"));
	paddlerList.push(new Paddler("emily"));
	paddlerList.push(new Paddler("eric"));
	paddlerList.push(new Paddler("edgar"));
	paddlerList.push(new Paddler("emily"));
}

main();





