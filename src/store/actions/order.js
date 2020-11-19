import * as ActionTypes from './actionTypes';
import axios from '../../axios-orders';


export const getAllOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrderStart());
        axios.get('/orders.json?auth='+ token + '&orderBy="userId"&equalTo="' + userId + '"').then(response => {
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

export const fetchOrderStart = () => {
    return {
        type: ActionTypes.FETCH_ORDER_START
    }
}

export const purchaseReset = () => {
    return {
        type: ActionTypes.PURCHASE_RESET
    };
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
        type: ActionTypes.FETCH_ALL_ORDERS_FAILED
    }
}

export const orderHandler = (orderData, token) => {
    return dispatch => {
        axios.post('/orders.json?auth='+token, orderData)
        .then(response => {
            dispatch(orderSuccess(orderData, response.data));
        }).catch(error => {
            dispatch(orderFailed());
        })
    }
}

export const orderStart = () => {
    return {
        type: ActionTypes.ORDER_START
    };
}


export const orderSuccess = (orderData, orderId) => {
    return {
        type: ActionTypes.ORDER_SUCCESS,
        orderData: orderData,
        orderId: orderId
    };
}

export const orderFailed = () => {
    return {
        type: ActionTypes.ORDER_FAILED,
        orderLoading: false
    };
}