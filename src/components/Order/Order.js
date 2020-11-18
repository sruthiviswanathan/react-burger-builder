import React from 'react';

import classes from './Order.module.css';

const Order = (props) => {

    const ingredients = [];
    
    for (let ing in props.ingredients) {
        ingredients.push({
            name: ing,
            amount: props.ingredients[ing]
        });
    }

    const ingredientOutput = ingredients.map(ig => {
    //     return <span style={{textTransform: 'capitalize', 
    //                           display: 'inline-block',
    //                           border: '1px solid #ccc',
    //                           boxShadow: '0 2px 3px solid #eee',
    //                           margin: 'auto 5px',
    //                           padding: '2px'
    // }} key={ig.name}> {ig.name}: ({ig.amount}) </span>
        return (
            <div className={classes.Ingredients} key={ig.name}>
                {ig.name}: ({ig.amount})
            </div>
        )
    });

    return (
        <div className={classes.Order}>
            <div className={classes.IngredientContainer}>Ingredients: {
                ingredientOutput
            }
            <p>Price: ₹ {props.price.toFixed(2)} </p>
            </div>
            
            <div className={classes.OrderDetails}>
                <p>Order Details : </p>
                <p>Order Id: {props.orderId}</p>
                <p>Customer Name: {props.orderData.name}</p>
                <p>Email: {props.orderData.email}</p>
            </div>

            <div className={classes.DeliveryDetails}>
                <p>Delivery Details : </p>
                <p>Delivery Method: {props.orderData.deliveryMethod}</p>
                <p>Delivery Address: {props.orderData.address}</p>
            </div>
            
        </div>
    );
}

export default Order;