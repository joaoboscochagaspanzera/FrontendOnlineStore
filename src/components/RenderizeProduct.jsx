import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RenderizeProduct extends Component {
  constructor(props) {
    super(props);

    const { product } = this.props;
    const { id } = product;
    this.state = {
      productId: id,
    };
  }

  render() {
    const { product } = this.props;
    const { productId } = this.state;
    console.log(product);
    return (
      <section data-testid="product" id={ productId }>
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
    id: PropTypes.string.isRequired,
  }).isRequired,
};

export default RenderizeProduct;
