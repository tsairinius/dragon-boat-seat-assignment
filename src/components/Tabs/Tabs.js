import React, { useState } from 'react';
import PropTypes from 'prop-types';

function Tabs(props) {
    const tabsCollection = React.Children.toArray(props.children);  
    const [activeTab, setActiveTab] = useState(tabsCollection[0].props.label);
    const handleClick = tab => setActiveTab(tab);

    const style = {
            textAlign: 'center',
            height: '80%',
            border: 'solid 1px purple'
    };

    return (
        <div style={style}>
            {tabsCollection.map(tab => <button key={tab.props.label} type='button' onClick={() => handleClick(tab.props.label)}>{tab.props.label}</button> )}
            {tabsCollection.map(tab => tab.props.label === activeTab ? tab : undefined)}
        </div>
    )
};

Tabs.propTypes = {
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired
}

export default Tabs;