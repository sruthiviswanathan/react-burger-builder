import * as actionTypes from '../actions/actionTypes';
import { reducerUtility } from '../utility';

const initialState = {
    orders: [],
    orderLoading: false,
    error: false,
    purchased: false
};


const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.FETCH_ORDER_START:
            return reducerUtility(state, {orderLoading: true});
        case actionTypes.FETCH_ALL_ORDERS:
            return reducerUtility(state, { orders: action.orders, orderLoading: false});
        case actionTypes.FETCH_ALL_ORDERS_FAILED:
            return reducerUtility(state, { error: true, orderLoading: false});
        case actionTypes.ORDER_START: 
            return reducerUtility(state, { orderLoading: true, purchased: false});
        case actionTypes.ORDER_SUCCESS:
            const newOrder =  {
                ...action.orderData,
                id: action.orderId
            }
            return reducerUtility(state, {orderLoading: false, purchased: true, orders: state.orders.concat(newOrder)});
        case actionTypes.ORDER_FAILED:
            return reducerUtility(state, { orderLoading: false, error: true, purchased: false});
        default: 
            return reducerUtility(state);
    }
}

export default reducer;