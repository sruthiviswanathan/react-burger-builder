import React from 'react';

import classes from './NavigationItems.module.css';
import NavigationItem from './NavigationItem/NavigationItem';

const NavigationItems = () => {
    return(
        <ul className={classes.NavigationItems}>
           <NavigationItem link="/" active>BURGER BUILDER</NavigationItem>
           <NavigationItem link="/">CHECKOUT</NavigationItem>
        </ul>
    );
}

export default NavigationItems;