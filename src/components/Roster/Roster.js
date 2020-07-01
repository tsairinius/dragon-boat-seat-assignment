import React from 'react';
import Paddler from '../Paddler/Paddler';
import PropTypes from 'prop-types';

function Roster(props) {

    const paddlerComponents = props.paddlers.map(paddler => <Paddler key={paddler.id} paddlerProfile={paddler} handlePaddlerClick={props.handlePaddlerClick}/>)
    
    return (
        <div>
            <h1 style={{color: 'black', fontFamily: 'Allura', fontSize: '40px'}}>Paddlers</h1>
            {paddlerComponents}
        </div>
    );
};

Roster.propTypes = {
    label: PropTypes.string.isRequired,
    paddlers: PropTypes.array.isRequired,
    handlePaddlerClick: PropTypes.func.isRequired
};


export default Roster;