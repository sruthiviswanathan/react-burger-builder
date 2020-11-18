import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

import {Route, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';

import ContactData from './ContactData/ContactData';
import * as actions from '../../store/actions/index';


class Checkout extends Component { 

    componentDidMount () {
        this.props.setPurchasedToFalse();
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {

        let summary = <Redirect to='/' />;
        if (this.props.ings) {
            summary = (
                <div>
                    <CheckoutSummary 
                    ingredients={this.props.ings}
                    totalPrice = {this.props.price}
                    checkoutCancelled = {this.checkoutCancelledHandler}
                    checkoutContinued= {this.checkoutContinuedHandler} />
                    <Route path={this.props.match.path + '/contact-data'} 
                    component = {ContactData} />
                </div>
                )
        }

        return summary;
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilderReducer.ingredients,
        price: state.burgerBuilderReducer.totalPrice
    };
}

const mapDispatchToProps = dispatch => {
    return {
        setPurchasedToFalse: () => dispatch(actions.purchaseReset())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);