import * as ActionType from './actionTypes';
import axios from '../../axios-orders';

export const addIngredient = (ingredientName) => {
    return {
        type: ActionType.ADD_INGREDIENT,
        ingredientName: ingredientName
    };
}

export const removeIngredient = (ingredientName) => {
    return {
        type: ActionType.REMOVE_INGREDIENT,
        ingredientName: ingredientName
    };
}

export const setIngredients = (ingredients) => {
    return { 
        type: ActionType.SET_INGREDIENTS,
        ingredients: ingredients
    }
}

export const fetchIngredientErrorHandler = () => {
    return {
        type: ActionType.FETCH_INGREDIENTS_FAILED,
        error: true
    }
}

export const fetchIngredients = () => {
    return dispatch => {
        axios.get('/ingredients.json')
        .then(response => {
            dispatch(setIngredients(response.data));
        }).catch(error => {
            dispatch(fetchIngredientErrorHandler());
        });
    }
}