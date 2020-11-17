import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

import {Route} from 'react-router-dom';
import { connect } from 'react-redux';

import ContactData from './ContactData/ContactData';


class Checkout extends Component { 

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        return (
            <div>
                <CheckoutSummary 
                ingredients={this.props.ings}
                totalPrice = {this.props.price}
                checkoutCancelled = {this.checkoutCancelledHandler}
                checkoutContinued= {this.checkoutContinuedHandler}>

                </CheckoutSummary>
                <Route path={this.props.match.path + '/contact-data'} 
                component = {ContactData} />
            </div>
        )   
    }
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilderReducer.ingredients,
        price: state.burgerBuilderReducer.totalPrice
    };
}

export default connect(mapStateToProps)(Checkout);