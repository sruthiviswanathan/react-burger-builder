import React, { Component } from 'react';
import Auxillary from '../../hoc/Auxillary/Auxillary';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
    }

    addIngredientHandler = (type) => {
        const ingredientOldCount = this.state.ingredients[type];
        const ingredientUpdatedCount =  ingredientOldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = ingredientUpdatedCount;
        const priceAddition = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients 
        });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const ingredientOldCount = this.state.ingredients[type];
        if (ingredientOldCount <= 0) {
            return;
        }
        const ingredientUpdatedCount =  ingredientOldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = ingredientUpdatedCount;
        const priceDeduction = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients 
        });
        this.updatePurchaseState(updatedIngredients);
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients).map(item => {
            return ingredients[item];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        this.setState({
            purchasable: sum > 0
        });
    }

    purchaseHandler = () => {
        this.setState({
            purchasing: true
        });
    }

    cancelPurchaseHandler = () => {
        this.setState({
            purchasing: false
        });
    }

    confirmPurchaseHandler = () => {
        alert('Confirmed purchase! Delicious burger on the way!!');
    }

    render() {
        let disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        return(
            <Auxillary>
                <Modal show={this.state.purchasing} closeModal={this.cancelPurchaseHandler}>
                    <OrderSummary ingredients= {this.state.ingredients} 
                    cancelPurchase={this.cancelPurchaseHandler} 
                    confirmPurchase={this.confirmPurchaseHandler}
                    totalPrice={this.state.totalPrice} />
                </Modal>
                <div>
                   <Burger ingredients={this.state.ingredients} />
                </div>
                <div>
                    <BuildControls 
                    price={this.state.totalPrice}
                    ingredientAdded={this.addIngredientHandler} 
                    ingredientRemoved={this.removeIngredientHandler} 
                    disabled= {disabledInfo}
                    purchasable={this.state.purchasable}
                    purchased={this.purchaseHandler}/>
                </div>
            </Auxillary>
        );
    }
}

export default BurgerBuilder;