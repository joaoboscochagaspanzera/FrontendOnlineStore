import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { getProductDetailsById } from '../services/api';

// Código da página ProductDetails desenvolvido por Vieira João e Reinaldo;
// Essa é a branch grupo-8-req-7-v2 porque mudamos muita coisa e acabou sendo melhor criar uma nova branch do que continuar na outra.
const rating3 = 3;
const rating4 = 4;
const rating5 = 5;
class ProductDetails extends Component {
  constructor() {
    super();
    this.state = {
      product: {},
      ratings: [1, 2, rating3, rating4, rating5],
      emailInput: '',
      textInput: '',
      ratingInput: undefined,
      isInputsInvalids: false,
      reviews: [],
      onCart: [],
      cartSize: undefined,
    };
  }

  componentDidMount() {
    this.fetchProductDetails();
    this.handleCartLocalStorage();
  }

  handleCartLocalStorage = () => {
    const localStorageCartData = JSON.parse(localStorage.getItem('onCart'));
    this.setState({ onCart: localStorageCartData }, () => {
      const { onCart } = this.state;
      const cartSum = onCart && onCart.reduce((acc, curr) => acc + curr.quantity, 0);
      localStorage.setItem('cartSize', JSON.stringify(cartSum));
      this.setState({ cartSize: cartSum });
    });
  };

  fetchProductDetails = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const response = await getProductDetailsById(id);
    const localStorageData = JSON.parse(localStorage.getItem(`${id}`));
    this.setState({ product: response, reviews: localStorageData });
  };

  handleClick = () => {
    const { history } = this.props;
    history.push('/shopping-cart');
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    if (target.type === 'radio') {
      this.setState({ ratingInput: +value });
    } else {
      this.setState({
        [name]: value,
      });
    }
  };

  handleUpdateLocalStorage = () => {
    const { product } = this.state;
    const localStorageData = localStorage.getItem('onCart');
    let parsedStorage = [];
    if (localStorageData) {
      parsedStorage = JSON.parse(localStorageData);
    }
    const currentProduct = parsedStorage.find((item) => item.id === product.id);
    if (currentProduct) {
      currentProduct.quantity += 1;
    } else {
      parsedStorage = [...parsedStorage, { ...product, quantity: 1 }];
    }
    localStorage.setItem('onCart', JSON.stringify(parsedStorage));
    const cartSum = parsedStorage && parsedStorage
      .reduce((acc, curr) => acc + curr.quantity, 0);
    localStorage.setItem('cartSize', JSON.stringify(cartSum));
    this.setState({ cartSize: cartSum });
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  handleSubmitBtn = () => {
    const { emailInput, ratingInput, textInput, product } = this.state;
    const states = [emailInput, ratingInput];
    const isLength0 = states.some((state) => !state);
    const isntEmail = emailInput.includes('@');
    if (isLength0 || !isntEmail) {
      this.setState({ isInputsInvalids: true });
      return;
    }
    const localStorageData = localStorage.getItem(`${product.id}`);
    let parsedStorage = [];
    if (localStorageData) {
      parsedStorage = JSON.parse(localStorageData);
    }
    const formDataTemplate = {
      email: emailInput,
      text: textInput,
      rating: ratingInput,
    };
    parsedStorage = [...parsedStorage, formDataTemplate];
    localStorage.setItem(`${product.id}`, JSON.stringify(parsedStorage));
    this.setState({
      reviews: [...parsedStorage],
      emailInput: '',
      textInput: '',
      ratingInput: null,
      isInputsInvalids: false,
    });
  };

  render() {
    const { product, ratings, emailInput, textInput,
      ratingInput, isInputsInvalids, reviews, cartSize } = this.state;
    return (
      <div>
        <section>
          <button
            type="button"
            onClick={ this.handleClick }
            data-testid="shopping-cart-button"
          >
            Voltar ao carrinho de compras

          </button>
          <h1 data-testid="product-detail-name">{product.title}</h1>
          <img
            data-testid="product-detail-image"
            src={ product.thumbnail }
            alt={ product.title }
          />
          <p data-testid="product-detail-price">{product.price}</p>
          <button
            type="button"
            data-testid="product-detail-add-to-cart"
            onClick={ () => this.handleUpdateLocalStorage(product) }
          >
            Adicionar ao carrinho

          </button>
          <span data-testid="shopping-cart-size">{cartSize}</span>
        </section>
        <form onSubmit={ this.handleSubmit }>
          <label>
            Email
            <input
              type="email"
              data-testid="product-detail-email"
              name="emailInput"
              value={ emailInput }
              onChange={ this.handleChange }
              required
            />
          </label>
          {ratings.map((rating) => (
            <div
              key={ rating }
            >

              <label
                data-testid={ `${rating}-rating` }
              >
                {rating}
                <input
                  type="radio"
                  name="ratingInput"
                  value={ rating }
                  checked={ ratingInput === rating }
                  onChange={ this.handleChange }
                  required
                />
              </label>
            </div>
          ))}
          <label>
            Resenha
            <textarea
              data-testid="product-detail-evaluation"
              name="textInput"
              value={ textInput }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="submit"
            data-testid="submit-review-btn"
            onClick={ this.handleSubmitBtn }
          >
            Enviar
          </button>
          {isInputsInvalids && <p data-testid="error-msg">Campos inválidos</p>}
        </form>
        <section>
          {reviews && reviews.map((review, index) => (
            <div key={ index }>
              <h4 data-testid="review-card-email">{review.email}</h4>
              <p data-testid="review-card-rating">{review.rating}</p>
              <p data-testid="review-card-evaluation">{review.text}</p>
            </div>))}
        </section>
      </div>
    );
  }
}

ProductDetails.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default ProductDetails;
