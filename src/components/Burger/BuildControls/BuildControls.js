import React from 'react';

import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';

const controls = [
    { label: 'Salad',  type: 'salad'},
    { label: 'Bacon',  type: 'bacon'},
    { label: 'Onions',  type: 'onions'},
    { label: 'Cheese',  type: 'cheese'},
    { label: 'Extra-Cheese', type: 'extraCheese'},
    { label: 'Meat',  type: 'meat'}
];

const BuildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Current Price: ₹ {props.price.toFixed(2)}</p>
            {controls.map(ctrl => {
                return <BuildControl key={ctrl.label} label={ctrl.label} 
                added={() => {props.ingredientAdded(ctrl.type)} }
                removed={() => {props.ingredientRemoved(ctrl.type)} }
                disabled={props.disabled[ctrl.type]}/>
            })}
            <button className={classes.OrderButton} disabled={!props.purchasable} onClick={props.purchased}>{props.auth ? 'ORDER NOW' : 'SIGN-IN TO ORDER'}</button>
        </div>
    );
}

export default BuildControls;