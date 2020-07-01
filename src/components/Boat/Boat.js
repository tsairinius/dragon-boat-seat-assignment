import React from "react";
import Seat from "../Seat/Seat";
import PropTypes from "prop-types";

function Boat(props) {

    const createSeatComponents = () => {
        const numSeats = 22;
        var seatComponents = [];
        for (var i = 0; i < numSeats; i++) {
           seatComponents = [...seatComponents, <Seat key={i} id={i} paddlersInBoat={props.paddlersInBoat} handleSeatClick={props.handleSeatClick} handlePaddlerClick={props.handlePaddlerClick}/>]
        }
        return seatComponents;
    };

    const style = {
        float: 'left',
        width: '45%',
        height: '100%',
        marginRight: ': 1%',
        position: 'relative'
    };

    return (
        <div style={style}>
            <h1 style={{color: 'black', fontFamily: 'Allura', fontSize: '40px', textAlign: 'center'}}>Boat</h1>
            <div style={{display: 'grid', gridTemplateColumns: '50px 50px', width: '100px', height: '500px', margin: '0 auto'}}>
                {createSeatComponents()}
            </div>
            
        </div>
    );
}

Boat.propTypes = {
    paddlersInBoat: PropTypes.array.isRequired,
    handleSeatClick: PropTypes.func.isRequired,
    handlePaddlerClick: PropTypes.func.isRequired
};

export default Boat;


