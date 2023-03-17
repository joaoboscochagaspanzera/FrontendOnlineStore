import React, { Component } from 'react';

class ShoppingCart extends Component {
  constructor() {
    super();

    this.state = {
      cartItems: [],
    };
  }

  render() {
    const { cartItems } = this.state;
    const isEmpty = cartItems.length === 0;
    return (
      <div>
        {isEmpty
          && <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>}
      </div>
    );
  }
}

export default ShoppingCart;
