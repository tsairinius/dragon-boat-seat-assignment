import React from 'react';
import Paddler from '../Paddler/Paddler';
import PropTypes from 'prop-types';

function Roster(props) {

    const paddlerComponents = props.paddlers.map(paddler => <Paddler key={paddler.id} paddlerProfile={paddler} handlePaddlerMouseEnter={props.handlePaddlerMouseEnter} handlePaddlerMouseLeave={props.handlePaddlerMouseLeave} handlePaddlerClick={props.handlePaddlerClick}/>)
    
    return (
        <div data-testid={'roster'}>
            <h1 style={{color: 'black', fontFamily: 'Allura', fontSize: '40px'}}>Paddlers</h1>
            {paddlerComponents}
        </div>
    );
};

Roster.propTypes = {
    label: PropTypes.string.isRequired,
    paddlers: PropTypes.array.isRequired,
    handlePaddlerClick: PropTypes.func.isRequired,
    handlePaddlerMouseEnter: PropTypes.func.isRequired,
    handlePaddlerMouseLeave: PropTypes.func.isRequired
};


export default Roster;