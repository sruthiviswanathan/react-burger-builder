import React , {Component} from 'react';
import { connect } from 'react-redux';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import * as orderActionCreator from '../../store/actions/index';

class Orders extends Component {

    componentWillMount = () => {
        this.props.onInitOrdersFetch(this.props.token, this.props.userId);
    }

    render() {
            let orders = <Spinner/>;

            if (!this.props.loading) {
                orders = <p style={{textAlign: "center"}}> No orders found!!</p>
            }

            if (this.props.error) {
               orders = <p style={{textAlign: "center"}}>Something went wrong</p>;
            }

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
        loading: state.orderReducer.orderLoading,
        error: state.orderReducer.error,
        token: state.authReducer.token,
        userId: state.authReducer.userId
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onInitOrdersFetch: (token, userId) => dispatch(orderActionCreator.getAllOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(Orders, axios));