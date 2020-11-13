import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Auxillary from '../../../hoc/Auxillary/Auxillary';
import Input from '../../../components/UI/Form/Input/Input';

import axios from '../../../axios-orders'

class ContactData extends Component {

    state = {
        loading: false,
        purchased: false,
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
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData
            };
            
            if (this.state.isFormValid) {
                this.setState({loading: true});
                axios.post('/orders.json', order)
                .then(response => {
                    this.setState({
                        loading: false,
                        purchased: true
                    });
                    this.props.history.push('/');
                }).catch(error => {
                    console.log(error);
                    this.setState({loading: false});
                })
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

        if (this.state.loading) {
            form = <Spinner />
        }

        if (!this.state.loading && this.state.purchased) {
            form = <p style={{ color: 'green', textWeight: 'bold'}}>Successfully Purchased!!!</p>
        }

        return (
            <div className={classes.ContactData}>
                {form}
            </div>
        );
    }

}

export default ContactData;