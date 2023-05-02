import React from 'react';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import ShoppingCart from './pages/ShoppingCart';
import ProductDetails from './pages/ProductDetails';
import Checkout from './pages/Checkout';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/shopping-cart" component={ ShoppingCart } />
        <Route exact path="/product-details/:id" component={ ProductDetails } />
        <Route exact path="/checkout" component={ Checkout } />
        <Route exact path="/" component={ Home } />
      </Switch>
    );
  }
}

export default App;
