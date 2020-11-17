import * as actionTypes from '../actions/actionTypes';

const initialState = {
    orders: [],
    orderLoading: true,
    error: false
};


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_ALL_ORDERS:
            return {
                ...state,
                orders: action.orders,
                orderLoading: false
            };
        case actionTypes.FETCH_ALL_ORDERS_FAILED:
            return {
                ...state,
                error: true
            }
        default: 
            return {
                ...state
            };
    }
}

export default reducer;