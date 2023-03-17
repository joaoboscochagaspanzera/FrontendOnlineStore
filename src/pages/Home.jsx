import React from 'react';
import { Link } from 'react-router-dom';
import { getCategories } from '../services/api';

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      productsList: [],
      categories: [],
    };
  }

  componentDidMount() {
    this.fetchCategoryApi();
  }

  fetchCategoryApi = async () => {
    const response = await getCategories();
    this.setState({ categories: [...response] });
  };

  render() {
    const { productsList, categories } = this.state;
    console.log(categories);
    const isEmpty = productsList.length === 0;
    return (
      <div>
        <Link data-testid="shopping-cart-button" to="/shopping-cart">
          Carrinho de compras
        </Link>
        {isEmpty
          && (
            <p
              data-testid="home-initial-message"
            >
              Digite algum termo de pesquisa ou escolha uma categoria.
            </p>
          )}
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
          </label>))}
      </div>
    );
  }
}

export default Home;
