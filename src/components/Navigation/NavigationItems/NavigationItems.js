import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = (props) => {
    return(
        <ul className={classes.NavigationItems}>
           <NavigationItem link="/burger-builder">Burger Builder</NavigationItem>
           { props.auth ? <NavigationItem link="/orders">My Orders</NavigationItem> : null}
           { !props.auth ? <NavigationItem link="/auth">Authenticate</NavigationItem> : 
           <NavigationItem link="/logout">Logout</NavigationItem>}
           
        </ul>
    );
}

export default NavigationItems;