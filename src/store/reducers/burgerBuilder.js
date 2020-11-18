import * as actionTypes from '../actions/actionTypes';
import { reducerUtility } from '../utility';

const initialState = {
    ingredients: null,
    totalPrice: 5,
    error: false
};


const INGREDIENTS_PRICES = {
    salad: 8,
    cheese: 10,
    meat: 20,
    bacon: 15,
    onions: 10,
    extraCheese: 15
}

const reducer = (state = initialState, action) => {

    switch(action.type) {
        case actionTypes.ADD_INGREDIENT:
            return reducerUtility(state, 
                {
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]});
        case actionTypes.REMOVE_INGREDIENT:
            return reducerUtility(state, 
                { 
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName]});
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return reducerUtility(state, {error: true});
        case actionTypes.SET_INGREDIENTS:
            return reducerUtility(state, 
                {
                ingredients: action.ingredients,
                totalPrice: 5,
                error: false});
        default:
            return reducerUtility(state);
    }
    
}

export default reducer;