import React, { Component } from 'react';
import {Switch, Route, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

import * as Actions from './store/actions/index';

class App extends Component {

  componentDidMount () {
      this.props.onTryAutoSignUp();
  }

  render() {

    let routes = (
      <Switch>
      <Route path="/auth" component={Auth}></Route>
      <Route path="/" exact component={BurgerBuilder}></Route>
      <Redirect to="/"/>
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = ( <Switch>
          <Route path="/" exact component={BurgerBuilder}></Route>
          <Route path="/burger-builder" component={BurgerBuilder}></Route>
          <Route path="/orders" component={Orders}></Route>
          <Route path="/checkout" component={Checkout}></Route>
          <Route path="/logout" component={Logout}></Route>
          <Redirect to="/"/>
        </Switch> );
    }

    return (
      <div>
        <Layout>
        {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.authReducer.isAuthenticated
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(Actions.authCheckState()) 
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
