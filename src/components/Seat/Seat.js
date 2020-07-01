import React from "react";
import Paddler from "../Paddler/Paddler";
import PropTypes from 'prop-types';

function Seat(props) {

    var style = {            
        width: '50px',
        height: '50px',
        border: '1px solid #000',
        margin: '0 auto'
    };

    if (props.id === 0) {
        style = {
            ...style,
            gridColumnStart: '1',
            gridColumnEnd: '3'
        };
    }
    else if (props.id === 21) {
        style = {
            ...style,
            gridColumnStart: '1',
            gridColumnEnd: '3',
            gridRowStart: '22',
            gridRowEnd: '23',
        };
    }

    const paddler = props.paddlersInBoat.filter(paddler => paddler.seatId === props.id);
    console.assert(paddler.length <= 1, "There should only be at most one paddler assigned to this seat.");
    const paddlerComponent = paddler.length ? <Paddler paddlerProfile={paddler[0]} handlePaddlerClick={props.handlePaddlerClick}/> : undefined;

    return(
        <div style={style} onClick={() => props.handleSeatClick(props.id)}>
            {paddlerComponent}
        </div>
    )
};

Seat.propTypes = {
    id: PropTypes.number.isRequired,
    paddlersInBoat: PropTypes.array.isRequired,
    handleSeatClick: PropTypes.func.isRequired,
    handlePaddlerClick: PropTypes.func.isRequired
};

export default Seat;