import * as ActionTypes from './actionTypes';
import axios from '../../axios-orders';


export const getAllOrders = () => {
    return dispatch => {
        axios.get('/orders.json').then(response => {
            const fetchedOrders = [];
            for (let key in response.data) {
                fetchedOrders.push({
                    ...response.data[key], id: key
                });
            }
            dispatch(fetchOrders(fetchedOrders));
        }).catch(error => {
            dispatch(fetchOrdersErrorHandler());
        })
    }
}


export const fetchOrders = (orderDetails) => {
    return  {
        type: ActionTypes.FETCH_ALL_ORDERS,
        orders: orderDetails,
        orderLoading: false
    };
}

export const fetchOrdersErrorHandler = () => {
    return {
        type: ActionTypes.FETCH_ALL_ORDERS_FAILED,
        orderLoading: false
    }
}