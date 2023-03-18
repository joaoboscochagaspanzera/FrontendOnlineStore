import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories, getProductsFromCategoryAndQuery } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      productsList: [],
      categories: [],
      productSearchInput: '',
    };
  }

  componentDidMount() {
    this.fetchCategoryApi();
  }

  fetchCategoryApi = async () => {
    const response = await getCategories();
    this.setState({ categories: [...response] });
  };

  handleProductSearch = async (productSearchInput) => {
    const response = await getProductsFromCategoryAndQuery(productSearchInput);
    this.setState({ productsList: [...response.results] });
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { productsList, categories, productSearchInput } = this.state;
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
        <section className="categories">
          {categories.map((category) => (
            <label
              htmlFor={ category.id }
              key={ category.id }
              data-testid="category"
            >
              {category.name}
              <input
                type="radio"
                name="categories"
                id={ category.id }
                value={ category.id }
              />
            </label>
          ))}
        </section>
        {
          !isEmpty
            ? (
              <section className="product-list">
                {productsList.map((product) => (
                  <section data-testid="product" key={ product.id }>
                    <p>{product.title}</p>
                    <p>{`$${product.price}`}</p>
                    <img src={ product.thumbnail } alt={ product.title } />
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
