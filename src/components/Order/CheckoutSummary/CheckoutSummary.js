import React from 'react';

import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

import classes from './CheckoutSummary.module.css';

const CheckoutSummary = (props) => {
    return(
        <div className={classes.CheckoutSummary}>
            <h1>Hope it tastes awesome!!</h1>
            <div style={{ width: '100%', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}></Burger>
                <p>Total Price: {props.totalPrice}</p>
                <Button btnType="Danger" clicked={props.checkoutCancelled}>CANCEL</Button>
                <Button btnType="Success" clicked={props.checkoutContinued}>CONTINUE</Button>
            </div>
        </div>
    );
}

export default CheckoutSummary;