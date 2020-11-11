import React from 'react';
import PropTypes from 'prop-types';

import classes from './BurgerIngredient.module.css';

const BurgerIngredient = (props) => { 
    let ingredient = null;

    BurgerIngredient.propTypes = {
        type: PropTypes.string.isRequired   
    };

    switch (props.type) {
        case ('bread-bottom'): 
            ingredient = <div className={classes.BreadBottom}></div>;
            break;
        case ('bread-top'): 
            ingredient = (
            <div className={classes.BreadTop}>
                <div className={classes.Seeds1}></div>
                <div className={classes.Seeds2}></div>
            </div>
            );
            break;
        case ('meat'): 
            ingredient = <div className={classes.Meat}></div>;
            break;
        case ('cheese'): 
            ingredient = <div className={classes.Cheese}></div>;
            break;
        case ('salad'): 
            ingredient = <div className={classes.Salad}></div>;
            break;
        case ('onions'): 
            const onions = [];
            for (let i = 1; i <= 10; i++) {
                onions.push(<div className={classes.Onions} key={i} />);
            }
            ingredient = <div>{onions}</div>
        break;
        case ('bacon'): 
            ingredient = <div className={classes.Bacon}></div>;
            break;
        case ('extraCheese'):
            ingredient = <div className={classes.ExtraCheese}>
                        <div className={classes.CheeseFlowLeft}></div>
                        <div className={classes.CheeseFlowRight}></div>
                        </div>
            break;
        default:
            ingredient = null;
    }
    return ingredient;
};

export default BurgerIngredient