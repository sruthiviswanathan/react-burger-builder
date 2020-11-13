import React , {Component} from 'react';

import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json').then(response => {
            const fetchedOrders = [];
            for (let key in response.data) {
                fetchedOrders.push({
                    ...response.data[key], id: key
                });
            }
            console.log(fetchedOrders);
            this.setState({
                orders: fetchedOrders,
                loading: false
            });
        }).catch(error => {
            this.setState({
                loading: false
            });
        })
    }

    render() {

            let orders = <Spinner />;
            if (this.state.orders) {
                orders = (
                    this.state.orders.map((order) => {
                        return <Order key={order.id} ingredients={order.ingredients} price={+order.price} orderData={order.orderData} />
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

export default ErrorHandler(Orders, axios);