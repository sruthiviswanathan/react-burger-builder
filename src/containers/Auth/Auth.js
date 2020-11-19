import React , {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/Form/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as authActions from '../../store/actions/index';
import classes from './Auth.module.css';

import Spinner from '../../components/UI/Spinner/Spinner';

class Auth extends Component {

    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
           },
           password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            }
        },
        isFormValid: false,
        isSignIn: true
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
        const updatedFormData =  {...this.state.controls};
        const updatedFormElement = {...updatedFormData[inputId]};
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedFormData[inputId] = updatedFormElement;
        this.setState({controls: updatedFormData});
        this.setState({
            isFormValid: this.isFormValid()
        });
    }

    isFormValid = () => {
        let isFormValid = false; 
        for(let i in this.state.controls) {
            isFormValid = this.state.controls[i].valid;
            if (!isFormValid) {
                return false;
            }
        }
        return true;
    }

    makeAllFieldsTouched = () => {
        const presentFormData = {...this.state.controls};
        for (let i in presentFormData) {
            if (!presentFormData[i].value)
            presentFormData[i].touched = true;
        }
        this.setState({
            controls: presentFormData
        });
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {
                isSignIn: !prevState.isSignIn
            };
        })
    }

    authenticate = (event) => {
        event.preventDefault();
        const formData = {};
        for (let i in this.state.controls) {
            formData[i] = this.state.controls[i].value;
        }

        const userData = {
            controls: formData
        };
            
        const authType = (this.state.isSignIn ? 'SIGNIN' : 'SIGNUP'); 
            if (this.state.isFormValid) {
                this.props.onAuthenticate(userData.controls, authType);
            } else {
                this.makeAllFieldsTouched();
            }
    }

    render() {

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <p style={{color: 'red'}}>{this.props.error}</p>
            );
        }
        
        const formElementArray = [];
        for(let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            });
        }

        let loginForm = formElementArray.map(formElement => {
            return <Input key={formElement.id}
            elementType={formElement.config.elementType} 
            elementConfig={formElement.config.elementConfig} 
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            touched={formElement.config.touched}
            shouldValidate={formElement.config.validation}
            changed={(event) => { this.inputChangedHandler(event, formElement.id)}}
            />
        });

        if (this.props.loading) {
            loginForm = <Spinner />;
        }

        let redirect = null;
        if (this.props.isAuthenticated && this.props.totalPrice >= 5) {
            redirect = <Redirect to='/checkout'/>;
        }
        if (this.props.isAuthenticated && this.props.totalPrice === 5) {
            redirect = <Redirect to='/'/>;
        }

        return (
            <div className={classes.authContainer}>
                <h1>{!this.state.isSignIn ? 'SIGN-UP' : 'SIGN-IN'}</h1>
                {errorMessage}
                <form onSubmit={this.authenticate}>
                {loginForm}
                <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button btnType="Danger" clicked={this.switchAuthModeHandler}>{this.state.isSignIn ? 'New User? SIGNUP' : 'Already have an account? SIGNIN'}</Button>
                {redirect}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authReducer.isAuthenticated,
        loading: state.authReducer.loading,
        token: state.authReducer.token,
        error: state.authReducer.error,
        ingredients: state.burgerBuilderReducer.ingredients,
        totalPrice: state.burgerBuilderReducer.totalPrice
    };
}


const mapDispatchToProps = dispatch => {
    return {
        onAuthenticate: (userData, authType) => dispatch(authActions.authenticate(userData, authType))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);