import React, { Component } from 'react';
import './ShoppingCart.css';
import { Link } from 'react-router-dom';

// Códigos responsáveis por salvar e recuperar do local storage - Reinaldo, João e Vinicius

class ShoppingCart extends Component {
  constructor() {
    super();

    this.state = {
      cartItems: [],
    };
  }

  componentDidMount() {
    this.handleUpdateLocalStorage();
  }

  handleUpdateLocalStorage = () => {
    const items = JSON.parse(localStorage.getItem('onCart'));
    this.setState({ cartItems: items });
  };

  handleIncreaseQuantity = (product) => {
    const localStorageData = localStorage.getItem('onCart');
    let parsedStorage = [];
    if (localStorageData) {
      parsedStorage = JSON.parse(localStorageData);
    }
    const currentProduct = parsedStorage.find((item) => item.id === product.id);
    if (currentProduct.available_quantity > currentProduct.quantity) {
      currentProduct.quantity += 1;
    }

    localStorage.setItem('onCart', JSON.stringify(parsedStorage));
    this.setState({ cartItems: parsedStorage });
  };

  handleDecreaseQuantity = (product) => {
    const localStorageData = localStorage.getItem('onCart');
    let parsedStorage = [];
    if (localStorageData) {
      parsedStorage = JSON.parse(localStorageData);
    }
    const currentProduct = parsedStorage.find((item) => item.id === product.id);
    if (currentProduct.quantity > 1) {
      currentProduct.quantity -= 1;
    } else {
      this.handleRemoveItem(product);
    }

    localStorage.setItem('onCart', JSON.stringify(parsedStorage));
    this.setState({ cartItems: parsedStorage });
  };

  handleRemoveItem = (product) => {
    const { cartItems } = this.state;
    localStorage.removeItem('onCart');
    const filteredItems = cartItems.filter((item) => item.id !== product.id);
    localStorage.setItem('onCart', JSON.stringify(filteredItems));
    this.setState({
      cartItems: [...filteredItems],
    });
  };

  render() {
    const { cartItems } = this.state;
    // https://pt.stackoverflow.com/questions/16483/remover-elementos-repetido-dentro-de-um-array-em-javascript
    return (
      <div className="shopping-cart-page">
        {!cartItems
          ? <p data-testid="shopping-cart-empty-message">Seu carrinho está vazio</p>
          : cartItems
            .map((item, index) => (
              <section
                key={ index }
                className="shopping-cart-product"
              >
                <img src={ item.thumbnail } alt={ item.title } />
                <h3 data-testid="shopping-cart-product-name">{item.title}</h3>
                <p>{item.price}</p>
                <p data-testid="shopping-cart-product-quantity">
                  {item.quantity}
                </p>
                <button
                  type="button"
                  data-testid="product-increase-quantity"
                  className="product-increase-quantity"
                  onClick={ () => this.handleIncreaseQuantity(item) }
                >
                  +

                </button>
                <button
                  type="button"
                  data-testid="product-decrease-quantity"
                  className="product-decrease-quantity"
                  onClick={ () => this.handleDecreaseQuantity(item) }

                >
                  -

                </button>
                <button
                  type="button"
                  data-testid="remove-product"
                  className="remove-product"
                  onClick={ () => this.handleRemoveItem(item) }

                >
                  Remover do carrinho

                </button>
              </section>))}
        <Link to="/checkout" data-testid="checkout-products">Finalizar Compra</Link>
      </div>
    );
  }
}

export default ShoppingCart;
