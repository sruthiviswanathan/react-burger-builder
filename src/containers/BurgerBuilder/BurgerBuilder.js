import React, { Component } from 'react';
import Auxillary from '../../hoc/Auxillary/Auxillary';
import axios from '../../axios-orders';
import { connect } from 'react-redux';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';
import * as burgerBuilderActions from '../../store/actions/index';


class BurgerBuilder extends Component {

    state = {
        purchasing: false
    }

    componentWillMount = () => {
        this.props.onInitIngredient();
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(item => {
            return ingredients[item];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        return sum > 0;
    }
    

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({
                purchasing: true
            });
        } else {
            this.props.history.push('/auth');
        }
        
    }

    cancelPurchaseHandler = () => {
        this.setState({
            purchasing: false
        });
    }

    confirmPurchaseHandler = () => {    
        this.props.history.push('/checkout');
    }

    render() {
        let disabledInfo = {
            ...this.props.ing
        };
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = <Spinner />;

        if (this.props.error) {
            burger = <p style={{textAlign :'center'}}>Ingredients can't be loaded!!</p>
        }
        if (this.props.ing) {
            burger =  (<Auxillary>
                <Burger ingredients={this.props.ing} />
                <BuildControls
                    auth={this.props.isAuthenticated} 
                    price={this.props.price}
                    ingredientAdded={this.props.onIngredientAdded} 
                    ingredientRemoved={this.props.onIngredientRemoved} 
                    disabled= {disabledInfo}
                    purchasable={this.updatePurchaseState(this.props.ing)}
                    purchased={this.purchaseHandler}/>
                </Auxillary>);

            orderSummary =  <OrderSummary ingredients= {this.props.ing} 
                    cancelPurchase={this.cancelPurchaseHandler} 
                    confirmPurchase={this.confirmPurchaseHandler}
                    totalPrice={this.props.price} />
        }

        return(
            <Auxillary>
                <Modal show={this.state.purchasing} closeModal={this.cancelPurchaseHandler}>
                    {orderSummary}
                </Modal>
                <div>
                  {burger}
                </div>
            </Auxillary>
        );
    }
}

const mapStatetoProps = state => {
    return {
        ing: state.burgerBuilderReducer.ingredients,
        price: state.burgerBuilderReducer.totalPrice,
        error: state.burgerBuilderReducer.error,
        isAuthenticated: state.authReducer.isAuthenticated
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded: (igName) => dispatch(burgerBuilderActions.addIngredient(igName)),
        onIngredientRemoved: (igName) => dispatch(burgerBuilderActions.removeIngredient(igName)),
        onInitIngredient: () => dispatch(burgerBuilderActions.fetchIngredients())
    };
}

export default connect(mapStatetoProps, mapDispatchToProps)(ErrorHandler(BurgerBuilder, axios));