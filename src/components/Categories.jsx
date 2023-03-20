import React from 'react';
import { getCategories, getProductById } from '../services/api';
import RenderizeProduct from './RenderizeProduct';

class Categories extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      products: [],
    };
  }

  componentDidMount() {
    this.fetchCategoryApi();
  }

  fetchCategoryApi = async () => {
    const response = await getCategories();
    this.setState({ categories: [...response] });
  };

  handleSearchByCategoryId = async ({ target }) => {
    const { value } = target;
    const response = await getProductById(value);
    this.setState({ products: [...response.results] });
  };

  render() {
    const { categories, products } = this.state;
    return (
      <>
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
                onClick={ this.handleSearchByCategoryId }
              />
            </label>
          ))}
        </section>
        {products.map((product) => (<RenderizeProduct
          product={ product }
          key={ product.id }
          id={ product.id }
        />))}
        <section />
      </>
    );
  }
}

export default Categories;
