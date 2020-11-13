import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';

import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
        </Layout>
        <Switch>
          <Route path="/" exact component={BurgerBuilder}></Route>
          <Route path="/burger-builder" component={BurgerBuilder}></Route>
          <Route path="/orders" component={Orders}></Route>
          <Route path="/checkout" component={Checkout}></Route>
        </Switch>
      </div>
    );
  }
}

export default App;
