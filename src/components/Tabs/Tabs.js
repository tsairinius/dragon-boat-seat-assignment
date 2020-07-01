import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Tabs(props) {
    const [activeTab, setActiveTab] = useState(props.children[0].props.label);

    const handleClick = tab => setActiveTab(tab);

    const style = {
            textAlign: 'center',
            float: 'right',
            width: '45%',
            height: '100%',
            marginLeft: ': 1%',
            position: 'relative'
    };

    return (
        <div style={style}>
            {props.children.map(child => <button key={child.props.label} type="button" onClick={() => handleClick(child.props.label)}>{child.props.label}</button> )}
            {props.children.map(child => child.props.label === activeTab ? child : undefined)}
        </div>
    )
};

Tabs.propTypes = {
    children: PropTypes.any.isRequired
}

export default Tabs;