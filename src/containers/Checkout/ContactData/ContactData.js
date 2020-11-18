import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Auxillary from '../../../hoc/Auxillary/Auxillary';
import Input from '../../../components/UI/Form/Input/Input';
import { connect } from 'react-redux';
import ErrorHandler from '../../../hoc/ErrorHandler/ErrorHandler';

import axios from '../../../axios-orders';
import  * as orderReducer from '../../../store/actions/index';

class ContactData extends Component {

    state = {
        orderForm: {
                name: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'text',
                        placeholder: 'Your Name'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
               },
                email: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'email',
                        placeholder: 'Your Email'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
               },
                phone: {
                    elementType: 'input',
                    elementConfig: {
                        type: 'number',
                        placeholder: 'Your Phone Number'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
               },
                address: {
                    elementType: 'textarea',
                    elementConfig: {
                        placeholder: 'Your Address'
                    },
                    value: '',
                    validation: {
                        required: true
                    },
                    valid: false,
                    touched: false
               },
                deliveryMethod: {
                    elementType: 'select',
                    elementConfig: {
                        options: [
                            {value: 'fastest', displayValue: 'fastest'},
                            {value: 'cheapest', displayValue: 'cheapest'}
                        ]
                    },
                    value: 'fastest',
                    validation: {
                        required: false
                    },
                    valid: true
               }
        },
        isFormValid: false
    }

    checkValidity = (value, rules) => {
        let isValid = false;
        if (rules.required) {
            isValid = value.trim() !== ''
        } else {
            isValid = true;
        }
        return isValid;
    }

    inputChangedHandler = (event, inputId) => {
        const updatedFormData =  {...this.state.orderForm};
        const updatedFormElement = {...updatedFormData[inputId]};
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedFormData[inputId] = updatedFormElement;
        this.setState({orderForm: updatedFormData});
        this.setState({
            isFormValid: this.isFormValid()
        });
    }

    isFormValid = () => {
        let isFormValid = false; 
        for(let i in this.state.orderForm) {
            isFormValid = this.state.orderForm[i].valid;
            if (!isFormValid) {
                return false;
            }
        }
        return true;
    }

    makeAllFieldsTouched = () => {
        const presentFormData = {...this.state.orderForm};
        for (let i in presentFormData) {
            if (!presentFormData[i].value)
            presentFormData[i].touched = true;
        }
        this.setState({
            orderForm: presentFormData
        });
    }

    orderHandler = (event) => {
        event.preventDefault();
        const formData = {};
        for (let i in this.state.orderForm) {
            formData[i] = this.state.orderForm[i].value;
        }

        const order = {
            ingredients: this.props.ings,
            price: this.props.price,
            orderData: formData
            };
            
            if (this.state.isFormValid) {
                this.props.orderStartHandler();
                this.props.orderSuccessHandler(order); 
            } else {
                this.makeAllFieldsTouched();
            }
    }
    
    render() {

        const formElementArray = [];
        for(let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }

        let form = (
                <Auxillary>
                    <h4>Enter Your Contact Data</h4>
                    <form>
                        {formElementArray.map(formElement => 
                        {
                           return <Input key={formElement.id} 
                           elementType={formElement.config.elementType} 
                           elementConfig={formElement.config.elementConfig} 
                           value={formElement.config.value}
                           invalid={!formElement.config.valid}
                           touched={formElement.config.touched}
                           shouldValidate={formElement.config.validation}
                           changed={(event) => { this.inputChangedHandler(event, formElement.id)}} />
                        })
                        }
                        <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
                    </form>
                </Auxillary>
                
        );

        if (this.props.loading) {
            form = <Spinner/>
        }

        if (!this.props.loading && this.props.purchased) {
            form = <p style={{ color: 'green', textWeight: 'bold'}}>Successfully Purchased!!!</p>
        }

        return (
            <div className={classes.ContactData}>
                {form}
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilderReducer.ingredients,
        price: state.burgerBuilderReducer.totalPrice,
        loading: state.orderReducer.orderLoading,
        purchased: state.orderReducer.purchased
    };
}

const mapDispatchToProps = dispatch => {
    return {
        orderStartHandler: () => dispatch(orderReducer.orderStart()),
        orderSuccessHandler: (orderData) => dispatch(orderReducer.orderHandler(orderData))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ErrorHandler(ContactData, axios));