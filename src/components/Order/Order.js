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
        return <span style={{textTransform: 'capitalize', 
                              display: 'inline-block',
                              border: '1px solid #ccc',
                              boxShadow: '0 2px 3px solid #eee',
                              margin: 'auto 5px',
                              padding: '2px'
    }} key={ig.name}> {ig.name}: ({ig.amount}) </span>
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients: {
                ingredientOutput
            }
            </p>
            <p>Price: ₹ {props.price.toFixed(2)} </p>
        </div>
    );
}

export default Order;