import React, { Component } from 'react';
import Auxillary from '../../hoc/Auxillary/Auxillary';
import axios from '../../axios-orders';

import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import Spinner from '../../components/UI/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import ErrorHandler from '../../hoc/ErrorHandler/ErrorHandler';

const INGREDIENTS_PRICES = {
    salad: 8,
    cheese: 10,
    meat: 20,
    bacon: 15,
    onions: 10,
    extraCheese: 15
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 5,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false    }

    componentDidMount = () => {
        axios.get('/ingredients.json').then(response => {
            this.setState({
                ingredients: response.data
            });
        }).catch(error => {
            this.setState({
                error: true
            });
            console.log(error);
        });
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
        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Sruthi',
                address: {
                    street: 'ZAC',
                    zip: '43455',
                    country: 'India'
                },
                email: 'ABCD@tst.com',
            }
            };
            this.setState({
                loading: true
            });
            axios.post('/orders.json', order)
            .then(response => {
                this.setState({
                    loading: false,
                    purchasing: false
                });
            }).catch(error => {
                console.log(error);
                this.setState({
                    loading: false,
                    purchasing: false
                });
            })
        }

    render() {
        let disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }

        let orderSummary = null;
        let burger = <Spinner />;

        if (this.state.error) {
            burger = <p style={{textAlign :'center'}}>Ingredients can't be loaded!!</p>
        }

        if (this.state.ingredients) {
            burger =  (<Auxillary>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    price={this.state.totalPrice}
                    ingredientAdded={this.addIngredientHandler} 
                    ingredientRemoved={this.removeIngredientHandler} 
                    disabled= {disabledInfo}
                    purchasable={this.state.purchasable}
                    purchased={this.purchaseHandler}/>
                </Auxillary>);

            orderSummary =  <OrderSummary ingredients= {this.state.ingredients} 
                    cancelPurchase={this.cancelPurchaseHandler} 
                    confirmPurchase={this.confirmPurchaseHandler}
                    totalPrice={this.state.totalPrice} />
        }

        if (this.state.loading) {
            orderSummary = <Spinner />
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

export default ErrorHandler(BurgerBuilder, axios);