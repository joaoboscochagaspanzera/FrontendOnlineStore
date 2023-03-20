import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RenderizeProduct extends Component {
  render() {
    const { product } = this.props;
    return (
      <section data-testid="product">
        <p>{product.title}</p>
        <p>{`$${product.price}`}</p>
        <img src={ product.thumbnail } alt={ product.title } />
      </section>
    );
  }
}

RenderizeProduct.propTypes = {
  product: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
  }).isRequired,
};

export default RenderizeProduct;
