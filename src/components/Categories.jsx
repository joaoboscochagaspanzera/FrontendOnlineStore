import React from 'react';
import { getCategories } from '../services/api';

class Categories extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
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
    const { categories } = this.state;
    return (
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
    );
  }
}

export default Categories;
