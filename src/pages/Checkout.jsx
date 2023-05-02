import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Checkout extends Component {
  constructor() {
    super();
    this.state = {
      cartItems: [],
      fullName: '',
      email: '',
      cpf: '',
      phone: '',
      cep: '',
      address: '',
      payment: undefined,
      isInputsInvalids: false,
    };
  }

  componentDidMount() {
    this.getCartItemsFromStorage();
  }

  getCartItemsFromStorage = () => {
    const localStorageData = JSON.parse(localStorage.getItem('onCart'));
    this.setState({ cartItems: localStorageData });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;

    if (target.type === 'radio') {
      this.setState({ payment: value });
    } else {
      this.setState({
        [name]: value,
      });
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
  };

  handleSubmitBtn = () => {
    const { fullName, email, cpf, phone, cep, address, payment } = this.state;
    const states = [fullName, email, cpf, phone, cep, address, payment];
    const { history } = this.props;
    const isLength0 = states.some((state) => !state);
    if (isLength0) {
      this.setState({ isInputsInvalids: true });
      return;
    }
    localStorage.removeItem('onCart');
    history.push('/');
  };

  render() {
    const { cartItems, fullName, email, cpf, phone,
      cep, address, payment, isInputsInvalids } = this.state;
    return (
      <div>
        <section>
          {cartItems.map((item) => (
            <div key={ item.id }>
              <h3>{item.title}</h3>
              <img src={ item.thumbnail } alt={ item.title } />
              <p>{item.price}</p>
            </div>
          ))}
        </section>
        <form onSubmit={ this.handleSubmit }>
          <label>
            Nome Completo
            <input
              name="fullName"
              value={ fullName }
              onChange={ this.handleChange }
              data-testid="checkout-fullname"
            />
          </label>
          <label>
            Email
            <input
              name="email"
              value={ email }
              onChange={ this.handleChange }
              data-testid="checkout-email"
            />
          </label>
          <label>
            CPF
            <input
              name="cpf"
              value={ cpf }
              onChange={ this.handleChange }
              data-testid="checkout-cpf"
            />
          </label>
          <label>
            Telefone
            <input
              name="phone"
              value={ phone }
              onChange={ this.handleChange }
              data-testid="checkout-phone"
            />
          </label>
          <label>
            CEP
            <input
              name="cep"
              value={ cep }
              onChange={ this.handleChange }
              data-testid="checkout-cep"
            />
          </label>
          <label>
            Endereço
            <input
              name="address"
              value={ address }
              onChange={ this.handleChange }
              data-testid="checkout-address"
            />
          </label>
          <label>
            Pagamento
            <label data-testid="ticket-payment">
              Boleto
              <input
                type="radio"
                name="payment"
                value="ticketPayment"
                checked={ payment === 'ticketPayment' }
                onChange={ this.handleChange }
              />
            </label>
            <label data-testid="visa-payment">
              Visa
              <input
                type="radio"
                name="payment"
                value="visaPayment"
                checked={ payment === 'visaPayment' }
                onChange={ this.handleChange }
              />
            </label>
            <label data-testid="master-payment">
              MasterCard
              <input
                type="radio"
                name="payment"
                value="masterPayment"
                checked={ payment === 'masterPayment' }
                onChange={ this.handleChange }
              />
            </label>
            <label data-testid="elo-payment">
              Elo
              <input
                type="radio"
                name="payment"
                value="eloPayment"
                checked={ payment === 'eloPayment' }
                onChange={ this.handleChange }
              />
            </label>
          </label>
          <button
            type="submit"
            data-testid="checkout-btn"
            onClick={ this.handleSubmitBtn }
          >
            Enviar

          </button>
          {isInputsInvalids && <p data-testid="error-msg">Campos inválidos</p>}
        </form>
      </div>
    );
  }
}

Checkout.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Checkout;
