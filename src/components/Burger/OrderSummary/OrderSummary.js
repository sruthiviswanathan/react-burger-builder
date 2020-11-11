import React from 'react';
import Auxillary from '../../../hoc/Auxillary/Auxillary';
import Button from '../../UI/Button/Button';

const OrderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients).map((igKey, index) => {
    return (
    <li key={igKey}>
        <span style={{textTransform: 'capitalize'}}>{igKey}:</span> 
        {props.ingredients[igKey]}
    </li>
    );
    });

    return(
        <Auxillary>
            <h3>Your Order: </h3>
            <p>A delicious burger with following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Total Price: ₹ <strong>{props.totalPrice.toFixed(2)}</strong></p>
            <p>Continue to checkout?</p>
            <Button clicked={props.cancelPurchase} btnType="Danger">CANCEL</Button>
            <Button clicked={props.confirmPurchase} btnType="Success">CONTINUE</Button>
        </Auxillary>
    );
}

export default OrderSummary;