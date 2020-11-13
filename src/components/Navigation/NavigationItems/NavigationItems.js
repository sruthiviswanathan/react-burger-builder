import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = () => {
    return(
        <ul className={classes.NavigationItems}>
           <NavigationItem link="/burger-builder">Burger Builder</NavigationItem>
           <NavigationItem link="/orders">My Orders</NavigationItem>
        </ul>
    );
}

export default NavigationItems;