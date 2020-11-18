import React , {Component} from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import * as orderActionCreator from '../../store/actions/index';

class Orders extends Component {

    componentWillMount = () => {
        this.props.onInitOrderFetchStart();
        this.props.onInitOrdersFetch();
    }

    render() {
            let orders = <Spinner/>;
            if (this.props.orders.length > 0) {
                orders = (
                    this.props.orders.map((order) => {
                        return <Order key={order.id} orderId={order.id} ingredients={order.ingredients} price={+order.price} orderData={order.orderData} />
                    })
                );
            }

            return(
                <div>
                    {orders}
                </div>
            );
    }
}

const mapStateToProps = state => {
    return {
        orders: state.orderReducer.orders,
        loading: state.orderReducer.orderLoading
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onInitOrderFetchStart: () => dispatch(orderActionCreator.fetchOrderStart()),
        onInitOrdersFetch: () => dispatch(orderActionCreator.getAllOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(Orders, axios));