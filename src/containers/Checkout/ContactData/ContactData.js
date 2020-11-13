import React, {Component} from 'react';

import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Auxillary from '../../../hoc/Auxillary/Auxillary';

import axios from '../../../axios-orders'

class ContactData extends Component {

    state = {
        name: '',
        email: '',
        address: {
            street: '',
            pincode: '',
            country: ''
        },
        loading: false,
        purchased: false
    }

    orderHandler = (event) => {
        event.preventDefault();
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            customer: {
                name: 'Aarush',
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
                    purchased: true
                });
                this.props.history.push('/');
            }).catch(error => {
                console.log(error);
                this.setState({
                    loading: false
                });
            })
    }
    
    render() {

        let form = (
                <Auxillary>
                    <h4>Enter Your Contact Data</h4>
                    <form>
                        <input type="text" name="name" placeholder="Your Name" />
                        <input type="email" name="email" placeholder="Your Email" />
                        <input type="text" name="street" placeholder="Street" />
                        <input type="text" name="country" placeholder="Country" />
                        <input type="text" name="pin" placeholder="Pincode" />
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