import React from 'react';
import { Link } from 'react-router-dom';
import Categories from '../components/Categories';
import { getProductsFromCategoryAndQuery } from '../services/api';
import RenderizeProduct from '../components/RenderizeProduct';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      productsList: [],
      productSearchInput: '',
    };
  }

  handleProductSearch = async (productSearchInput) => {
    const response = await getProductsFromCategoryAndQuery(productSearchInput);
    this.setState({ productsList: [...response.results] });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { productsList, productSearchInput } = this.state;
    const isEmpty = productsList.length === 0;
    return (
      <div>
        <Link data-testid="shopping-cart-button" to="/shopping-cart">
          Carrinho de compras
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
        <Categories />
        {
          !isEmpty
            ? (
              <section className="product-list">
                {productsList.map((product) => (<RenderizeProduct
                  product={ product }
                  key={ product.id }
                />))}
              </section>
            )
            : <p>Nenhum produto foi encontrado</p>
        }
      </div>
    );
  }
}

export default Home;
