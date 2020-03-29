// export default Paddler;
/**
*  Paddler class: The paddler class is used to better manage different paddlers' positions either in the roster 
*  or boat. Each paddler object has a corresponding div element, which we can easily manipulate. 
*/
export default class Paddler {
	constructor(name, paddler_id) {
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
		this.id = paddler_id;
		this.paddlerElement.setAttribute("id", this.id);
		this.paddlerElement.setAttribute("name", name);
	}	

	/**
	* Set paddler ID manually
	**/
	setPaddlerID(id){
		this.id = id;
		this.paddlerElement.setAttribute("id", id);

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