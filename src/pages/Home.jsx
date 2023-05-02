import React from 'react';
import { Link } from 'react-router-dom';
import Categories from '../components/Categories';
import { getProductsFromCategoryAndQuery, getProductById } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      productsList: [],
      productSearchInput: '',
      onCart: [],
      cartSize: undefined,
    };
  }

  componentDidMount() {
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

  handleProductSearch = async (productSearchInput) => {
    const response = await getProductsFromCategoryAndQuery(productSearchInput);
    // localStorage.setItem('productList', JSON.stringify(response.results));
    this.setState({ productsList: [...response.results] });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleUpdateLocalStorage = (product) => {
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

  handleSearchByCategoryId = async ({ target }) => {
    const { value } = target;
    const response = await getProductById(value);
    this.setState({ productsList: [...response.results] });
  };

  render() {
    const { productsList, productSearchInput, cartSize } = this.state;
    const isEmpty = productsList.length === 0;
    return (
      <div>
        <Link data-testid="shopping-cart-button" to="/shopping-cart">
          Carrinho de compras
          <span data-testid="shopping-cart-size">{cartSize}</span>
        </Link>
        <label htmlFor="">
          <input
            name="productSearchInput"
            value={ productSearchInput }
            data-testid="query-input"
            placeholder="Digite o nome do produto"
            onChange={ this.handleChange }
          />
        </label>
        <button
          onClick={ () => this.handleProductSearch(productSearchInput) }
          type="button"
          data-testid="query-button"
        >
          Pesquisar

        </button>
        {isEmpty
          && (
            <p
              data-testid="home-initial-message"
            >
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          )}
        <Categories handleClick={ this.handleSearchByCategoryId } />
        {
          !isEmpty
            ? (
              <section className="product-list">
                {productsList.map((product) => (
                  <section data-testid="product" key={ product.id }>
                    {product.shipping.free_shipping
                     && <p data-testid="free-shipping">Frete Grátis</p>}
                    <p>{product.title}</p>
                    <p>{`R$${product.price}`}</p>
                    <img src={ product.thumbnail } alt={ product.title } />
                    <Link
                      to={ `./product-details/${product.id}` }
                      data-testid="product-detail-link"
                    >
                      Details
                    </Link>
                    <button
                      type="button"
                      data-testid="product-add-to-cart"
                      onClick={ () => this.handleUpdateLocalStorage(product) }
                    >
                      Adicionar ao carrinho

                    </button>
                  </section>
                ))}
              </section>
            )
            : <p>Nenhum produto foi encontrado</p>
        }
      </div>
    );
  }
}

export default Home;
