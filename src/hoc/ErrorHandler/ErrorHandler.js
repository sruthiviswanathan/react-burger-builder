import React, { Component } from 'react';


import Auxillary from '../Auxillary/Auxillary';
import Modal from '../../components/UI/Modal/Modal';

const ErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {

        state = {
            error: null
        }

        componentWillMount = () => {

            this.reqInterceptor = axios.interceptors.request.use(
                request => {
                    return request;
                }, error => {
                    this.setState({
                        error: null
                    });
                });

                this.resInterceptor = axios.interceptors.response.use(
                response => response
                    , error => {
                    this.setState({
                        error: error
                    });
                });
        }


        componentWillUnmount = () => {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({
                error: null
            });
        }

        render () {
            return (
                <Auxillary>
                    <Modal show={this.state.error} closeModal={this.errorConfirmedHandler}>
                       <p style={{textAlign: 'center'}}>{this.state.error ? this.state.error.message : null}</p> 
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Auxillary>
    
            );
        }
    }
}

export default ErrorHandler;
