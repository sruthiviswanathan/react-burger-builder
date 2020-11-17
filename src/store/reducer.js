import * as actionTypes from './actions';

const initialState = {
    ingredients: {
            salad: 0,
            meat: 0,
            cheese: 0,
            bacon: 0,
            onions: 0,
            extraCheese: 0
        },
    totalPrice: 5
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
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1
                },
                totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]
            };
        case actionTypes.REMOVE_INGREDIENT:
            return  {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                totalPrice: state.totalPrice - INGREDIENTS_PRICES[action.ingredientName]
            };
        default:
            return state;
    }
    
}

export default reducer;